const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

export const formatDate = (localtime: string) => {
  // take localtime string and format it to display in the app
  const date = new Date(localtime);
  const hour = date
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const min = date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(2);
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  return { hour, min, dayName, day, year, monthName };
};
