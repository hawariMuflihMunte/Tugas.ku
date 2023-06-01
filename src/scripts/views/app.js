import urlParser from '../routes/urlParser';
import routes from '../routes/routes';
import storageManagement from '../utils/storageManagement';
import CONFIG from '../global/config';

/**
 * Initialize application
 * @class App
 */
class App {
  /**
   * @param {HTMLElement} app
   * Place your HTMLElement here. ex: document.getElementById('app').
   */
  constructor({
    app
  }) {
    this._app = app;
  }

  // eslint-disable-next-line require-jsdoc
  async render() {
    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Init localStorage with `global.CONFIG.localStorageKey`
    if (storageManagement.loadLocal(CONFIG.localStorageKey) === null) {
      storageManagement.saveLocal(CONFIG.localStorageKey, []);
    }

    this._app.innerHTML = await page.render();
    await page.next();
  }
};

export default App;
