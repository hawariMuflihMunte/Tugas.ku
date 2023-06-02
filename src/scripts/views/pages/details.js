import urlParser from '../../routes/urlParser';
import storageManagement from '../../utils/storageManagement';
import CONFIG from '../../global/config';
import detail from '../../utils/detail';
import Drawer from '../../utils/drawer';

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
    Drawer.renderDrawer();

    const url = urlParser.parseActiveUrlWithoutCombiner();
    const getId = url.id; // Get id from URL param
    // const getResource = url.resource;
    // const getVerb = url.verb;

    // Render Data List
    const dataList = document.getElementById('data-list');
    dataList.addEventListener(CONFIG.DATA_LIST_RENDER, (event) => {
      event.stopImmediatePropagation();

      // Clear element first before injecting data
      dataList.innerHTML = '';

      const dataTask = storageManagement
          .loadLocal(CONFIG.APP_LOCAL_STORAGE_KEY);

      const task = dataTask
          .find((task) => task.id === Number(getId));

      if (task) {
        console.log('found: ', task);
      } else {
        console.log('not found');
      }

      if (task) {
        const card = detail(
            dataList,
            task
        );

        dataList.appendChild(card);
      }
    });
    dataList.dispatchEvent(new Event(CONFIG.DATA_LIST_RENDER));
  }
};

export default Details;
