const Dashboard = {
  async render() {
    return `
      <nav class="navigation">
        <a href="/#/dashboard">Tugas.ku</a>
        <button class="open material-symbols-sharp">widgets</button>
        <ul class="navigation__drawer">
          <li>
            <a href="/#/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="https://github.com/hawariMuflihMunte/Tugas.ku">About</a>
          </li>
        </ul>
      </nav>
      <main class="container__custom">
        <section class="input-group mt-2 mb-5">
          <span class="input-group-text" id="search-task">
            <span class="material-symbols-sharp">search</span>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search task"
            aria-label="Search task"
            aria-describedby="search-task"
            />
          <button
            type="button"
            id="search-task"
            class="btn btn-success"
            title="search task">
            <span class="material-symbols-sharp">search_check</span>  
          </button>
          <button
            type="button"
            id="add-task"
            class="btn btn-warning"
            title="add task">
            <span class="material-symbols-sharp">add</span>
          </button>
        </section>
        <section>
          <h2>Task</h2>
          <div id="task-list"></div>
        </section>
      </main>
    `.trim();
  },

  async next() {
    const navDrawerButton = document.querySelector('.open');

    navDrawerButton.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      document.querySelector('.navigation__drawer')
          .classList.toggle('open__drawer');
    });
  }
};

export default Dashboard;
