"use client";

import Link from "next/link";
import { Brain, LayoutDashboard, Zap, Trophy, TrendingUp, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Predictions', href: '/predictions', icon: Brain },
    { name: 'Live', href: '/live', icon: Zap },
    { name: 'Odds', href: '/odds-comparison', icon: TrendingUp },
    { name: 'AI Insights', href: '/ai-insights', icon: Trophy },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
             <div className="bg-primary p-1.5 rounded-lg">
                <Brain className="w-6 h-6 text-black" />
             </div>
             <span className="text-xl font-black tracking-tighter">FOOTBALL<span className="text-primary">INTEL</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-bold flex items-center gap-2 transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="bg-secondary border border-border rounded-full py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-primary w-48 lg:w-64"
                />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
