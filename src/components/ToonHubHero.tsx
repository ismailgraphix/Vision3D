import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import figurine1 from '../images/ChatGPT Image May 17, 2026, 06_07_08 PM.png'
import figurine2 from '../images/ChatGPT Image May 17, 2026, 06_37_39 PM.png'
import figurine3 from '../images/ChatGPT Image May 17, 2026, 06_40_45 PM.png'
import figurine4 from '../images/ChatGPT Image May 17, 2026, 06_07_08 PM.png'

// ─── Data ────────────────────────────────────────────────────────────────────

interface FigurineItem {
  src: string
  bg: string
  panel: string
}

const IMAGES: FigurineItem[] = [
  {
    src: figurine1,
    bg: '#F4845F',
    panel: '#F79B7F',
  },
  {
    src: figurine2, 
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: figurine3,
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: figurine4,
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
]
 
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

// ─── Grain SVG data URI ───────────────────────────────────────────────────────

const grainSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='200' height='200' filter='url(#n)' opacity='0.08'/>
</svg>`

const grainDataURI = `url("data:image/svg+xml,${encodeURIComponent(grainSVG)}")`

// ─── Role style calculator ────────────────────────────────────────────────────

function getRoleStyle(role: Role, isMobile: boolean): RoleStyle {
  switch (role) {
    case 'center':
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0',
      }
    case 'left':
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      }
    case 'right':
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      }
    case 'back':
      return {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
        left: '50%',
        height: isMobile ? '13%' : '22%',
        bottom: isMobile ? '32%' : '12%',
      }
  }
}

function getRole(i: number, activeIndex: number): Role {
  const center = activeIndex
  const left = (activeIndex + 3) % 4
  const right = (activeIndex + 1) % 4
  // back = (activeIndex + 2) % 4
  if (i === center) return 'center'
  if (i === left) return 'left'
  if (i === right) return 'right'
  return 'back'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const isAnimating = useRef(false)

  // Preload images
  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Track mobile breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating.current) return
    isAnimating.current = true
    setActiveIndex((prev) =>
      dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
    )
    setTimeout(() => {
      isAnimating.current = false
    }, 650)
  }, [])

  const currentBg = IMAGES[activeIndex].bg

  return (
    <div
      style={{
        backgroundColor: currentBg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      {/* ── Full-viewport wrapper ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* 1. Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: grainDataURI,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* 2. Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          3D SHAPE
        </div>

        {/* 3. Top-left brand label */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{
            zIndex: 60,
            color: 'white',
            opacity: 0.9,
            letterSpacing: '0.18em',
          }}
        >
          TOONHUB
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, i) => {
            const role = getRole(i, activeIndex)
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
                  transition: [
                    'transform 650ms cubic-bezier(0.4,0,0.2,1)',
                    'filter 650ms cubic-bezier(0.4,0,0.2,1)',
                    'opacity 650ms cubic-bezier(0.4,0,0.2,1)',
                    'left 650ms cubic-bezier(0.4,0,0.2,1)',
                    'bottom 650ms cubic-bezier(0.4,0,0.2,1)',
                    'height 650ms cubic-bezier(0.4,0,0.2,1)',
                  ].join(', '),
                  willChange: 'transform, filter, opacity',
                }}
              >
                <img
                  src={item.src}
                  alt={`Figurine ${i + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* 5. Bottom-left: title + description + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="font-bold uppercase mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{
              color: 'white',
              opacity: 0.95,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            TOONHUB FIGURINES
          </p>

          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: 'white', opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>

          <div className="flex items-center gap-3">
            {/* Prev */}
            <NavButton onClick={() => navigate('prev')} aria-label="Previous">
              <ArrowLeft size={26} strokeWidth={2.25} />
            </NavButton>
            {/* Next */}
            <NavButton onClick={() => navigate('next')} aria-label="Next">
              <ArrowRight size={26} strokeWidth={2.25} />
            </NavButton>
          </div>
        </div>

        {/* 6. Bottom-right discover link */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 group"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: 'white',
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = '0.95')
          }
        >
          DISCOVER IT
          <ArrowRight
            className="w-5 h-5 sm:w-8 sm:h-8"
            strokeWidth={2.25}
            color="white"
          />
        </a>

      </div>
    </div>
  )
}

// ─── NavButton sub-component ──────────────────────────────────────────────────

interface NavButtonProps {
  onClick: () => void
  'aria-label': string
  children: React.ReactNode
}

function NavButton({ onClick, 'aria-label': ariaLabel, children }: NavButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center outline-none cursor-pointer"
      style={{
        background: hovered ? 'rgba(255,255,255,0.12)' : 'transparent',
        border: '2px solid white',
        color: 'white',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 150ms, background-color 150ms',
      }}
    >
      {children}
    </button>
  )
}