export const getDayvalue = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      throw new Error(`Invalid day value: ${day}`);
  }
};

export const getDateValue = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};
