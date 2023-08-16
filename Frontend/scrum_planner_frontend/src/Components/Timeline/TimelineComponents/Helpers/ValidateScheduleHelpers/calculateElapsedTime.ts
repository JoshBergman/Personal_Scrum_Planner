export const calculateTimeAfter = (
  targetTimeStr: string,
  elapsedHours: number
) => {
  const [targetHour, period] = targetTimeStr.split(" ");

  const isPM = period === "PM";
  let hour = parseInt(targetHour);

  if (isPM && hour !== 12) {
    hour += 12;
  } else if (!isPM && hour === 12) {
    hour = 0;
  }

  const targetTime = new Date();
  targetTime.setHours(hour, 0, 0, 0);

  const elapsedMilliseconds = elapsedHours * 60 * 60 * 1000;
  const newTime = new Date(targetTime.getTime() + elapsedMilliseconds);

  const newHours = newTime.getHours();
  // const newMinutes = newTime.getMinutes();
  const newPeriod = newHours >= 12 ? "PM" : "AM";
  const displayHours = newHours % 12 === 0 ? 12 : newHours % 12;

  return `${displayHours} ${newPeriod}`;
};
