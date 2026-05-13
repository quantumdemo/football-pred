"use client";

import { useEffect, useState } from "react";
import { Match } from "@/types";
import { MatchCard } from "@/components/ui/MatchCard";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/matches');
        const data = await res.json();
        setMatches(data.filter((m: Match) => m.status === 'LIVE' || m.status === 'IN_PLAY'));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse" />
         <h1 className="text-3xl font-black">LIVE <span className="text-primary">MATCHES</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <Link key={match.id} href={`/match/${match.id}`}>
            <MatchCard match={match} />
          </Link>
        ))}
        {matches.length === 0 && (
          <div className="col-span-full py-20 text-center bg-card border border-dashed border-border rounded-2xl">
             <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
             <p className="text-muted-foreground italic text-lg">No matches currently in play.</p>
          </div>
        )}
      </div>
    </main>
  );
}
