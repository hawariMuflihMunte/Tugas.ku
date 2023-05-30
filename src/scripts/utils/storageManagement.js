const storageManagement = {
  checkCompatibility() {
    if (typeof (Storage) === 'undefined') {
      console.error('Your browser does not support Web Storage API');
      return false;
    }
    return true;
  },

  saveLocal(key, data) {
    if (this.checkCompatibility()) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },

  loadLocal(key) {
    if (this.checkCompatibility()) {
      const raw = localStorage.getItem(key);
      return JSON.parse(raw);
    }
  },

  saveSession(key, data) {
    if (this.checkCompatibility()) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },

  loadSession(key) {
    if (this.checkCompatibility()) {
      const raw = sessionStorage.getItem(key);
      return JSON.parse(raw);
    }
  }
};

export default storageManagement;
