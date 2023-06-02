/**
 * Create form task data handle
 * @class FormTask
 */
class FormTask {
  /**
   * @param {HTMLFormElement} container
   * Place HTMLFormElement inside the container.
   * @param {string} title
   * - Input string value.
   * @param {string} description
   * - Input string value.
   * @param {string} date
   * - Input string value.
   * @param {Array} tasks
   * - Input Array value.
   */
  constructor({
    container,
    title,
    description,
    date,
    tasks
  }) {
    this._container = container;
    this._title = title;
    this._description = description;
    this._date = date;
    this._tasks = tasks;
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
   * Generate object
   * @return {false|Object}
   * - `false` if title or date is invalid or empty.
   */
  createTaskObject() {
    if (this._validateTitle() || this._validateDate()) {
      return false;
    }

    return {
      id: this._generateId(),
      // createdAt: DD-MM-YYYY
      createdAt: new Date()
          .toLocaleDateString('en-GB').split('/').join('-'),
      title: this._title,
      description: this._description,
      // date: DD-MM-YYYY
      date: new Date(this._date)
          .toLocaleDateString('en-GB').split('/').join('-'),
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
