import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowLeft, ArrowRight, Star, Zap, Shield, Flame, Plus } from 'lucide-react'
import figurine1 from '../images/ChatGPT Image May 17, 2026, 06_07_08 PM.png'
import figurine2 from '../images/ChatGPT Image May 17, 2026, 06_37_39 PM.png'
import figurine3 from '../images/ChatGPT Image May 17, 2026, 06_40_45 PM.png'
import figurine4 from '../images/ChatGPT Image May 17, 2026, 06_07_08 PM.png'

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = 'center' | 'left' | 'right' | 'back'

interface RoleStyle {
  transform: string
  filter: string
  opacity: number
  zIndex: number
  left: string
  height: string
  bottom: string
}

interface StatItem {
  label: string
  value: number
  icon: React.ReactNode
}

interface CharacterData {
  name: string
  class: string
  edition: string
  series: string
  lore: string
  stats: StatItem[]
  tag: string
}

interface FigurineItem {
  src: string
  bg: string
  panel: string
  panelDark: string
  character: CharacterData
}

// ─── Data ────────────────────────────────────────────────────────────────────

const IMAGES: FigurineItem[] = [
  {
    src: figurine1,
    bg: '#F4845F',
    panel: '#F79B7F',
    panelDark: '#c45a35',
    character: {
      name: 'BLAZER',
      class: 'Fire Warrior',
      edition: 'Limited Ed. #001',
      series: 'Series I — Ignition',
      lore: 'Forged in the heart of the Emberstone Crater, Blazer channels raw volcanic energy into every strike. Collectors prize this first-run cast for its hand-finished lava detailing and glow-in-the-dark ember eyes.',
      tag: '🔥 Fan Favourite',
      stats: [
        { label: 'Power', value: 92, icon: <Flame size={12} /> },
        { label: 'Speed', value: 78, icon: <Zap size={12} /> },
        { label: 'Rarity', value: 85, icon: <Star size={12} /> },
        { label: 'Defence', value: 60, icon: <Shield size={12} /> },
      ],
    },
  },
  {
    src: figurine2,
    bg: '#6BBF7A',
    panel: '#85CC92',
    panelDark: '#3d8f4f',
    character: {
      name: 'GROVE',
      class: 'Nature Guardian',
      edition: 'Standard Ed. #002',
      series: 'Series I — Ignition',
      lore: 'Born from the roots of the Ancient Verdant Tree, Grove commands the forest floor. Each figurine is cast in bio-resin with real pressed botanicals embedded in the base — no two are identical.',
      tag: '🌿 Eco Cast',
      stats: [
        { label: 'Power', value: 70, icon: <Flame size={12} /> },
        { label: 'Speed', value: 55, icon: <Zap size={12} /> },
        { label: 'Rarity', value: 72, icon: <Star size={12} /> },
        { label: 'Defence', value: 95, icon: <Shield size={12} /> },
      ],
    },
  },
  {
    src: figurine3,
    bg: '#E882B4',
    panel: '#ED9DC4',
    panelDark: '#b34d86',
    character: {
      name: 'PRISM',
      class: 'Arcane Mage',
      edition: 'Rare Ed. #003',
      series: 'Series I — Ignition',
      lore: 'Prism bends light itself to her will. Cast in UV-reactive crystal-clear resin with iridescent internal shimmer, she shifts colour under different lighting — making every display setup a unique experience.',
      tag: '✨ UV Reactive',
      stats: [
        { label: 'Power', value: 88, icon: <Flame size={12} /> },
        { label: 'Speed', value: 82, icon: <Zap size={12} /> },
        { label: 'Rarity', value: 96, icon: <Star size={12} /> },
        { label: 'Defence', value: 50, icon: <Shield size={12} /> },
      ],
    },
  },
  {
    src: figurine4,
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    panelDark: '#3474cc',
    character: {
      name: 'VOLT',
      class: 'Storm Runner',
      edition: 'Standard Ed. #004',
      series: 'Series I — Ignition',
      lore: 'Volt races ahead of the storm — literally. His chrome finish is vacuum-metallised in three layers, giving him a mirror sheen that reflects every colour in the room. The lightning-bolt base doubles as a wireless charging pad.',
      tag: '⚡ Tech Edition',
      stats: [
        { label: 'Power', value: 75, icon: <Flame size={12} /> },
        { label: 'Speed', value: 99, icon: <Zap size={12} /> },
        { label: 'Rarity', value: 80, icon: <Star size={12} /> },
        { label: 'Defence', value: 65, icon: <Shield size={12} /> },
      ],
    },
  },
]

// ─── Grain ───────────────────────────────────────────────────────────────────

const grainSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.08'/></svg>`
const grainDataURI = `url("data:image/svg+xml,${encodeURIComponent(grainSVG)}")`

// ─── Role helpers ─────────────────────────────────────────────────────────────

function getRole(i: number, activeIndex: number): Role {
  if (i === activeIndex) return 'center'
  if (i === (activeIndex + 3) % 4) return 'left'
  if (i === (activeIndex + 1) % 4) return 'right'
  return 'back'
}

function getRoleStyle(role: Role, isMobile: boolean): RoleStyle {
  switch (role) {
    case 'center':
      return { transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`, filter: 'none', opacity: 1, zIndex: 20, left: '50%', height: isMobile ? '60%' : '92%', bottom: isMobile ? '22%' : '0' }
    case 'left':
      return { transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '20%' : '30%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '32%' : '12%' }
    case 'right':
      return { transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '80%' : '70%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '32%' : '12%' }
    case 'back':
      return { transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 1, zIndex: 5, left: '50%', height: isMobile ? '13%' : '22%', bottom: isMobile ? '32%' : '12%' }
  }
}

// ─── Confetti ────────────────────────────────────────────────────────────────

interface ConfettiPiece {
  id: number
  x: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
  shape: 'rect' | 'circle' | 'star'
  drift: number
}

function ConfettiBurst({ active, colors }: { active: boolean; colors: string[] }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    if (!active) return
    const newPieces: ConfettiPiece[] = Array.from({ length: 60 }, () => ({
      id: counterRef.current++,
      x: 20 + Math.random() * 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      duration: 900 + Math.random() * 800,
      delay: Math.random() * 300,
      shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
      drift: (Math.random() - 0.5) * 200,
    }))
    setPieces(newPieces)
    const t = setTimeout(() => setPieces([]), 2000)
    return () => clearTimeout(t)
  }, [active, colors])

  if (pieces.length === 0) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200, overflow: 'hidden' }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.shape === 'circle' ? p.size : p.size * 0.6,
            background: p.shape === 'star' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '50%' : 2,
            animation: `confettiFall ${p.duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${p.delay}ms forwards`,
            '--drift': `${p.drift}px`,
            '--rot': `${p.rotation + 720}deg`,
          } as React.CSSProperties}
        >
          {p.shape === 'star' && (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" fill={p.color} />
            </svg>
          )}
        </div>
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ─── 3D Tilt + Idle float center figure ──────────────────────────────────────

function CenterFigure({
  src,
  alt,
  isMobile,
  onClick,
  isCarouselAnimating,
}: {
  src: string
  alt: string
  isMobile: boolean
  onClick: () => void
  isCarouselAnimating: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>(0)
  const lastMouseRef = useRef(0)
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0, scale: 1 })

  // Idle float: sine wave on Y axis when mouse hasn't moved for 2s
  useEffect(() => {
    let start: number | null = null
    const animate = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const idleSecs = (ts - lastMouseRef.current) / 1000

      if (idleSecs > 2 && !isCarouselAnimating) {
        const floatY = Math.sin(elapsed / 900) * 6
        const floatX = Math.sin(elapsed / 1400) * 2
        setTiltStyle({ rotateX: floatX, rotateY: floatY * 0.5, scale: 1 })
        tiltRef.current = { x: 0, y: 0 }
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isCarouselAnimating])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    lastMouseRef.current = performance.now()
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2)  // -1 to 1
    // Smooth lerp toward target
    tiltRef.current = { x: dx * 14, y: dy * 10 }
    setTiltStyle({ rotateX: -dy * 10, rotateY: dx * 14, scale: 1.01 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const el = wrapRef.current
    if (!el) return
    lastMouseRef.current = performance.now()
    const touch = e.touches[0]
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (touch.clientX - cx) / (rect.width / 2)
    const dy = (touch.clientY - cy) / (rect.height / 2)
    setTiltStyle({ rotateX: -dy * 8, rotateY: dx * 10, scale: 1.01 })
  }, [])

  const height = isMobile ? '60%' : '92%'
  const bottom = isMobile ? '22%' : '0'
  const baseScale = isMobile ? 1.25 : 1.68

  return (
    <div
      ref={wrapRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      style={{
        position: 'absolute',
        aspectRatio: '0.6 / 1',
        left: '50%',
        height,
        bottom,
        zIndex: 20,
        cursor: 'pointer',
        // The carousel's own translateX(-50%) + scale lives here, then tilt on top
        transform: `translateX(-50%) scale(${baseScale}) perspective(800px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg) scale(${tiltStyle.scale})`,
        transition: isCarouselAnimating
          ? 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms, opacity 650ms, left 650ms, bottom 650ms, height 650ms'
          : 'transform 80ms linear',
        willChange: 'transform',
        transformOrigin: 'center bottom',
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center', userSelect: 'none', pointerEvents: 'none' }}
      />
      {/* Subtle drop shadow that reacts to tilt */}
      <div style={{
        position: 'absolute',
        bottom: -8,
        left: '10%',
        right: '10%',
        height: 24,
        background: 'rgba(0,0,0,0.18)',
        borderRadius: '50%',
        filter: 'blur(12px)',
        transform: `scaleX(${1 + tiltStyle.rotateY * 0.01}) translateX(${tiltStyle.rotateY * 1.5}px)`,
        transition: 'transform 80ms linear',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── Stat Bar ─────────────────────────────────────────────────────────────────

function StatBar({ stat, delay }: { stat: StatItem; delay: number }) {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), delay + 100)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>{stat.icon}</span>
          {stat.label}
        </div>
        <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{stat.value}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: filled ? `${stat.value}%` : '0%', background: 'white', borderRadius: 99, transition: `width 600ms cubic-bezier(0.4,0,0.2,1) ${delay}ms` }} />
      </div>
    </div>
  )
}

// ─── Character Panel ─────────────────────────────────────────────────────────

function CharacterPanel({
  item,
  visible,
  onClose,
  onCollect,
}: {
  item: FigurineItem
  visible: boolean
  onClose: () => void
  onCollect: () => void
}) {
  const c = item.character
  const [statsKey, setStatsKey] = useState(0)
  useEffect(() => { if (visible) setStatsKey((k) => k + 1) }, [visible])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 80, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 500ms cubic-bezier(0.4,0,0.2,1)' }}
      />

      {/* Sheet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 550ms cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ background: item.panelDark, borderRadius: '28px 28px 0 0', overflow: 'hidden', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>

          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.3)' }} />
          </div>

          <div style={{ overflowY: 'auto', padding: '0 24px 40px', flex: 1 }}>

            {/* Name + close */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 8, marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>{c.series}</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(36px, 8vw, 60px)', color: 'white', lineHeight: 1, letterSpacing: '-0.01em' }}>{c.name}</div>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[c.class, c.edition, c.tag].map((badge) => (
                <span key={badge} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'white', background: 'rgba(255,255,255,0.18)', borderRadius: 99, padding: '4px 12px', border: '1px solid rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{badge}</span>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 20 }} />

            {/* Stats */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Character Stats</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} key={statsKey}>
                {c.stats.map((stat, idx) => (
                  <StatBar key={stat.label} stat={stat} delay={idx * 80} />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 20 }} />

            {/* Lore */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Origin Story</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>{c.lore}</p>
            </div>

            {/* CTA */}
            <button
              onClick={onCollect}
              style={{ width: '100%', padding: '18px 24px', borderRadius: 16, border: 'none', background: 'white', color: item.panelDark, fontFamily: "'Anton', sans-serif", fontSize: 18, letterSpacing: '0.04em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'transform 150ms, box-shadow 150ms', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.02)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.22)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1)'; el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)' }}
            >
              <Plus size={18} strokeWidth={2.5} />
              ADD TO COLLECTION
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

// ─── NavButton ────────────────────────────────────────────────────────────────

interface NavButtonProps { onClick: () => void; 'aria-label': string; children: React.ReactNode }

function NavButton({ onClick, 'aria-label': ariaLabel, children }: NavButtonProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center outline-none cursor-pointer"
      style={{ background: hovered ? 'rgba(255,255,255,0.12)' : 'transparent', border: '2px solid white', color: 'white', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 150ms, background-color 150ms' }}
    >
      {children}
    </button>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────────────────

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [panelOpen, setPanelOpen] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const isAnimating = useRef(false)

  useEffect(() => {
    IMAGES.forEach(({ src }) => { const img = new Image(); img.src = src })
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating.current) return
    isAnimating.current = true
    const doNav = () => {
      setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4))
      setTimeout(() => { isAnimating.current = false }, 650)
    }
    if (panelOpen) {
      setPanelOpen(false)
      setTimeout(doNav, 320)
    } else {
      doNav()
    }
  }, [panelOpen])

  const handleCollect = useCallback(() => {
    setConfettiActive(false)
    // tiny delay to re-trigger if same character collected twice
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setConfettiActive(true))
    })
    // auto reset after burst
    setTimeout(() => setConfettiActive(false), 2200)
  }, [])

  const currentBg = IMAGES[activeIndex].bg
  const confettiColors = [
    IMAGES[activeIndex].bg,
    IMAGES[activeIndex].panel,
    '#ffffff',
    '#fff0a0',
    IMAGES[activeIndex].panelDark,
    '#ffddee',
  ]

  return (
    <>
      {/* Confetti lives outside everything at top level */}
      <ConfettiBurst active={confettiActive} colors={confettiColors} />

      <div
        style={{ backgroundColor: currentBg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)', fontFamily: "'Inter', sans-serif" }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>

          {/* Grain */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, opacity: 0.4, backgroundImage: grainDataURI, backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }} />

          {/* Ghost text */}
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 2, top: '18%', fontFamily: "'Anton', sans-serif", fontSize: 'clamp(90px, 28vw, 380px)', fontWeight: 900, color: 'white', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            3D SHAPE
          </div>

          {/* Brand */}
          <div className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase" style={{ zIndex: 60, color: 'white', opacity: 0.9, letterSpacing: '0.18em' }}>TOONHUB</div>

          {/* Carousel — non-center figures */}
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {IMAGES.map((item, i) => {
              const role = getRole(i, activeIndex)
              if (role === 'center') return null // rendered separately below
              const s = getRoleStyle(role, isMobile)
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    aspectRatio: '0.6 / 1',
                    transform: s.transform,
                    filter: s.filter,
                    opacity: s.opacity,
                    zIndex: s.zIndex,
                    left: s.left,
                    height: s.height,
                    bottom: s.bottom,
                    transition: ['transform 650ms cubic-bezier(0.4,0,0.2,1)', 'filter 650ms cubic-bezier(0.4,0,0.2,1)', 'opacity 650ms cubic-bezier(0.4,0,0.2,1)', 'left 650ms cubic-bezier(0.4,0,0.2,1)', 'bottom 650ms cubic-bezier(0.4,0,0.2,1)', 'height 650ms cubic-bezier(0.4,0,0.2,1)'].join(', '),
                    willChange: 'transform, filter, opacity',
                  }}
                >
                  <img src={item.src} alt={item.character.name} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center', userSelect: 'none', pointerEvents: 'none' }} />
                </div>
              )
            })}

            {/* Center figure — separate component for tilt + idle float */}
            <CenterFigure
              src={IMAGES[activeIndex].src}
              alt={IMAGES[activeIndex].character.name}
              isMobile={isMobile}
              onClick={() => setPanelOpen(true)}
              isCarouselAnimating={isAnimating.current}
            />
          </div>

          {/* Tap hint */}
          <div style={{ position: 'absolute', bottom: isMobile ? '16%' : '4%', left: '50%', transform: 'translateX(-50%)', zIndex: 25, pointerEvents: 'none', opacity: panelOpen ? 0 : 0.75, transition: 'opacity 300ms', display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            <span style={{ width: 20, height: 1, background: 'white', display: 'inline-block' }} />
            Tap to explore
            <span style={{ width: 20, height: 1, background: 'white', display: 'inline-block' }} />
          </div>

          {/* Bottom left */}
          <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24" style={{ zIndex: 60, maxWidth: 320 }}>
            <p className="font-bold uppercase mb-2 sm:mb-3 text-base sm:text-[22px]" style={{ color: 'white', opacity: 0.95, letterSpacing: '0.02em', lineHeight: 1.2 }}>TOONHUB FIGURINES</p>
            <p className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: 'white', opacity: 0.85, lineHeight: 1.6 }}>The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.</p>
            <div className="flex items-center gap-3">
              <NavButton onClick={() => navigate('prev')} aria-label="Previous"><ArrowLeft size={26} strokeWidth={2.25} /></NavButton>
              <NavButton onClick={() => navigate('next')} aria-label="Next"><ArrowRight size={26} strokeWidth={2.25} /></NavButton>
            </div>
          </div>

          {/* Discover */}
          <a href="#" onClick={(e) => { e.preventDefault(); setPanelOpen(true) }} className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2" style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: 'clamp(20px, 4vw, 56px)', fontWeight: 400, color: 'white', opacity: 0.95, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 200ms' }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.95')}>
            DISCOVER IT
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} color="white" />
          </a>

        </div>
      </div>

      <CharacterPanel
        item={IMAGES[activeIndex]}
        visible={panelOpen}
        onClose={() => setPanelOpen(false)}
        onCollect={handleCollect}
      />
    </>
  )
}