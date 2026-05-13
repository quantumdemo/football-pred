import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return "text-primary";
  if (confidence >= 80) return "text-green-400";
  if (confidence >= 66) return "text-yellow-400";
  return "text-orange-400";
}

export function getRiskLabel(confidence: number): string {
  if (confidence >= 90) return "ELITE";
  if (confidence >= 80) return "STRONG";
  if (confidence >= 66) return "MEDIUM";
  return "LOW";
}
