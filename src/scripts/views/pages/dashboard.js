import CONFIG from '../../global/config';
import Backlog from '../../classes/Backlog';
import Presenter from '../../classes/Presenter';
import Controller from '../../classes/Controller';
import Drawer from '../../classes/UtilsDrawer';

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
            id="search-bar"
            class="form-control"
            placeholder="Search task"
            aria-label="Search task"
            aria-describedby="search-task"
            />
          <button
            type="button"
            id="search-button"
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
                      <div class="input-group mb-3 d-flex w-100">
                        <button
                          type="button"
                          id="add-task-item"
                          class="btn btn-outline-warning flex-fill">
                          <span
                            class="material-symbols-sharp">add</span> Task
                        </button>
                        <button
                          type="button"
                          id="remove-task-item"
                          class="btn btn-outline-warning flex-fill">
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

          <section id="data-list"></section>
        </section>
      </main>
    `.trim();
  },

  async next() {
    Drawer.renderDrawer();

    const backlog = new Backlog(CONFIG.APP_LOCAL_STORAGE_KEY);
    const presenter = new Presenter({
      listContainer: document.getElementById('data-list')
    });
    const controller = new Controller(backlog, presenter);
    controller.renderList();

    presenter.setController(controller);

    presenter.formAddData({
      form: document.getElementById('add-task'),
      title: document.getElementById('title'),
      description: document.getElementById('description'),
      date: document.getElementById('due-date'),
      inputsContainer: document.getElementById('task-items'),
      multipleInputsQuery: 'input[name=\'task\']',
      btnAddInput: document.getElementById('add-task-item'),
      btnRemoveInput: document.getElementById('remove-task-item'),
      inputClassName: 'form-control mb-2'
    });

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
      controller.searchData();
    });
  }
};

export default Dashboard;
