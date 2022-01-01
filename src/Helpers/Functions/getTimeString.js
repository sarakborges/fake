export const getTimeString = (date) => {
  date = new Date(date);

  let time = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    minute: date.getMinutes(),
    hour: date.getHours(),
    year: date.getFullYear(),
  };

  for (let item of Object.keys(time)) {
    let val = time[item];

    time = {
      ...time,
      [item]: `${val}`.length < 2 ? `0${val}` : val,
    };
  }

  const { day, month, year, minute, hour } = time;
  return `${day}/${month}/${year}, às ${hour}:${minute}`;
};
