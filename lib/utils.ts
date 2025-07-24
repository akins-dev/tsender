import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateTotal = (
  amounts: string
): { total: number; count: number } => {
  // Parse amounts input
  const parsedAmounts = amounts
    .split(/[\n,]+/)
    .map((amt) => amt.trim())
    .filter(Boolean)
    .map(Number)
    .filter((num) => !isNaN(num)); // Filter out invalid numbers

  // Calculate total wei and token amount
  const total = parsedAmounts.reduce((acc, curr) => acc + curr, 0);
  const count = parsedAmounts.length;

  return { total, count };
};
