import '../stylesheet/styles.scss';

// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';

import 'regenerator-runtime';

import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  app: document.getElementById('app')
});

window.onload = async () => {
  await app.render();
  swRegister();
};

window.onhashchange = async () => {
  await app.render();
};
