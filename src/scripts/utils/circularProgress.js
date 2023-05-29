/**
 * @param {Number} value
 * @param {Number} size
 * - Set progress bar size in `px`
 * @param {Object} options
 * A valid coloring string for UI color
 * @param {string} options.circularBarProgressColor
 * - Set stroke color
 * @param {string} options.circularBarProgressContainerColor
 * - Set stroke container color
 * @param {string} options.centerCircleColor
 * - Set stroke container color
 * @param {string} options.valueColor
 * - Set value color
 * @return {HTMLElement} progressBar
 */
const circularProgress = (
    value = 0,
    size = 60,
    options = {
      circularBarProgressColor: 'blue',
      circularBarProgressContainerColor: '#ededed',
      centerCircleColor: 'white',
      valueColor: 'blue'
    }
) => {
  const style = document.createElement('style');

  style.textContent = `
  .progress {
    position: relative;
    height: ${size}px;
    width: ${size}px;
    border-radius: 50%;
    background: conic-gradient(
      ${options.circularBarProgressColor} 3.6deg,
      ${options.circularBarProgressContainerColor} 0deg
    );
    display: flex;
    place-content: center;
    place-items: center;
    margin: 6px;
  }

  .progress::before {
    content: "";
    position: absolute;
    height: calc(${size}px - 10px);
    width: calc(${size}px - 10px);
    border-radius: 50%;
    background-color: ${options.centerCircleColor} !important;
  }

  .progress .progress__value {
    position: relative;
    font-weight: 600;
    color: ${options.valueColor};
  }
`.trim();

  const progressBar = document.createElement('div');
  progressBar.classList.add('progress');

  progressBar.appendChild(style);

  const progressBarValue = document.createElement('span');
  progressBarValue.classList.add('progress__value');
  progressBar.appendChild(progressBarValue);

  let incrementer = 0;
  const _value = value;
  const progressEndValue = 100;
  const speed = 10;

  const progress = setInterval(() => {
    if (incrementer >= _value) {
      clearInterval(progress);
    }

    progressBarValue.textContent = `${incrementer}%`;
    progressBar.setAttribute('style', `
    background:
      conic-gradient(
        ${options.circularBarProgressColor}
        ${incrementer * 3.6}deg,
        ${options.circularBarProgressContainerColor} 0deg
      );
  `.trim());

    if (_value === progressEndValue) {
      clearInterval(progress);
    }

    incrementer++;
  }, speed);

  return progressBar;
};

export default circularProgress;
