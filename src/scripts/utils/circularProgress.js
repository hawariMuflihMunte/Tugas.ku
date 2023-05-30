/**
 * @param {Number} value
 * - Limit value is 100
 * @param {Number} size
 * Set progress bar size
 * - Default size: `60px`
 * @param {Object} loaderOptions
 * A valid coloring string.\
 * If you want to customize this element,
 * You should pass all the required string
 * arguments in this object. If not, the
 * element will produce an error.
 * @param {string} loaderOptions.strokeColor
 * - Set stroke color
 * @param {string} loaderOptions.strokeLineColor
 * - Set stroke line color
 * @param {string} loaderOptions.centerColor
 * - Set circular center color
 * @param {string} loaderOptions.valueColor
 * - Set value color
 * @return {HTMLElement} progressBar
 */
const circularProgress = (
    value = 0,
    size = 60,
    loaderOptions = {
      strokeColor: 'blue',
      strokeLineColor: '#ededed',
      centerColor: 'white',
      valueColor: 'blue'
    }
) => {
  const progressBar = document.createElement('div');
  progressBar.classList.add('progress__component');

  const style = document.createElement('style');

  style.textContent = `
    .progress__component {
      position: relative;
      min-height: 40px;
      height: ${size}px;
      min-width: 40px;
      width: ${size}px;
      border-radius: 50%;
      background: conic-gradient(
        ${loaderOptions.strokeColor} 3.6deg,
        ${loaderOptions.strokeLineColor} 0deg
      );
      display: flex;
      place-content: center;
      place-items: center;
      margin: 6px;
    }

    .progress__component::before {
      content: "";
      position: absolute;
      min-height: 30px;
      height: calc(${size}px - 10px);
      min-width: 30px;
      width: calc(${size}px - 10px);
      border-radius: 50%;
      background-color: ${loaderOptions.centerColor} !important;
    }

    .progress__component .progress__value {
      position: relative;
      font-weight: 500;
      font-size: 12px;
      color: ${loaderOptions.valueColor};
    }
  `.trim();

  progressBar.appendChild(style);

  const progressBarValue = document.createElement('span');
  progressBarValue.classList.add('progress__value');
  progressBar.appendChild(progressBarValue);

  // Set value limit to 100
  let _value = value;
  if (value >= 100) {
    _value = 100;
  }

  let incrementer = 0;
  const progressEndValue = _value + 1;
  const speed = 6;

  const progress = setInterval(() => {
    progressBarValue.textContent = `${incrementer}%`;
    progressBar.setAttribute('style', `
    background:
      conic-gradient(
        ${loaderOptions.strokeColor}
        ${incrementer * 3.6}deg,
        ${loaderOptions.strokeLineColor} 0deg
      );
  `.trim());

    if (incrementer >= _value) {
      clearInterval(progress);
    }

    if (_value >= progressEndValue) {
      clearInterval(progress);
    }

    incrementer++;
  }, speed);

  return progressBar;
};

export default circularProgress;
