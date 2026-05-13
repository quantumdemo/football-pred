import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceMeter({ value, label = "AI CONFIDENCE", size = 'md' }: ConfidenceMeterProps) {
  const radius = size === 'sm' ? 30 : size === 'md' ? 50 : 70;
  const stroke = size === 'sm' ? 6 : size === 'md' ? 10 : 14;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="rgba(255, 255, 255, 0.05)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className={cn(
              "text-primary transition-all duration-1000 ease-out",
              value > 85 ? "drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]" : ""
            )}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            "font-black text-white",
            size === 'sm' ? "text-lg" : size === 'md' ? "text-3xl" : "text-5xl"
          )}>
            {value}%
          </span>
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-black text-muted-foreground mt-4 tracking-[0.2em] uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
