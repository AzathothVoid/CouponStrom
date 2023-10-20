const Months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Semptember",
  "October",
  "November",
  "December",
];

export const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
    padTo2Digits(date.getDate()),
  ].join("/");
};

export const formatDateBlog = (date) => {
  return [
    [Months[date.getMonth()], padTo2Digits(date.getDate())].join(" "),
    date.getFullYear(),
  ].join(", ");
};

export const areDatesOneDayApart = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const timeDifference = Math.abs(date1 - date2);

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  return timeDifference === millisecondsInOneDay;
};
