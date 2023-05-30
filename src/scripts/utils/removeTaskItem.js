/**
 * @param {HTMLElement} container Any HTMLElement will work.\
 * This element will be used to remove `childNodes`.
 */
const removeTaskItem = (container) => {
  const lastChild = container.lastChild;

  if (lastChild) {
    container.removeChild(lastChild);
  }
};

export default removeTaskItem;
