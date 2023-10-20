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
