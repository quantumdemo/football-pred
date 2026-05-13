import { Match } from "@/types";
import { Badge } from "./Badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const isLive = match.status === 'LIVE';

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl p-4 cursor-pointer hover:neon-border transition-all duration-300 group"
    >
      <div className="flex justify-between items-center mb-4">
        <Badge variant={isLive ? 'destructive' : 'outline'} className={isLive ? 'animate-pulse' : ''}>
          {isLive ? 'LIVE' : format(new Date(match.utcDate), 'HH:mm')}
        </Badge>
        <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
          {match.leagueId}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 relative">
             <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-semibold text-center line-clamp-1">{match.homeTeam.shortName}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          {isLive ? (
            <div className="text-2xl font-black text-primary">
              {match.score?.fullTime.home} - {match.score?.fullTime.away}
            </div>
          ) : (
            <div className="text-xl font-bold text-muted-foreground italic">VS</div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 relative">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-semibold text-center line-clamp-1">{match.awayTeam.shortName}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
         <div className="flex gap-1">
            {match.homeTeam.form?.map((r, i) => (
              <span key={i} className={cn("text-[10px] w-4 h-4 flex items-center justify-center rounded-sm font-bold",
                r === 'W' ? 'bg-primary text-black' : r === 'D' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white')}>
                {r}
              </span>
            ))}
         </div>
         <span className="text-xs text-primary font-bold group-hover:underline">ANALYZE →</span>
      </div>
    </div>
  );
}
