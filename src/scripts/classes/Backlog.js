class Backlog {
  constructor(key) {
    this._data = [];
    this._key = key;

    if (
      this.loadLocal() == null ||
      this.loadLocal() == undefined &&
      this._data.length === 0
    ) {
      this._data = [];
      this.saveLocal(this._data);
    }

    if (
      this.loadLocal() != null ||
      this.loadLocal() != undefined &&
      this._data.length === 0
    ) {
      const currentData = this.loadLocal();
      this._data = currentData == undefined ? [] : currentData;
      this.saveLocal(this._data);
    }

    // console.log('Backlog class init.');
  }

  /**
   * Adds an item to the data array.
   * @param {object} data - The item to be added.
   * @return {true|false}
   * Returns true if the item was added successfully,
   * false otherwise.
   */
  addData(data) {
    if (typeof data !== 'object') {
      return false;
    }

    this._data.push(data);
    this.saveLocal(this.getData());

    return true;
  }

  updateData() {
    this.saveLocal(this._data);

    const currentData = this.loadLocal();
    this._data = currentData;

    this.saveLocal(this._data);
  }

  getData() {
    return this._data;
  }

  getDataById(id) {
    if (typeof id !== 'number') {
      console.log('Please insert id as a valid number!');
      return false;
    }

    const data = this.loadLocal();
    const filterById = data.find((_data) => _data.id === Number(id));

    return filterById;
  }

  /**
   * @param {number} id
   * @param {object} data
   * @return {true|false}
   */
  updateDataById(id, data) {
    const currentData = this.getData();
    const index = currentData.findIndex((data) => data.id === Number(id));

    if (
      index != undefined ||
      index != null ||
      index !== -1
    ) {
      currentData[index] = data;
      this._data = currentData;
      this.saveLocal(this._data);

      return true;
    }

    return false;
  }

  deleteData(id) {
    this.updateData();

    const index = this._data.findIndex((data) => data.id === id);

    if (index === -1) {
      return false;
    }

    this._data.splice(index, 1);
    this.updateData();
    return true;
  }

  /**
   * @return {boolean}
   * return `false` if your web browser does
   * not support Web Storage API.\
   * Otherwise, return `true`.
   */
  checkCompatibility() {
    if (typeof (Storage) === 'undefined') {
      console.error('Your browser does not support Web Storage API');
      return false;
    }
    return true;
  }

  /**
   * @param {string} data
   * Value to be saved in local
   */
  saveLocal(data) {
    if (this.checkCompatibility()) {
      localStorage.setItem(this._key, JSON.stringify(data));
    }
  }

  /**
   * @return {null|Object}
   * - If `null` or `undefined` return `null`.
   * - Otherwise return `Object`.
   */
  loadLocal() {
    if (this.checkCompatibility()) {
      const raw = localStorage.getItem(this._key);

      try {
        return JSON.parse(raw);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return null;
      }
    }
  }

  /**
   * @param {String} data
   * Value to be saved in session
   */
  saveSession(data) {
    if (this.checkCompatibility()) {
      sessionStorage.setItem(this._key, JSON.stringify(data));
    }
  }

  /**
   * @return {null|Object}
   * - If `null` or `undefined` return `null`.
   * - Otherwise return `Object`.
   */
  loadSession() {
    if (this.checkCompatibility()) {
      const raw = sessionStorage.getItem(this._key);

      try {
        return JSON.parse(raw);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return null;
      }
    }
  }
};

export default Backlog;
