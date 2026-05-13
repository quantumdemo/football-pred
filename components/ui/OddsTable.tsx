import { Odds } from "@/types";
import { formatOdds } from "@/lib/utils";

interface OddsTableProps {
  odds: Odds[];
}

export function OddsTable({ odds }: OddsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Bookmaker</th>
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">1</th>
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">X</th>
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">2</th>
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Over 2.5</th>
            <th className="py-3 px-4 text-xs font-bold text-muted-foreground uppercase">BTTS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {odds.map((o, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 font-bold text-sm">{o.bookmaker}</td>
              <td className="py-4 px-4 text-primary font-mono font-bold">{formatOdds(o.homeWin)}</td>
              <td className="py-4 px-4 text-white font-mono">{formatOdds(o.draw)}</td>
              <td className="py-4 px-4 text-primary font-mono font-bold">{formatOdds(o.awayWin)}</td>
              <td className="py-4 px-4 text-white font-mono">{formatOdds(o.over25)}</td>
              <td className="py-4 px-4 text-white font-mono">{formatOdds(o.bttsYes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
