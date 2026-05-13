import { Prediction } from "@/types";
import { Badge } from "./Badge";
import { getConfidenceColor, cn } from "@/lib/utils";

interface PredictionCardProps {
  prediction: Prediction;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const isValueBet = prediction.confidence > 85;

  return (
    <div className="bg-card rounded-xl border border-border p-5 relative overflow-hidden">
      {isValueBet && (
        <div className="absolute top-0 left-0 bg-primary text-black text-[10px] font-black px-3 py-1 z-10 rounded-br-lg animate-pulse">
          VALUE BET DETECTED
        </div>
      )}
      <div className="absolute top-0 right-0 p-4">
        <Badge variant={prediction.riskLevel === 'ELITE' ? 'primary' : 'outline'}>
          {prediction.riskLevel}
        </Badge>
      </div>

      <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-6">AI Prediction</h3>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-white">{prediction.winProbability.home}%</span>
          <span className="text-xs text-muted-foreground font-medium mt-1">HOME</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-muted-foreground">{prediction.winProbability.draw}%</span>
          <span className="text-xs text-muted-foreground font-medium mt-1">DRAW</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-white">{prediction.winProbability.away}%</span>
          <span className="text-xs text-muted-foreground font-medium mt-1">AWAY</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-border/50">
          <span className="text-sm font-medium">Safest Bet</span>
          <span className="text-primary font-black">{prediction.safestBet}</span>
        </div>

        <div className="space-y-2">
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Confidence Score</span>
             <span className={cn("font-bold", getConfidenceColor(prediction.confidence))}>{prediction.confidence}%</span>
           </div>
           <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
             <div
               className="h-full bg-primary transition-all duration-1000"
               style={{ width: `${prediction.confidence}%` }}
             />
           </div>
        </div>
      </div>
    </div>
  );
}
