/**
 * Front-end local & session storage tools.
 */
const storageManagement = {
  /**
   * @return {Boolean}
   * - false
   * If your web browser does not support Web Storage API.\
   * Otherwise, return `true`.
   */
  checkCompatibility() {
    if (typeof (Storage) === 'undefined') {
      console.error('Your browser does not support Web Storage API');
      return false;
    }
    return true;
  },

  /**
   * @param {String} key
   * Data key
   * @param {String} data
   * Value to be saved in local
   */
  saveLocal(key, data) {
    if (this.checkCompatibility()) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },

  /**
   * @param {String} key
   * Data key to be retrieved
   * @return {Object|null}
   * - If `null` or `undefined` return `null`.
   * - Otherwise return `Object`.
   */
  loadLocal(key) {
    if (this.checkCompatibility()) {
      const raw = localStorage.getItem(key);
      if (raw !== null || raw !== undefined) {
        return JSON.parse(raw);
      } else {
        return null;
      }
    }
  },

  /**
   * @param {String} key
   * Data key
   * @param {String} data
   * Value to be saved in session
   */
  saveSession(key, data) {
    if (this.checkCompatibility()) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },

  /**
   * @param {String} key
   * Data key to be retrieved
   * @return {Object|null}
   * - If `null` or `undefined` return `null`.
   * - Otherwise return `Object`.
   */
  loadSession(key) {
    if (this.checkCompatibility()) {
      const raw = sessionStorage.getItem(key);
      if (raw !== null || raw !== undefined) {
        return JSON.parse(raw);
      } else {
        return null;
      }
    }
  }
};

export default storageManagement;
