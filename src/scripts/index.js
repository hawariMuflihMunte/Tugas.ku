import '../stylesheet/styles.scss';

// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';

import 'regenerator-runtime';

import App from './views/app';

const app = new App({
  app: document.getElementById('app')
});

window.onload = async () => {
  await app.render();
};

window.onhashchange = async () => {
  await app.render();
};
