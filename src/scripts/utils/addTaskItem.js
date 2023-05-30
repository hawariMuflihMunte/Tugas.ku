/**
 * @param {HTMLElement} container Any HTMLElement will work.\
 * This element will be `appendChild`ed with `<input>`.
 * @param {Array} classNames Set class name attribute for element.
 * - It should be an array of strings representing the class
 * names to be added.
 * @param {string} placeholder Insert placeholder for this `<input>`.
 * @return {boolean} if elements exceed requirement: 5 items.
 */
const addTaskItem = (
    container,
    classNames = [],
    placeholder = ''
) => {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';

  if (classNames.length !== 0) {
    inputElement.setAttribute('class', `${classNames.join(' ')}`);
  }

  if (container.childElementCount >= 5) {
    alert(`
    Maximum limit reached: ${container.childElementCount} items.
  `.trim());

    return false;
  }

  inputElement.placeholder = placeholder;

  container.appendChild(inputElement);
};

export default addTaskItem;
