export const getTimeString = (date, inverted) => {
  date = new Date(date);

  let time = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    minute: date.getMinutes(),
    second: date.getSeconds(),
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

  const { day, month, year, second, minute, hour } = time;

  if (inverted) {
    return `às ${hour}:${minute}:${second} de ${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year}, às ${hour}:${minute}`;
};
