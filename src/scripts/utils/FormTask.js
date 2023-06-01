/**
 * Create form task data handle
 * @class FormTask
 */
class FormTask {
  /**
   * @param {Object} data
   * @param {HTMLFormElement} data.container
   * Place HTMLFormElement inside the container.
   * @param {string} data.title
   * - Input string value.
   * @param {string} data.description
   * - Input string value.
   * @param {string} data.date
   * - Input string value.
   * @param {Array} data.tasks
   * - Input string value.
   *
   * @param {Object} taskList
   * @param {HTMLElement} taskList.container
   * Place HTMLElement inside the container.
   * @param {Array} taskList.classNames
   * The given `string` array will be converted
   * to class attribute to this element.
   * @param {string} taskList.placeholder
   * Placeholder for element.
   */
  constructor(
      data = {
        container,
        title,
        description,
        date,
        tasks
      }
  ) {
    // Data
    this._container = data.container;
    this._title = data.title;
    this._description = data.description;
    this._date = data.date;
    this._tasks = data.tasks;

    this._validateTitle();
    this._validateDate();
  }

  /**
   * Return random number between 1 - 99999
   * @return {Number}
   */
  _generateId() {
    const minId = 1;
    const maxId = 99999;
    const combineMinMax = Math.floor(
        Math.random() * (maxId - minId + 1) + minId
    );
    const timeStamp = Number(new Date());
    const id = Number(combineMinMax + timeStamp);

    return Number(id);
  };

  /**
   * Static method that returns
   * random number between 1 - 99999
   * (5 digits).
   * @return {Number}
   */
  static generateId() {
    const minId = 1;
    const maxId = 99999;
    const combineMinMax = Math.floor(
        Math.random() * (maxId - minId + 1) + minId
    );
    const timeStamp = Number(new Date());
    const id = Number(combineMinMax + timeStamp);

    return Number(id);
  };

  /**
   * Check whether Object is empty or not.
   * @param {Object} obj
   * @return {Boolean}
   */
  isObjectEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  _validateTitle() {
    if (
      this._title === '' ||
      this._title === null ||
      this._title === undefined
    ) {
      alert('Title is empty!');
      return true;
    }
    return false;
  }

  _validateDate() {
    if (
      this._date === '' ||
      this._date === null ||
      this._date === undefined
    ) {
      alert('Date is empty!');
      return true;
    }
    return false;
  }

  /**
   * Object-ize string value
   * @return {Object}
   */
  createTaskObject() {
    return {
      id: this.generateId(),
      // createdAt: DD-MM-YYYY
      createdAt: new Date().toLocaleDateString('en-GB').split('/').join('-'),
      title: this._title,
      description: this._description,
      date: this._date,
      tasks: this._tasks
    };
  }

  /**
   * @function void
   */
  formReset() {
    this._container.reset();
  }
};

export default FormTask;
