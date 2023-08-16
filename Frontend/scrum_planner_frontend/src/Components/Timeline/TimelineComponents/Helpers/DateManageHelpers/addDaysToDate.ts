export const addDaysToDate = (inputDate: string, daysToAdd: number) => {
  const [monthStr, dayStr, yearStr] = inputDate.split("/");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + daysToAdd);

  const resultDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  return resultDate;
};
