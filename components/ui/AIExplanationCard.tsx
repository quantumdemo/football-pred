import { Sparkles } from "lucide-react";

interface AIExplanationCardProps {
  explanation: string;
}

export function AIExplanationCard({ explanation }: AIExplanationCardProps) {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h4 className="font-bold text-sm text-primary tracking-wide">AI INTELLIGENCE REPORT</h4>
      </div>

      <div className="space-y-3">
        {explanation.split('\n').map((line, i) => (
          <p key={i} className="text-sm text-white/90 leading-relaxed">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Analysis updated in real-time
        </span>
      </div>
    </div>
  );
}
