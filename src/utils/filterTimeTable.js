const dayMap = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

export const filterTimeTable = (timetable) => {
  const currDay = dayMap[new Date().getDay()];
  const currDayTimeTable = timetable.filter((ele) => {
    if (ele.Day === currDay) {
      return true;
    }
    return false;
  });
  return currDayTimeTable;
};

export const allItems = (timeTable) => {
  const items = [];
  timeTable.forEach((ele) => {
    ele.Items.forEach((item) => {
      items.push(item);
    });
  });
  return items;
};
