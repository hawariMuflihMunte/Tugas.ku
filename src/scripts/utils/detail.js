import convertDate from './convertDate';
import circularProgress from './circularProgress';
import customMonthNames from './customMonthNames';
import storageManagement from './storageManagement';
import CONFIG from '../global/config';

const detail = (
    container,
    data
) => {
  const _container = container;

  /*
    {
      id: Number(id),
      createdAt: Date("DD-MM-YYYY"),
      title: String(title),
      description: String(description),
      date: Date("DD-MM-YYYY"),
      tasks: Array(tasks)
    }
  */

  const {
    id,
    createdAt,
    title,
    description,
    date,
    tasks
  } = data;

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('detail-card');

  const makeTimeString = createdAt.split('-');
  const makeTimeNumber = new Date(
      makeTimeString[2], makeTimeString[1] - 1, makeTimeString[0]
  );

  cardContainer.setAttribute('created-at', makeTimeNumber.getTime());

  // const decryptTime = makeTimeNumber
  //     .toLocaleDateString('en-GB').split('/').join('-');

  const style = document.createElement('style');
  style.textContent = `
    a {
      text-decoration: none;
    }

    .detail-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    .detail-column {
      display: flex;
      flex-direction: column;
    }

    .detail-card {
      display: flex;
      border-radius: 4px;
      padding: 18px;
      background-color: white;
      flex-direction: column;

      box-shadow: 0 1px 12px rgba(126, 126, 126, 0.32);
      color: #777;
    }

    .detail-card:focus,
    .detail-card:hover {
      opacity: 0.85;
    }

    .detail-card__details {
      min-width: 80%;
      color: inherit;
    }

    .detail-card__progress {
      display: flex;
      place-items: center;
      place-content: center;
      width: 100%;
      height: 100%;
    }

    .detail-card__title {
      font-weight: 500;
      margin-bottom: 7.5px;
    }

    .detail-card__description {
      font-size: 16px;
    }

    .detail-card__date {
      font-style: italic;
      color: #898989;
      font-size: 14px;
    }

    .detail-card__task-list-container {
      margin: 0;
      padding: 0;
      list-style: none;
      color: inherit;
    }

    .detail-card__task-list-container > .detail-card__task-list {
      border-top: 2px solid #eee;
    }

    .detail-card__task-list {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      transition: 160ms ease;
      cursor: pointer;

      font-size: 14px;
      color: inherit;
    }

    .detail-card__task-list:focus,
    .detail-card__task-list:hover {
      opacity: 0.7;
      box-shadow: inset 0 2px 8px #ccc;
      color: #000;
    }
  `.trim();
  cardContainer.appendChild(style);

  const detailsRow = document.createElement('div');
  detailsRow.classList.add('detail-row');

  const detailsData = document.createElement('div');
  detailsData.classList.add('detail-card__details');

  const detailsProgress = document.createElement('div');
  detailsProgress.classList.add('detail-card__progress');

  const _title = document.createElement('h3');
  _title.textContent = title.toUpperCase();
  _title.classList.add('detail-card__title');
  detailsData.appendChild(_title);

  const _description = document.createElement('p');
  _description.textContent = description;
  _description.classList.add('detail-card__description');
  detailsData.appendChild(_description);

  const _dueDate = document.createElement('p');
  const _date = convertDate(date, customMonthNames());

  _dueDate.textContent = _date;
  _dueDate.classList.add('detail-card__date');
  detailsData.appendChild(_dueDate);

  detailsRow.appendChild(detailsData);
  cardContainer.appendChild(detailsRow);

  let progressValue;
  if (tasks.length === 0) {
    progressValue = tasks.length;
  }

  if (tasks.length !== 0) {
    const countDoneTasks = tasks.filter((task) => task.isDone).length;

    const setValueToProgress = countDoneTasks / tasks.length * 100;
    progressValue = setValueToProgress;
  }

  const unorderedList = document.createElement('ul');
  unorderedList.classList.add('detail-card__task-list-container');

  if (tasks.length !== 0) {
    tasks.forEach((task) => {
      const state = task.isDone ? 'done' : 'undone';

      const list = document.createElement('li');
      list.classList.add('detail-card__task-list');
      list.textContent = task.task;

      list.setAttribute('state', state);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.isDone;

      list.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      });

      checkbox.addEventListener('change', () => {
        task.isDone = !task.isDone;
        const dataFromStorage = storageManagement
            .loadLocal(CONFIG.APP_LOCAL_STORAGE_KEY);

        const targetIndex = dataFromStorage.findIndex((data) => data.id === id);

        if (
          targetIndex !== undefined ||
          targetIndex !== null ||
          target !== -1
        ) {
          dataFromStorage[targetIndex] = data;
          storageManagement
              .saveLocal(CONFIG.APP_LOCAL_STORAGE_KEY, dataFromStorage);
        }

        const countDoneTasks = tasks.filter((task) => task.isDone).length;

        const setValueToProgress = countDoneTasks / tasks.length * 100;
        progressValue = setValueToProgress;

        _container.dispatchEvent(new Event(CONFIG.DATA_LIST_RENDER));
      });

      list.appendChild(checkbox);
      unorderedList.appendChild(list);
    });
  } else {
    const message = document.createElement('span');
    message.style = 'text-align: center;'.trim();
    message.textContent = '-- No Task --'.trim();

    unorderedList.appendChild(message);
  }

  const progress = circularProgress(progressValue, 80);

  detailsProgress.appendChild(progress);
  detailsRow.appendChild(detailsProgress);
  cardContainer.appendChild(detailsRow);
  cardContainer.appendChild(unorderedList);

  return cardContainer;
};

export default detail;
