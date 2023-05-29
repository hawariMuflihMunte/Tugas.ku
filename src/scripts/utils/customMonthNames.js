/**
 * @param {Array} months
 * Set naming for month names,
 * - Pass array data, ex. Indonesian month
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
