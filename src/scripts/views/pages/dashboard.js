import storageManagement from '../../utils/storageManagement';
import createCard from '../../utils/card';
import FormTask from '../../utils/FormTask';
import TaskList from '../../utils/TaskList';
import CONFIG from '../../global/config';
import Drawer from '../../utils/drawer';

const Dashboard = {
  async render() {
    return `
      ${Drawer.renderInterface()}
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
                          <span
                            class="material-symbols-sharp">add</span> Task
                        </button>
                        <button
                          type="button"
                          id="remove-task-item"
                          class="btn btn-outline-warning">
                          <span
                            class="material-symbols-sharp">remove</span> Task
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

          <div id="data-list"></div>
        </section>
      </main>
    `.trim();
  },

  async next() {
    Drawer.renderDrawer();

    const taskListContainer = document.getElementById('task-items');
    const taskListAddBtn = document.getElementById('add-task-item');
    const taskListRemoveBtn = document.getElementById('remove-task-item');

    const tl = TaskList.init({
      container: taskListContainer,
      classNames: [
        'form-control',
        'mb-2'
      ],
      placeholder: 'Task'
    });

    // Add task item
    taskListAddBtn.addEventListener('click', () => {
      tl.addItem();
    });

    // Remove task item
    taskListRemoveBtn.addEventListener('click', () => {
      tl.removeItem();
    });

    // Add Data
    const taskFormContainer = document.getElementById('add-task');
    taskFormContainer.addEventListener('submit', (event) => {
      event.preventDefault();

      const _tasks = taskListContainer.childNodes;
      const _tasksArray = [..._tasks];
      const tasks = _tasksArray
          .map((task) => task.value)
          .filter((value) => value !== '')
          .map((value) => ({
            task: value,
            isDone: false
          }));
      /*
      Convert Array value into Object:
      ```javascript
      {
        task: value,
        isDone: false
      }
      ```
      isDone value is initialized to false.
      */

      const taskForm = new FormTask({
        container: taskFormContainer,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        date: document.getElementById('due-date').value,
        tasks: tasks
      });

      taskForm.formReset();

      const taskData = taskForm.createTaskObject();

      console.log(taskData);

      const currentData = storageManagement
          .loadLocal(CONFIG.APP_LOCAL_STORAGE_KEY);
      console.log(currentData);

      /*
        Since `false` is occur when validation error is true,
        then filter data using this logic.
      */
      if (taskData != false) {
        currentData.push(taskData);
      }

      storageManagement.saveLocal(CONFIG.APP_LOCAL_STORAGE_KEY, currentData);

      // Close form (by clicking close button)
      document.getElementById('cancel-add-task')
          .dispatchEvent(new Event('click'));

      dataList.dispatchEvent(new Event(CONFIG.DATA_LIST_RENDER));
    });

    // Render Data List
    const dataList = document.getElementById('data-list');
    dataList.addEventListener(CONFIG.DATA_LIST_RENDER, (event) => {
      event.stopImmediatePropagation();

      // Clear element first before injecting data
      dataList.innerHTML = '';

      const dataTask = storageManagement
          .loadLocal(CONFIG.APP_LOCAL_STORAGE_KEY);

      // console.log(dataTask);

      if (dataTask.length !== 0) {
        dataTask.forEach((data) => {
          const card = createCard(
              data,
              `/#/details/${data.id}`
          );

          dataList.appendChild(card);
        });
      } else {
        const message = document.createElement('span');
        message.textContent = '-- No Data --';

        dataList.appendChild(message);
      }
    });
    dataList.dispatchEvent(new Event(CONFIG.DATA_LIST_RENDER));
  }
};

export default Dashboard;
