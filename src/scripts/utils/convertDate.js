/**
 * @param {string} dateValue
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
 * @return {string}
 */
const convertDate = (dateValue, monthNames = []) => {
  const dateObj = new Date(dateValue);
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

