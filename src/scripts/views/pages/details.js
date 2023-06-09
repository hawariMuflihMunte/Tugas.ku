import CONFIG from '../../global/config';
import UrlParser from '../../routes/UrlParser';
import Backlog from '../../classes/Backlog';
import Presenter from '../../classes/Presenter';
import Controller from '../../classes/Controller';
import Drawer from '../../classes/UtilsDrawer';

const Details = {
  async render() {
    return `
      ${Drawer.renderInterface()}
      <main class="container__custom">
        <a
          href="/#/dashboard"
          class="btn btn-secondary btn-sm"
          style="--text: #fff;">Back</a>
        <section id="data-list"></section>
      </main>
    `.trim();
  },

  async next() {
    const urlParser = new UrlParser();

    Drawer.renderDrawer();

    const url = urlParser.parseActiveUrlWithoutCombiner();
    const getId = url.id; // Get id from URL param
    const id = Number(parseInt(getId));
    // const getResource = url.resource;
    // const getVerb = url.verb;

    const backlog = new Backlog(CONFIG.APP_LOCAL_STORAGE_KEY);
    const presenter = new Presenter({
      listContainer: document.getElementById('data-list')
    });
    const controller = new Controller(backlog, presenter);
    controller.renderDetail(id);

    presenter.setController(controller);
  }
};

export default Details;
