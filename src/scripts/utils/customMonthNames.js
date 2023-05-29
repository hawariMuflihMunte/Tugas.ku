/**
 * @param {Array} months
 * Set optional naming for month names,
 * if not set that default month name
 * will be used.
 * - Set array, ex. Indonesian month
 * names:\
 * ['Januari', 'Februari', 'Maret']
 * and so on.
 * - Please note to add a zero string (`''`)
 * first to avoid wrong month names indexing.
 * - Remember to write complete month
 * names, it exists 12 names for each
 * month.
 * - The default value is in Indonesian.
 * @return {Array} Used for naming months.
 */
const customMonthNames = (months = []) => {
  if (months.length === 0) {
    return [
      '',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];
  }
  return months;
};

export default customMonthNames;
