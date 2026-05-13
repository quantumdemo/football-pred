"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Match, Team } from "@/types";
import { MOCK_TEAMS } from "@/lib/mock-data";
import { MatchCard } from "@/components/ui/MatchCard";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function TeamPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = MOCK_TEAMS[id as string];
    setTeam(t || null);

    async function fetchData() {
       try {
          const res = await fetch('/api/matches');
          const data = await res.json();
          setMatches(data.filter((m: Match) => m.homeTeam.id === id || m.awayTeam.id === id));
       } catch (e) {
          console.error(e);
       } finally {
          setLoading(false);
       }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!team) return <div className="p-10 text-center">Team not found</div>;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-6 mb-12">
         <img src={team.logo} alt={team.name} className="w-24 h-24 object-contain" />
         <div>
            <h1 className="text-4xl font-black">{team.name}</h1>
            <div className="flex gap-1 mt-2">
               {team.form?.map((r, i) => (
                 <span key={i} className={`w-6 h-6 flex items-center justify-center rounded text-xs font-black ${r === 'W' ? 'bg-primary text-black' : r === 'D' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}>
                   {r}
                 </span>
               ))}
            </div>
         </div>
      </div>

      <h2 className="text-xl font-black mb-6 flex items-center gap-2">
         <Shield className="text-primary w-5 h-5" /> RECENT & UPCOMING
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
           <Link key={match.id} href={`/match/${match.id}`}>
             <MatchCard match={match} />
           </Link>
        ))}
      </div>
    </main>
  );
}
