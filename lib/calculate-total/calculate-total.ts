export const calculateTotal = (
  amounts: string
): { total: number; count: number } => {
  // Parse amounts input
  const parsedAmounts = amounts
    .split(/[\n,]+/)
    .map((amt) => {
      const trimmed = amt.trim();
      // Remove all hyphens from the start of the string
      const cleaned = trimmed.replace(/^-+/, "");
      return parseFloat(cleaned);
    })
    .filter(Boolean)
    .filter((num) => !isNaN(num)); // Filter out invalid numbers

  // Calculate total wei and token amount
  const total = parsedAmounts.reduce((acc, curr) => acc + curr, 0);
  const count = parsedAmounts.length;

  return { total, count };
};
