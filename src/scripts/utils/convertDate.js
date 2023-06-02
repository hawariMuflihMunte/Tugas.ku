/**
 * @param {String} dateValue
 * Valid date string
 * - YYYY/MM/DD
 * @param {Array} monthNames
 * Set optional naming for month names,
 * if not set that default month name
 * will be used.
 * - Set array, ex. Indonesian month
 * names:\
 * ['Januari', 'Februari', 'Maret']
 * and so on.
 * - Remember to write complete month
 * names, it exists 12 names for each
 * month.
 * @return {String}
 */
const convertDate = (dateValue, monthNames = []) => {
  const dateString = dateValue;
  const parts = dateString.split('-');
  const _day = parseInt(parts[0], 10);
  // Subtract 1 from the month value (months are zero-based)
  const _month = parseInt(parts[1], 10) - 1;
  const _year = parseInt(parts[2], 10);
  const _date = new Date(_year, _month, _day);

  const dateObj = new Date(_date.getTime());
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  if (monthNames.length === 0) {
    return `${day} ${monthIndex} ${year}`;
  }

  if (monthNames.length !== 0) {
    const _monthNames = monthNames;
    return `${day} ${_monthNames[monthIndex]} ${year}`;
  }
};

export default convertDate;
