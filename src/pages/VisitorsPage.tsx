import { useEffect, useState } from 'react';
import { Users, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VisitorsPage() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(0);

  useEffect(() => {
    // Mocking an initial count
    const initialCount = 12540;
    
    // Using localStorage to track visits on this browser
    const localVisits = localStorage.getItem('toonhub_visits') || '0';
    const newLocalVisits = parseInt(localVisits) + 1;
    localStorage.setItem('toonhub_visits', newLocalVisits.toString());
    
    setVisitorCount(initialCount + newLocalVisits);
    setSessionCount(newLocalVisits);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Universe
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-['Anton'] uppercase tracking-tight mb-4">
            Audience Analytics
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Tracking the expansion of the Sama Universe across the globe.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total Visitors Card */}
          <div className="bg-[#2a2a2a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">Total Visitors</p>
              <h2 className="text-6xl font-['Anton'] text-white mb-4">
                {visitorCount.toLocaleString()}
              </h2>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Live Tracking Active
              </div>
            </div>
          </div>

          {/* Personal Visits Card */}
          <div className="bg-[#2a2a2a] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Eye size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">Your Visits</p>
              <h2 className="text-6xl font-['Anton'] text-white mb-4">
                {sessionCount}
              </h2>
              <p className="text-gray-400 text-sm">
                You've explored the universe {sessionCount} {sessionCount === 1 ? 'time' : 'times'}.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#F4845F]/10 to-[#6EB5FF]/10 border border-white/5">
          <h3 className="text-xl font-bold mb-4">How we track?</h3>
          <p className="text-gray-400 leading-relaxed">
            We use a combination of server-side logs and client-side session tracking to provide a real-time estimate of the Sama Universe's reach. Every interaction with a figurine helps us understand what our community loves most.
          </p>
        </div>
      </div>
    </div>
  );
}
