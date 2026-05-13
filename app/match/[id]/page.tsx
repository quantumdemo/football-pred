"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Match, Odds, Prediction, NewsItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PredictionCard } from "@/components/ui/PredictionCard";
import { OddsTable } from "@/components/ui/OddsTable";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { AIExplanationCard } from "@/components/ui/AIExplanationCard";
import { ArrowLeft, Calendar, Info, TrendingUp } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function MatchAnalysisPage() {
  const { id } = useParams();
  const [data, setData] = useState<{
    match: Match;
    odds: Odds[];
    prediction: Prediction;
    news: NewsItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/predict?matchId=${id}`);
        const result = await res.json();
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary font-black animate-pulse">GENERATING PREDICTIONS...</p>
      </div>
    </div>
  );

  if (!data) return <div className="p-10 text-center">Match not found</div>;

  const { match, odds, prediction, news } = data;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> BACK TO DASHBOARD
          </Link>

          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-12 lg:gap-24">
              <div className="flex flex-col items-center gap-4">
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-20 h-20 lg:w-32 lg:h-32 object-contain" />
                <h1 className="text-2xl lg:text-4xl font-black text-center">{match.homeTeam.name}</h1>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge variant="outline">{match.leagueId}</Badge>
                <div className="text-4xl lg:text-6xl font-black text-muted-foreground/20 italic">VS</div>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {format(new Date(match.utcDate), 'MMM d, HH:mm')}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-20 h-20 lg:w-32 lg:h-32 object-contain" />
                <h1 className="text-2xl lg:text-4xl font-black text-center">{match.awayTeam.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
             <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border bg-black/20 flex items-center gap-2">
                  <TrendingUp className="text-primary w-5 h-5" />
                  <h2 className="font-black">BOOKMAKER ODDS COMPARISON</h2>
                </div>
                <OddsTable odds={odds} />
             </section>

             <section>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Info className="text-primary w-5 h-5" /> REAL-TIME INTEL
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.map(n => (
                    <div key={n.id} className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{n.source}</span>
                        <span className="text-[10px] text-muted-foreground">{format(new Date(n.publishedAt), 'HH:mm')}</span>
                      </div>
                      <h3 className="font-bold text-sm mb-2">{n.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{n.summary}</p>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <div className="col-span-2 py-10 text-center bg-card border border-dashed border-border rounded-xl">
                      <p className="text-xs text-muted-foreground italic">No recent news or injury reports found for these teams.</p>
                    </div>
                  )}
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <PredictionCard prediction={prediction} />

             <div className="bg-card border border-border rounded-2xl p-6">
                <ConfidenceMeter value={prediction.confidence} />
             </div>

             <AIExplanationCard explanation={prediction.explanation} />
          </div>

        </div>
      </div>
    </main>
  );
}
