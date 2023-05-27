import data from '../../data/data';

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
            class="btn btn-warning"
            title="add task"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <span class="material-symbols-sharp">add</span>
          </button>
        </section>
        <section>
          <h2>Task</h2>
          <hr>

          <!-- Add Task -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5"
                    id="exampleModalLabel">Add task</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <form id="add-task" method="post">
                  <div class="modal-body">
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="title-input">#</span>
                        <input
                          id="title"
                          type="text"
                          class="form-control"
                          placeholder="Title"
                          aria-label="Title"
                          aria-describedby="title-input" />
                      </div>
                      <div class="input-group mb-3">
                        <textarea
                          id="description"
                          class="form-control"
                          aria-label="Task Description"></textarea>
                      </div>
                      <div class="input-group mb-3">
                        <span class="input-group-text">
                          <span
                            class="material-symbols-sharp">date_range</span>  
                        </span>
                        <input
                          id="due-date"
                          type="date"
                          class="form-control"
                          placeholder="Due Date"
                          aria-label="Due Date"
                          aria-describedby="due-date">
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      id="cancel-add-task"
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal">Cancel</button>
                    <button
                      type="submit"
                      class="btn btn-warning">Add Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- End Add Task -->

          <div id="task-list"></div>
        </section>
      </main>
    `.trim();
  },

  async next() {
    const createCard = (data) => {
      /**
       * @param {Object} data Pass object data
       * @return HTMLElement
       */
      const {
        title,
        description,
        dueDate
      } = data;

      const cardContainer = document.createElement('div');

      cardContainer.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>${dueDate}</p>
        
      `;

      return cardContainer;
    };

    const navDrawerButton = document.querySelector('.open');

    navDrawerButton.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      document.querySelector('.navigation__drawer')
          .classList.toggle('open__drawer');
    });

    const taskList = document.querySelector('#task-list');

    taskList.addEventListener('render', (event) => {
      document.getElementById('task-list').innerHTML = '';

      const rawData = localStorage.getItem('demo');
      const _data = JSON.parse(rawData);
      console.log(_data);

      _data.forEach((data) => {
        const card = createCard(data);

        document.getElementById('task-list').appendChild(card);
      });
    });

    taskList.dispatchEvent(new Event('render'));

    const addTaskForm = document.querySelector('#add-task');

    addTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.querySelector('#title');
      const description = document.querySelector('#description');
      const dueDate = document.querySelector('#due-date');

      if (title.value === '' || title.value === null) {
        alert('Title is empty. Can\'t proceed');

        document.getElementById('cancel-add-task')
            .dispatchEvent(new Event('click'));

        return false;
      }

      if (dueDate.value === '' || dueDate.value === null) {
        alert('Due Date is empty. Can\'t proceed');

        document.getElementById('cancel-add-task')
            .dispatchEvent(new Event('click'));

        return false;
      }

      const _data = {
        title: title.value,
        description: description.value,
        dueDate: dueDate.value
      };

      data.push(_data);

      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('demo', JSON.stringify(data));
      }

      const card = createCard(_data);

      document.getElementById('task-list').appendChild(card);

      document.getElementById('cancel-add-task')
          .dispatchEvent(new Event('click'));

      addTaskForm.reset();

      taskList.dispatchEvent(new Event('render'));

      return true;
    });
  }
};

export default Dashboard;
