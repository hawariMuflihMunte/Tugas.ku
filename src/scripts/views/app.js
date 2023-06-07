import UrlParser from '../routes/UrlParser';
import routes from '../routes/routes';
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
    const urlParser = new UrlParser();

    this._app.innerHTML = loader(true);

    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    const loadComplete = new Event('load-complete');

    const pageResult = await page.render();

    document.addEventListener('load-complete', async () => {
      this._app.innerHTML = '';
      this._app.innerHTML = pageResult;
      await page.next();
    });

    setTimeout(() => {
      document.dispatchEvent(loadComplete);
    }, 400);
  }
};

export default App;
