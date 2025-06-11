

export function getMonthStartAndEnd(year: number, monthIndex: number) {
  const startDate = new Date(year, monthIndex, 1);
  const endDate = new Date(year, monthIndex + 1, 0); // last day of the month

  return {
    startDate,
    endDate,
  };
}
