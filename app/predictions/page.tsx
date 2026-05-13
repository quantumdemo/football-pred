"use client";

import { useEffect, useState } from "react";
import { Match, Prediction } from "@/types";
import { MatchCard } from "@/components/ui/MatchCard";
import { Badge } from "@/components/ui/Badge";
import { Brain, Filter, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

export default function PredictionsPage() {
  const [data, setData] = useState<{ match: Match; prediction: Prediction }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/scanner');
        const result = await res.json();
        setData(result.bestBets || []);
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
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary font-black animate-pulse">SCANNING GLOBAL MARKETS...</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="bg-[#050505] border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-black text-xs tracking-widest mb-4 uppercase">
                <Brain className="w-4 h-4" /> AI Daily Scanner
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white">DAILY <span className="text-primary">TIPS</span></h1>
            </div>

            <div className="flex items-center gap-2">
               <button className="bg-secondary p-2 rounded border border-border text-muted-foreground"><LayoutGrid className="w-4 h-4" /></button>
               <button className="bg-secondary p-2 rounded border border-border text-white"><List className="w-4 h-4" /></button>
               <div className="h-8 w-px bg-border mx-2" />
               <button className="bg-secondary px-4 py-2 rounded border border-border text-xs font-bold flex items-center gap-2">
                 <Filter className="w-4 h-4" /> FILTERS
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
               <Link href={`/match/${item.match.id}`}>
                 <MatchCard match={item.match} />
               </Link>
               <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Recommended Market</span>
                     <Badge>{item.prediction.confidence}% Confidence</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-black text-white">{item.prediction.safestBet}</span>
                     <span className="text-xs font-bold text-primary">{item.prediction.riskLevel}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground italic">No high-confidence predictions available for the selected period.</p>
          </div>
        )}
      </div>
    </main>
  );
}
