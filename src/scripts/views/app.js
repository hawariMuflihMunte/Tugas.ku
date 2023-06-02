import urlParser from '../routes/urlParser';
import routes from '../routes/routes';
import storageManagement from '../utils/storageManagement';
import CONFIG from '../global/config';
import loader from '../utils/loader';

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
    this._app.innerHTML = loader(true);

    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Init localStorage with `global.CONFIG.key`
    if (storageManagement.loadLocal(CONFIG.APP_LOCAL_STORAGE_KEY) === null) {
      storageManagement.saveLocal(CONFIG.APP_LOCAL_STORAGE_KEY, []);
    }

    const loadComplete = new Event('load-complete');

    const pageResult = await page.render();

    document.addEventListener('load-complete', async () => {
      this._app.innerHTML = '';
      this._app.innerHTML = pageResult;
      await page.next();
    });

    setTimeout(() => {
      document.dispatchEvent(loadComplete);
    }, 10);
  }
};

export default App;
