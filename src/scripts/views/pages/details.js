import urlParser from '../../routes/urlParser';

const Details = {
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
        <a
          href="/#/dashboard"
          class="btn btn-secondary btn-sm"
          style="--text: #fff;">Back</a>
        <div id="task"></div>
      </main>
    `.trim();
  },

  async next() {
    try {
      const url = urlParser.parseActiveUrlWithoutCombiner();
      const getId = url.id;
      const getResource = url.resource;
      const getVerb = url.verb;

      console.log(getId, getResource, getVerb);

      // Get data from localStorage
      let taskDetailsArray;
      if (typeof (Storage) !== 'undefined') {
        const _taskDetailsRawFormat = localStorage.getItem('demo');
        const _taskDetails = JSON.parse(_taskDetailsRawFormat);
        taskDetailsArray = _taskDetails;

        console.log(_taskDetails);
      }

      // console.log(taskDetailsArray);

      const getTask = taskDetailsArray
          .find((task) => task.id === Number('1685357070277'));

      if (getTask) {
        console.log('found: ', getTask);
      } else {
        console.log('not found');
      }

      // id
      // title
      // description
      // dueDate
      // tasks

      const taskContainer = document.getElementById('task');

      const tasksContainer = document.createElement('ul');

      getTask['tasks'].forEach((task) => {
        const list = document.createElement('li');
        list.textContent = task;

        tasksContainer.appendChild(list);

        return taskContainer;
      });

      taskContainer.innerHTML = `
        <h2>${getTask.title}</h2>
        <p>${getTask.description}</p>
        <p>${getTask.dueDate}</p>
        <details>
          <summary>Task</summary>

          <div id="task-list"></div>
        </details>
      `;

      document.getElementById('task-list').appendChild(tasksContainer);
    } catch (error) {
      console.log(error);
    }
  }
};

export default Details;
