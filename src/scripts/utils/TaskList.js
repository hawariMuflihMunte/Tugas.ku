const TaskList = {
  /**
   * @param {HTMLElement} container Any HTMLElement will work.\
   * This element will be `appendChild` with `<input>`.
   * @param {Array} classNames Set class name attribute for element.
   * - It should be an array of strings representing the class
   * names to be added.
   * @param {string} placeholder Insert placeholder for this
   * `<input>`.
   * @return {this}
   */
  init({
    container,
    classNames,
    placeholder
  }) {
    this._container = container;
    this._classNames = classNames;
    this._placeholder = placeholder;

    this._placeholder = String(this._placeholder);
    this._placeholder.trim();

    return this;
  },

  /**
   * Adds task item to the desired `HTMLElement`
   * (appended as `HTMLElement`).
   * @return {false|true}
   * - If `container.childElementCount >= 5` return false.
   * - Otherwise return true.
   */
  addItem() {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.required = true;

    if (this._classNames.length !== 0) {
      inputElement.setAttribute('class', `${this._classNames.join(' ')}`);
    }

    if (this._container.childElementCount >= 5) {
      alert(`
      Maximum item limit reached: ${this._container.childElementCount} items.
    `.trim());

      return false;
    }

    inputElement.placeholder = this._placeholder;

    this._container.appendChild(inputElement);

    return true;
  },

  /**
   * @param {HTMLElement} container Any HTMLElement will work.\
   * This element will be used to remove `childNodes`.
   * @return {true}
   */
  removeItem() {
    const lastChild = this._container.lastChild;

    if (lastChild) {
      this._container.removeChild(lastChild);
      return true;
    }
  }
};

export default TaskList;
