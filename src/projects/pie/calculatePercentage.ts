export const calculatePercentage = (amt: number, totalAmt: number) => {
  const percentage = (amt / totalAmt) * 100;
  return percentage;
}