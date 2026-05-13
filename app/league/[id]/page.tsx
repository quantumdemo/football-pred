"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Match, League } from "@/types";
import { MOCK_LEAGUES } from "@/lib/mock-data";
import { MatchCard } from "@/components/ui/MatchCard";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function LeaguePage() {
  const { id } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const l = MOCK_LEAGUES.find(item => item.id === id);
    setLeague(l || null);

    async function fetchData() {
       try {
          const res = await fetch('/api/matches');
          const data = await res.json();
          setMatches(data.filter((m: Match) => m.leagueId === id));
       } catch (e) {
          console.error(e);
       } finally {
          setLoading(false);
       }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!league) return <div className="p-10 text-center">League not found</div>;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-6 mb-12">
         <img src={league.logo} alt={league.name} className="w-20 h-20 object-contain bg-white rounded-xl p-2" />
         <div>
            <h1 className="text-4xl font-black">{league.name}</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest">{league.country}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
           <Link key={match.id} href={`/match/${match.id}`}>
             <MatchCard match={match} />
           </Link>
        ))}
        {matches.length === 0 && (
           <div className="col-span-full py-20 text-center bg-card border border-dashed border-border rounded-2xl">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground italic">No upcoming matches scheduled for this league.</p>
           </div>
        )}
      </div>
    </main>
  );
}
