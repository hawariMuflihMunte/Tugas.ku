import convertDate from './convertDate';
import customMonthNames from './customMonthNames';
import circularProgress from './circularProgress';

/**
 * @param {Object} data Pass object data
 * @param {string} cardLink
 * Specify the card link
 * - id
 * @return {HTMLElement}
 */
const createCard = (
    data,
    cardLink = '#'
) => {
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
    // eslint-disable-next-line no-unused-vars
    id,
    // eslint-disable-next-line no-unused-vars
    createdAt,
    title,
    description,
    date,
    // eslint-disable-next-line no-unused-vars
    tasks
  } = data;

  const cardContainer = document.createElement('a');
  cardContainer.classList.add('card-custom');
  cardContainer.href = `${cardLink}`;

  const style = document.createElement('style');
  style.textContent = `
    a {
      text-decoration: none;
    }

    .card-custom {
      display: flex;
      justify-content: space-between;
      border-radius: 4px;
      padding: 6px;
      background-color: white;

      flex-direction: row;
      box-shadow: 0 1px 12px rgba(126, 126, 126, 0.32);
      cursor: pointer;
      width: 100%;
      color: #777;
    }

    .card-custom:focus,
    .card-custom:hover {
      opacity: 0.85;
    }

    .card-custom__details {
      padding-top: 12px;
      min-width: 80%;
      color: inherit;
    }

    .card-custom:focus > .card-custom__details,
    .card-custom:hover > .card-custom__details {
      color: #666;
    }

    .card-custom__progress {
      display: flex;
      place-items: center;
      place-content: center;
      width: 100%;
      height: 100%;
    }

    .card-custom__title {
      font-weight: 500;
      margin-bottom: 7.5px;
    }

    .card-custom__description {
      font-size: 16px;
    }

    .card-custom__date {
      font-style: italic;
      color: #898989;
      font-size: 14px;
    }
  `.trim();
  cardContainer.appendChild(style);

  const detailsData = document.createElement('div');
  detailsData.classList.add('card-custom__details');

  const detailsProgress = document.createElement('div');
  detailsProgress.classList.add('card-custom__progress');

  const _title = document.createElement('h3');
  _title.textContent = title.toUpperCase();
  _title.classList.add('card-custom__title');
  detailsData.appendChild(_title);

  const _description = document.createElement('p');
  _description.textContent = description;
  _description.classList.add('card-custom__description');
  detailsData.appendChild(_description);

  const _dueDate = document.createElement('p');
  const _date = convertDate(date, customMonthNames());

  _dueDate.textContent = _date;
  _dueDate.classList.add('card-custom__date');
  detailsData.appendChild(_dueDate);

  cardContainer.appendChild(detailsData);

  let progressValue;
  if (tasks.length === 0) {
    progressValue = tasks.length;
  }

  if (tasks.length !== 0) {
    const countUndoneTasks = tasks.filter((task) => !task.isDone).length;
    const countDoneTasks = tasks.filter((task) => task.isDone).length;

    console.log(countUndoneTasks);
    console.log(countDoneTasks);

    const setValueToProgress = countDoneTasks / tasks.length * 100;
    progressValue = setValueToProgress;
  }

  const progress = circularProgress(progressValue, 75);

  detailsProgress.appendChild(progress);
  cardContainer.appendChild(progress);

  return cardContainer;
};

export default createCard;
