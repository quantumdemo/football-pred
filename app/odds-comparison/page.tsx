"use client";

import { useEffect, useState } from "react";
import { Match, Odds } from "@/types";
import { OddsTable } from "@/components/ui/OddsTable";
import { TrendingUp } from "lucide-react";

export default function OddsComparisonPage() {
  const [data, setData] = useState<{match: Match, odds: Odds[]}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/matches');
        const matches = await res.json();

        const oddsData = await Promise.all(matches.slice(0, 5).map(async (m: Match) => {
           const oRes = await fetch(`/api/predict?matchId=${m.id}`);
           const result = await oRes.json();
           return { match: m, odds: result.odds };
        }));

        setData(oddsData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-12">
         <TrendingUp className="text-primary w-8 h-8" />
         <h1 className="text-3xl font-black">MARKET <span className="text-primary">ODDS</span></h1>
      </div>

      <div className="space-y-12">
        {data.map((item, i) => (
          <section key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
             <div className="p-6 bg-black/20 border-b border-border flex justify-between items-center">
                <div className="font-black text-lg">
                   {item.match.homeTeam.shortName} <span className="text-muted-foreground italic mx-2 text-sm font-normal">VS</span> {item.match.awayTeam.shortName}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{item.match.leagueId}</div>
             </div>
             <OddsTable odds={item.odds} />
          </section>
        ))}
      </div>
    </main>
  );
}
