const Drawer = {
  /**
   * @return {string}
   */
  renderInterface() {
    return `
      <nav class="navigation-custom">
        <a href="/#/dashboard">Tugas.ku</a>
        <button class="navigation-custom-drawer">
          <span class="material-symbols-sharp">widgets</span>
        </button>
        <ul class="navigation-custom__drawer">
          <li>
            <a href="/#/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="https://github.com/hawariMuflihMunte/Tugas.ku">About</a>
          </li>
        </ul>
      </nav>
    `.trim();
  },

  /**
   * @function void
   */
  renderDrawer() {
    document.querySelector('.navigation-custom-drawer')
        .addEventListener('click', (event) => {
          event.stopImmediatePropagation();
          document.querySelector('.navigation-custom__drawer')
              .classList.toggle('navigation-custom-drawer__open');
        });
  }
};

export default Drawer;
