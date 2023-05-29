import data from '../../data/data';
import convertDate from '../../utils/convertDate';
import generateId from '../../utils/generateId';
import customMonthNames from '../../utils/customMonthNames';
import circularProgress from '../../utils/circularProgress';

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
            data-bs-target="#addTask">
            <span class="material-symbols-sharp">add</span>
          </button>
        </section>
        <section>
          <h2><span class="material-symbols-sharp">task</span> Your Task</h2>
          <hr>

          <!-- Add Task -->
          <div
            class="modal fade"
            id="addTask"
            tabindex="-1"
            aria-labelledby="addTaskLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5"
                    id="addTaskLabel">Add task</h1>
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
                        <button
                          type="button"
                          id="add-task-item"
                          class="btn btn-outline-warning">
                          <span class="material-symbols-sharp">add</span> Task
                        </button>
                      </div>
                      <div
                        id="task-items"
                        class="mb-3 flex flex-col gap-3"></div>
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
    /**
       * @param {Object} data Pass object data
       * @param {string} cardLink
       * Specify the card link
       * - id
       * @return {HTMLElement}
       */
    const createCard = (
        data,
        cardLink = '#') => {
      const {
        title,
        description,
        dueDate
      } = data;

      const cardContainer = document.createElement('a');
      cardContainer.classList.add('card__custom');
      cardContainer.href = `${cardLink}`;

      const style = document.createElement('style');
      style.textContent = `
        a {
          text-decoration: none;
        }

        .card__custom {
          display: flex;
          justify-content: space-between;
          border-radius: 4px;
          padding: 6px;
          background-color: white;

          flex-direction: row;
          box-shadow: 0 1px 12px rgba(126, 126, 126, 0.32);
          cursor: pointer;
          width: 100%;
        }

        .card__custom:focus,
        .card__custom:hover {
          backgrond-color: grey;
        }

        .card__details {
          padding-top: 11px;
          padding-left: 11px;
          min-width: 80%;
          color: #666666;
        }

        .card__progress {
          display: flex;
          place-items: center;
          place-content: center;
          width: 100%;
          height: 100;
        }

        .card__title {
          font-weight: 500;
          margin-bottom: 7.5px;
        }

        .card__description {
          font-size: 16px;
        }

        .card__date {
          font-style: italic;
          color: #898989;
          font-size: 14px;
        }
      `.trim();
      cardContainer.appendChild(style);

      const detailsData = document.createElement('div');
      detailsData.classList.add('card__details');

      const detailsProgress = document.createElement('div');
      detailsProgress.classList.add('card__progress');

      const _title = document.createElement('h3');
      _title.textContent = title.toUpperCase();
      _title.classList.add('card__title');
      detailsData.appendChild(_title);

      const _description = document.createElement('p');
      _description.textContent = description;
      _description.classList.add('card__description');
      detailsData.appendChild(_description);

      const _dueDate = document.createElement('p');
      const date = convertDate(dueDate, customMonthNames());

      _dueDate.textContent = date;
      _dueDate.classList.add('card__date');
      detailsData.appendChild(_dueDate);

      cardContainer.appendChild(detailsData);

      const progress = circularProgress(99, 40);

      detailsProgress.appendChild(progress);
      cardContainer.appendChild(progress);

      return cardContainer;
    };

    // Add task item
    /**
     * @param {HTMLElement} container Any HTMLElement will work.
     * @param {Array} classNames Set class name attribute for element.
     * - It should be an array of strings representing the class
     * names to be added.
     * @param {string} placeholder Insert placeholder for this `<input>`.
     * @return {boolean} if elements exceed requirements: 5 items.
     */
    const addTaskItem = (
        container,
        classNames = [],
        placeholder = ''
    ) => {
      const newElement = document.createElement('input');
      newElement.type = 'text';

      if (classNames.length !== 0) {
        newElement.setAttribute('class', `${classNames.join(' ')}`);
      }

      if (container.childElementCount >= 5) {
        alert(`
          Maximum limit reached: ${container.childElementCount} items.
        `.trim());

        return false;
      }

      newElement.placeholder = placeholder;

      container.appendChild(newElement);
    };

    const addTaskItemButton = document.getElementById('add-task-item');
    const addTaskItemContainer = document.getElementById('task-items');
    addTaskItemButton.addEventListener('click', () => {
      addTaskItem(addTaskItemContainer, [
        'form-control',
        'mb-2'
      ], `
        Task
      `.trim());
    });

    const navDrawerButton = document.querySelector('.open');

    navDrawerButton.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      document.querySelector('.navigation__drawer')
          .classList.toggle('open__drawer');
    });

    const taskList = document.querySelector('#task-list');

    taskList.addEventListener('render', (event) => {
      event.stopImmediatePropagation();

      document.getElementById('task-list').innerHTML = '';

      const rawData = localStorage.getItem('demo');
      const _data = JSON.parse(rawData);
      console.log(_data);

      _data.forEach((data) => {
        const card = createCard(
            data,
            `/#/details/${data.id}`
        );

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

      const _tasks = addTaskItemContainer.querySelectorAll('input');
      const _tasksArray = [..._tasks];
      const tasks = _tasksArray.map((task) => task.value);
      // console.log(tasks);

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
        id: generateId(),
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        tasks: tasks
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
