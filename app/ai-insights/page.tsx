"use client";

import { useEffect, useState } from "react";
import { Brain, Sparkles, Target, Zap } from "lucide-react";
import { AIExplanationCard } from "@/components/ui/AIExplanationCard";

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated deep AI insights
    const timer = setTimeout(() => {
      setInsights([
        "Arsenal's high-pressing intensity has increased by 15% in the last 3 home games, correlating with higher xG creation.",
        "Real Madrid consistently performs 20% better in second halves during Champions League knockout stages.",
        "Chelsea's defensive line shows vulnerability to quick transitions when their primary CDM is missing.",
        "Historical data suggests a 78% probability of BTTS in the upcoming Manchester Derby based on recent scoring trends."
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
         <div className="bg-primary/10 p-4 rounded-2xl mb-6">
            <Brain className="w-12 h-12 text-primary" />
         </div>
         <h1 className="text-4xl lg:text-5xl font-black mb-6">AI <span className="text-primary">INSIGHTS</span></h1>
         <p className="text-muted-foreground text-lg">
           Advanced neural network analysis of tactical patterns and historical performance data.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">
               <Sparkles className="text-primary w-5 h-5" /> TACTICAL TRENDS
            </h2>
            {insights.map((insight, i) => (
               <AIExplanationCard key={i} explanation={insight} />
            ))}
         </div>

         <div className="space-y-8">
            <section className="bg-card border border-border rounded-2xl p-8">
               <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                  <Target className="text-primary w-5 h-5" /> PROBABILITY MODELS
               </h2>
               <div className="space-y-6">
                  {[
                    { label: "Home Win Probability", value: 65 },
                    { label: "Over 2.5 Probability", value: 72 },
                    { label: "BTTS Probability", value: 58 }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-sm font-bold">
                          <span>{stat.label}</span>
                          <span className="text-primary">{stat.value}%</span>
                       </div>
                       <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${stat.value}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-2xl p-8">
               <Zap className="text-primary w-10 h-10 mb-4" />
               <h3 className="text-2xl font-black mb-2">LIVE AI FEED</h3>
               <p className="text-muted-foreground mb-6">
                  Get real-time tactical adjustments pushed directly to your dashboard.
               </p>
               <button className="bg-primary text-black font-black px-6 py-3 rounded-lg w-full">ENABLE ALERTS</button>
            </section>
         </div>
      </div>
    </main>
  );
}
