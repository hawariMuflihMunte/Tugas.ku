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
      opacity: 0.85;
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

export default createCard;
