"use client";

import { useEffect, useState } from "react";
import { Match, Prediction } from "@/types";
import { MatchCard } from "@/components/ui/MatchCard";
import { Badge } from "@/components/ui/Badge";
import { Activity, Brain, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [scanner, setScanner] = useState<{ bestBets: { match: Match; prediction: Prediction }[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [mRes, sRes] = await Promise.all([
          fetch('/api/matches'),
          fetch('/api/scanner')
        ]);
        const mData = await mRes.json();
        const sData = await sRes.json();
        setMatches(mData);
        setScanner(sData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-primary font-black animate-pulse">SYNCHRONIZING INTELLIGENCE...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-[#050505] py-12 lg:py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Badge variant="primary" className="mb-6 px-4 py-1">AI-POWERED PREDICTIONS</Badge>
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              FOOTBALL <span className="text-primary">INTELLIGENCE</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Professional-grade match analysis using real-time search, injury data, and advanced statistical modeling.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/predictions" className="bg-primary text-black px-8 py-3 rounded-lg font-black hover:scale-105 transition-transform">
                VIEW DAILY TIPS
              </Link>
              <div className="bg-secondary border border-border px-8 py-3 rounded-lg font-black text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {matches.filter(m => m.status === 'LIVE').length} LIVE MATCHES
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Featured Matches */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Activity className="text-primary w-5 h-5" /> UPCOMING FIXTURES
                </h2>
                <div className="flex gap-2">
                   {['PL', 'CL', 'PD', 'BL1', 'SA'].map(league => (
                     <Link key={league} href={`/league/${league}`} className="text-[10px] font-black bg-secondary border border-border px-2 py-1 rounded hover:border-primary transition-colors">
                        {league}
                     </Link>
                   ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.slice(0, 4).map(match => (
                  <Link key={match.id} href={`/match/${match.id}`}>
                    <MatchCard match={match} />
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Shield className="text-primary w-5 h-5" /> SAFEST BETS TODAY
                </h2>
              </div>
              <div className="space-y-4">
                {scanner?.bestBets.map((item, i) => (
                  <div key={i} className="bg-secondary/50 border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center font-black text-primary">
                        {item.prediction.confidence}%
                       </div>
                       <div>
                         <p className="text-sm font-bold">{item.match.homeTeam.shortName} vs {item.match.awayTeam.shortName}</p>
                         <p className="text-xs text-muted-foreground">{item.prediction.safestBet}</p>
                       </div>
                    </div>
                    <Link href={`/match/${item.match.id}`} className="text-xs font-black text-primary group-hover:underline">ANALYSIS</Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: AI Insights / News */}
          <div className="space-y-8">
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-black flex items-center gap-2 mb-6">
                <Brain className="text-primary w-5 h-5" /> SYSTEM STATUS
              </h2>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground">SCANNER STATUS</span>
                    <Badge>ACTIVE</Badge>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground">API CONNECTIVITY</span>
                    <span className="text-xs font-black text-primary">OPTIMAL</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground">REAL-TIME DATA</span>
                    <span className="text-xs font-black text-primary">ENABLED</span>
                 </div>
                 <div className="pt-4 border-t border-border">
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                      &quot;System currently analyzing odds movement across 5 major bookmakers for today&apos;s Premier League fixtures.&quot;
                    </p>
                 </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6">
               <Zap className="text-primary w-8 h-8 mb-4" />
               <h3 className="font-black text-white mb-2">PRO VERSION</h3>
               <p className="text-xs text-muted-foreground mb-4">Unlock advanced xG charts and lineup simulation models.</p>
               <button className="w-full bg-primary text-black py-2 rounded font-black text-xs">EXPLORE FEATURES</button>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
