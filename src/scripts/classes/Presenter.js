import _ from 'lodash';

class Presenter {
  constructor({
    listContainer
  }) {
    this._listContainer = listContainer;

    // console.log('Presenter class init.');
  }

  setController(controller) {
    this.controller = controller;
  }

  dispatchEvent(element, eventName) {
    element.dispatchEvent(new Event(eventName));
  }

  renderList(data) {
    if (!(this._listContainer instanceof HTMLElement)) {
      console.log('listContainer is not a valid HTMLElement');
      return false;
    }

    if (!(data instanceof Array)) {
      console.log('data is not Array');
      return false;
    }

    // Clear element first before injecting data
    this._listContainer.innerHTML = '';

    data.forEach((item) => {
      const listItem = this.card(item, `/#/details/${item.id}`);

      this._listContainer.appendChild(listItem);
      return true;
    });
  }

  renderDetail(data) {
    if (!(this._listContainer instanceof HTMLElement)) {
      console.log('detailContainer is not a valid HTMLElement');
      return false;
    }

    if (!(data instanceof Object)) {
      console.log('data is not Object');
      return false;
    }

    // Clear element first before injecting data
    this._listContainer.innerHTML = '';

    const detail = this.detail(data);

    this._listContainer.appendChild(detail);
  }

  /**
   * Render list items inside container.
   * @param {Array} data
   * @param {HTMLElement} container
   * @param {Function} controllerHandler
   * @return {false|false|false|null|true}
   * - `controllerHandler` == (''|null|undefined)
   * - `data` != Array
   * - `container` != HTMLElement
   * - `data.length` === 0
   * - OK
   */
  renderListItems(data, container, controllerHandler) {
    if (!(data instanceof Array)) {
      console.log(`
        Data that is passed into
        \'renderListItems\' is not a valid Array
      `.trim());
      return false;
    }

    if (!(container instanceof HTMLElement)) {
      console.log('Container for \'renderListItems\' is not valid!');
      return false;
    }

    if (data.length === 0) {
      const message = document.createElement('p');
      message.style = 'text-align: center'.trim();
      message.textContent = '-- No Data --'.trim();

      container.appendChild(message);
      return null;
    }

    if (
      controllerHandler == '' ||
      controllerHandler == null ||
      controllerHandler == undefined
    ) {
      console.error('\'controllerHandler\' is not defined!');
      return false;
    }

    data.forEach((_data) => {
      const state = _data.isDone ? 'done' : 'undone';

      const list = document.createElement('li');
      list.classList.add('detail__task-list');
      list.textContent = _data.task;
      list.setAttribute('state', state);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = _data.isDone;

      checkbox.addEventListener('change', () => {
        _data.isDone = !task.isDone;
      });

      list.addEventListener('click', () => {
        checkbox.checked = true;
        this.dispatchEvent(checkbox, 'change');
      });

      list.appendChild(checkbox);
      container.appendChild(list);

      return true;
    });
  }

  /**
   * @param {Array} months
   * Set naming for month names,
   * - Pass array data, ex. Indonesian month
   * names:\
   * ['Januari', 'Februari', 'Maret']
   * and so on.
   * - Please note to add a zero string (`''`)
   * first to avoid wrong month names indexing.
   * - Remember to write complete month
   * names, it exists 12 names for each
   * month.
   * - The default value is in Indonesian.
   * @return {Array} Used for naming months.
   */
  customMonthNames(months = []) {
    if (months.length === 0) {
      return [
        '',
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ];
    }
    return months;
  };

  /**
   * @param {String} dateValue
   * Valid date string
   * - YYYY/MM/DD
   * @param {Array} monthNames
   * Set optional naming for month names,
   * if not set that default month name
   * will be used.
   * - Set array, ex. Indonesian month
   * names:\
   * ['Januari', 'Februari', 'Maret']
   * and so on.
   * - Remember to write complete month
   * names, it exists 12 names for each
   * month.
   * @return {String}
   * Returns consumable end-user date
   * string format.
   */
  convertDateIntoConsumableString(dateValue, monthNames = []) {
    const dateString = dateValue;
    const parts = dateString.split('-');
    const _day = parseInt(parts[0], 10);
    // Subtract 1 from the month value (months are zero-based)
    const _month = parseInt(parts[1], 10) - 1;
    const _year = parseInt(parts[2], 10);
    const _date = new Date(_year, _month, _day);

    const dateObj = new Date(_date.getTime());
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    if (monthNames.length === 0) {
      return `${day} ${monthIndex} ${year}`;
    }

    if (monthNames.length !== 0) {
      const _monthNames = monthNames;
      return `${day} ${_monthNames[monthIndex]} ${year}`;
    }
  };

  /**
   * @param {Number} value
   * - Limit value is 100
   * @param {Number} size
   * Set progress bar size
   * - Default size: `60px`
   * @param {Object} loaderOptions
   * A valid coloring string.\
   * If you want to customize this element,
   * You should pass all the required string
   * arguments in this object. If not, the
   * element will produce an error.
   * @param {string} loaderOptions.strokeColor
   * - Set stroke color
   * @param {string} loaderOptions.strokeLineColor
   * - Set stroke line color
   * @param {string} loaderOptions.centerColor
   * - Set circular center color
   * @param {string} loaderOptions.valueColor
   * - Set value color
   * @return {HTMLElement} progressBar
   */
  circularProgress(
      value,
      size = 60,
      loaderOptions = {
        strokeColor: 'blue',
        strokeLineColor: '#ededed',
        centerColor: 'white',
        valueColor: 'blue'
      }
  ) {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress__component');

    const style = document.createElement('style');

    style.textContent = `
      .progress__component {
        position: relative;
        min-height: 40px;
        height: ${size}px;
        min-width: 40px;
        width: ${size}px;
        border-radius: 50%;
        background: conic-gradient(
          ${loaderOptions.strokeColor} 3.6deg,
          ${loaderOptions.strokeLineColor} 0deg
        );
        display: flex;
        place-content: center;
        place-items: center;
        margin: 6px;
        transition: all linear 150ms
      }

      .progress__component::before {
        content: "";
        position: absolute;
        min-height: 30px;
        height: calc(${size}px - 10px);
        min-width: 30px;
        width: calc(${size}px - 10px);
        border-radius: 50%;
        background-color: ${loaderOptions.centerColor} !important;
      }

      .progress__component .progress__value {
        position: relative;
        font-weight: 500;
        font-size: 12px;
        color: ${loaderOptions.valueColor};
      }
    `.trim();

    progressBar.appendChild(style);

    const progressBarValue = document.createElement('span');
    progressBarValue.classList.add('progress__value');
    progressBar.appendChild(progressBarValue);

    // Set value limit to 100
    let _value = value;
    if (value >= 100) {
      _value = 100;
    }

    let incrementer = 0;
    const progressEndValue = _value + 1;
    const speed = 2;

    const progress = setInterval(() => {
      progressBarValue.textContent = `${incrementer}%`;
      progressBar.setAttribute('style', `
        background:
          conic-gradient(
            ${loaderOptions.strokeColor}
            ${incrementer * 3.6}deg,
            ${loaderOptions.strokeLineColor} 0deg
          );
      `.trim());

      if (incrementer >= _value) {
        clearInterval(progress);
      }

      if (_value >= progressEndValue) {
        clearInterval(progress);
      }

      incrementer++;
    }, speed);

    return progressBar;
  }

  /**
   * @param {Object} data
   * Pass object data.\
   * Data must contains:
   * `
   * {
   *    id: Number(id),
   *    createAt: Date("DD-MM-YYYY"),
   *    title: String(title),
   *    description: String(description),
   *    date: Date("DD-MM-YYYY"),
   *    tasks: Array(tasks)
   * }
   * `
   * @param {string} link
   * Specify the card link
   * @return {HTMLElement}
   */
  card(
      data,
      link = '#'
  ) {
    // Extract needed data from `data`
    const {
      // id,
      // createdAt,
      title,
      description,
      date,
      tasks
    } = data;

    const cardContainer = document.createElement('a');
    cardContainer.classList.add('card-custom');
    cardContainer.href = `${link}`.trim();

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
        width: 80%;
        color: inherit;
      }

      @media (max-width: 576px) {
        .card-custom__details {
          padding: 8px;
        }
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
    `.replace(/\s+/g, ' ');
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
    const _date = this.convertDateIntoConsumableString(
        date,
        this.customMonthNames()
    );

    _dueDate.textContent = _date;
    _dueDate.classList.add('card-custom__date');
    detailsData.appendChild(_dueDate);

    cardContainer.appendChild(detailsData);

    let progressValue;
    if (tasks.length === 0) {
      progressValue = tasks.length;
    }

    if (tasks.length !== 0) {
      // const countUndoneTasks = tasks.filter((task) => !task.isDone).length;
      const countDoneTasks = tasks.filter((task) => task.isDone).length;

      // console.log(countUndoneTasks);
      // console.log(countDoneTasks);

      const setValueToProgress = countDoneTasks / tasks.length * 100;
      progressValue = setValueToProgress;
    }

    const progress = this.circularProgress(progressValue);

    detailsProgress.appendChild(progress);
    cardContainer.appendChild(progress);

    return cardContainer;
  }

  detail(
      data
  ) {
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
    cardContainer.classList.add('detail');

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

      .detail {
        display: flex;
        border-radius: 4px;
        padding: 18px;
        background-color: white;
        flex-direction: column;

        box-shadow: 0 1px 12px rgba(126, 126, 126, 0.32);
        color: #777;
      }

      @media (max-width: 576px) {
        .detail {
          margin-bottom: 75px;
        }
      }

      .detail:focus,
      .detail:hover {
        opacity: 0.85;
      }

      .detail__details {
        min-width: 80%;
        color: inherit;
      }

      .detail__progress {
        display: flex;
        place-items: center;
        place-content: center;
        width: 100%;
        height: 100%;
      }

      .detail__title {
        font-weight: 500;
        margin-bottom: 7.5px;
      }

      .detail__description {
        font-size: 16px;
      }

      .detail__date {
        font-style: italic;
        color: #898989;
        font-size: 14px;
      }

      .detail__task-list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        color: inherit;
      }

      .detail__task-list-container > .detail__task-list {
        border-top: 2px solid #eee;
      }

      .detail__task-list {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        transition: 160ms ease;
        cursor: pointer;

        font-size: 14px;
        color: inherit;
      }

      .detail__task-list:focus,
      .detail__task-list:hover {
        opacity: 0.7;
        box-shadow: inset 0 2px 8px #ccc;
        color: #000;
      }

      .detail__options {
        display: flex;
        width: 100%;
        justify-content: stretch;
      }

      @media (max-width: 576px) {
        .detail__options {
          position: fixed;
          // flex-direction: row-reverse;
          width: 100%;
          bottom: 0;
          left: 0;

          box-shadow: 0 -1px 6px rgba(126, 126, 126, 0.32);
        }
      }

      .detail__options button {
        flex-grow: 1;
        transition: all 200ms ease;
      }

      .detail__options #edit {
        background-color: #eeee9b;
        color: #444;
      }

      .detail__options #edit:hover {
        background-color: #ffd900;
        color: #000;
      }

      .detail__options #delete {
        background-color: #f47174;
        color: #fff;
      }

      .detail__options #delete:hover {
        background-color: #e6143c;
      }

      .detail__options-modal::backdrop {
        background-color: rgba(0, 0, 0, 0.75);
      }

      .detail__options-modal {
        border-radius: 8px;
        padding: 0;
        width: 100%;
        border: 0;
        color: inherit;
      }

      .detail__options-modal hr {
        margin: 0;
        padding: 0;
      }

      .detail__options-modal > div {
        width: 100%;
        height: 100%;
      }

      @media (min-width: 577px) {
        .detail__options-modal {
          width: 75%
        }
      }

      @media (min-width: 769px) {
        .detail__options-modal {
          width: 42.5%
        }
      }

      .detail__modal-header,
      .detail__modal-form,
      .detail__modal-footer {
        padding: 18px;
        color: inherit;
      }

      .detail__modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .detail__modal-header > h1,
      .detail__modal-header > h2,
      .detail__modal-header > h3,
      .detail__modal-header > h4,
      .detail__modal-header > h5,
      .detail__modal-header > h6 {
        margin: 0;
        padding: 0;
        font-size: 22px;
      }

      .detail__modal-header > button {
        background-color: transparent;
        min-width: 25px;
        width: 30px;
        min-height: 25px;
        height: 100%;
      }

      .detail__modal-form > form {
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      .detail__modal-form input,
      .detail__modal-form textarea {
        border: 1px solid #b9b9b9;
        border-radius: 1px;
        padding: 7.25px;
      }

      .detail__modal-form .form-input {
        display: flex;
        width: 100%;
        margin: 9px 0;
      }

      .detail__modal-form .form-input-column {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 9px 0;
        gap: 7.325px;
      }

      .detail__modal-form .form-input input,
      .detail__modal-form .form-input textarea,
      .detail__modal-form .form-input button {
        flex-grow: 1;
      }

      .detail__modal-form .form-input button#addItem {
        background-color: #eeee9b;
        color: #444;
      }

      .detail__modal-form .form-input button#addItem:hover {
        background-color: #ffd900;
        color: #000;
      }

      .detail__modal-form .form-input button#removeItem {
        background-color: #f47174;
        color: #fff;
      }

      .detail__modal-form .form-input button#removeItem:hover {
        background-color: #e6143c;
      }
    `.replace(/\s+/g, ' ');
    cardContainer.appendChild(style);

    const detailsRow = document.createElement('div');
    detailsRow.classList.add('detail-row');

    const detailsData = document.createElement('div');
    detailsData.classList.add('detail__details');

    const detailsProgress = document.createElement('div');
    detailsProgress.classList.add('detail__progress');

    const _title = document.createElement('h3');
    _title.textContent = title.toUpperCase();
    _title.classList.add('detail__title');
    detailsData.appendChild(_title);

    const _description = document.createElement('p');
    _description.textContent = description;
    _description.classList.add('detail__description');
    detailsData.appendChild(_description);

    const _dueDate = document.createElement('p');
    const _date = this.convertDateIntoConsumableString(
        date,
        this.customMonthNames()
    );

    _dueDate.textContent = _date;
    _dueDate.classList.add('detail__date');
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
    unorderedList.classList.add('detail__task-list-container');

    if (tasks.length !== 0) {
      tasks.forEach((task) => {
        const state = task.isDone ? 'done' : 'undone';

        const list = document.createElement('li');
        list.classList.add('detail__task-list');
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

          // Pass data to the controller
          if (this.controller) {
            // this.controller.addData(objectize);
            this.controller.updateData(id, data);
          } else {
            console.warn('Please set the controller first to pass the data.');
          }

          const countDoneTasks = tasks.filter((task) => task.isDone).length;

          const setValueToProgress = countDoneTasks / tasks.length * 100;
          progressValue = setValueToProgress;
        });

        list.appendChild(checkbox);
        unorderedList.appendChild(list);
      });
    } else {
      const list = document.createElement('li');
      list.classList.add('detail__task-list');
      list.style = 'place-content: center;';
      list.textContent = '-- No Task --';

      unorderedList.appendChild(list);
    }

    const progress = this.circularProgress(progressValue, 80);

    detailsProgress.appendChild(progress);
    detailsRow.appendChild(detailsProgress);

    cardContainer.appendChild(detailsRow);
    cardContainer.appendChild(unorderedList);

    const taskOptions = document.createElement('div');
    taskOptions.classList.add('detail__options');

    const taskOptionsModal = document.createElement('dialog');
    taskOptionsModal.classList.add('detail__options-modal');

    const splitDateParts = date.split('-');
    const year = splitDateParts[2];
    const month = splitDateParts[1] - 1;
    const day = splitDateParts[0];
    const dateObject = new Date(Date.UTC(year, month, day));
    const convertedDate = dateObject.toISOString().split('T')[0];

    const taskOptionsModalBody = document.createElement('section');
    const taskOptionsModalHeaderContainer = document.createElement('section');
    taskOptionsModalHeaderContainer.classList.add('detail__modal-header');

    const taskOptionsModalHeader = document.createElement('h2');
    taskOptionsModalHeader.textContent = 'Edit Task';
    taskOptionsModalHeaderContainer.appendChild(taskOptionsModalHeader);

    const btnCloseModal = document.createElement('button');
    btnCloseModal.type = 'button';
    btnCloseModal.textContent = '❌';
    taskOptionsModalHeaderContainer.appendChild(btnCloseModal);

    btnCloseModal.addEventListener('click', () => {
      taskOptionsModal.close();
      titleInput.value = title;
      descriptionInput.value = description;
      dateInput.value = convertedDate;
    });

    taskOptionsModalBody.appendChild(taskOptionsModalHeaderContainer);

    const dividerLine = document.createElement('hr');
    taskOptionsModalBody.appendChild(dividerLine);

    const taskOptionsModalFormContainer = document.createElement('section');
    taskOptionsModalFormContainer.classList.add('detail__modal-form');

    const taskOptionsModalForm = document.createElement('form');
    taskOptionsModalForm.id = 'edit-form';
    taskOptionsModalForm.action = 'post';

    const titleInputContainer = document.createElement('div');
    titleInputContainer.classList.add('form-input');
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.id = 'title';
    titleInput.placeholder = 'Title';
    titleInput.value = title;
    titleInputContainer.appendChild(titleInput);
    taskOptionsModalForm.appendChild(titleInputContainer);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('form-input');

    const btnAddInput = document.createElement('button');
    btnAddInput.textContent = '+ Add';
    btnAddInput.type = 'button';
    btnAddInput.id = 'addItem';
    const btnRemoveInput = document.createElement('button');
    btnRemoveInput.textContent = '- Remove';
    btnRemoveInput.type = 'button';
    btnRemoveInput.id = 'removeItem';

    btnContainer.appendChild(btnAddInput);
    btnContainer.appendChild(btnRemoveInput);
    taskOptionsModalForm.appendChild(btnContainer);

    const inputsContainer = document.createElement('div');
    inputsContainer.classList.add('form-input-column');
    taskOptionsModalForm.appendChild(inputsContainer);

    btnAddInput.addEventListener('click', () => {
      if (inputsContainer.childElementCount >= 5) {
        alert(`
          Maximum item limit reached: ${inputsContainer.childElementCount}
          items.
        `.replace(/\s+/g, ' ')); // Removes spaces

        return false;
      }

      if (inputsContainer.childElementCount < 5) {
        const newInputElement = document.createElement('input');
        newInputElement.type = 'text';

        inputsContainer.appendChild(newInputElement);
      }
    });

    btnRemoveInput.addEventListener('click', () => {
      if (inputsContainer.children.length > 0) {
        inputsContainer.removeChild(inputsContainer.lastElementChild);
      }
    });

    const descriptionInputContainer = document.createElement('div');
    descriptionInputContainer.classList.add('form-input');
    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Description';
    descriptionInput.value = description;
    descriptionInputContainer.appendChild(descriptionInput);
    taskOptionsModalForm.appendChild(descriptionInputContainer);

    const dateInputContainer = document.createElement('div');
    dateInputContainer.classList.add('form-input');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.id = 'date';
    dateInput.value = convertedDate;
    dateInputContainer.appendChild(dateInput);
    taskOptionsModalForm.appendChild(dateInputContainer);

    const dividerLineFooter = dividerLine.cloneNode();
    taskOptionsModalForm.appendChild(dividerLineFooter);

    const btnSubmitUpdate = document.createElement('button');
    btnSubmitUpdate.type = 'submit';
    btnSubmitUpdate.textContent = 'Edit ✍';

    taskOptionsModalForm.appendChild(btnSubmitUpdate);
    taskOptionsModalFormContainer.appendChild(taskOptionsModalForm);
    taskOptionsModalBody.appendChild(taskOptionsModalFormContainer);
    taskOptionsModalBody.appendChild(taskOptionsModalFormContainer);

    taskOptionsModal.appendChild(taskOptionsModalBody);
    cardContainer.appendChild(taskOptionsModal);

    const btnEditTask = document.createElement('button');
    btnEditTask.id = 'edit';
    btnEditTask.textContent = 'Edit ✍';
    taskOptions.appendChild(btnEditTask);

    btnEditTask.addEventListener('click', () => {
      inputsContainer.innerHTML = '';
      if (tasks.length !== 0) {
        const filterByTask = tasks.map((value) => value.task);
        // Debugging purpose-only
        // console.log(filterByTask);

        filterByTask.forEach((data) => {
          const inputElement = document.createElement('input');
          inputElement.type = 'text';
          inputElement.value = data;

          inputsContainer.appendChild(inputElement);
        });
      }

      taskOptionsModal.showModal();
    });

    window.addEventListener('click', (event) => {
      if (event.target === taskOptionsModal) {
        titleInput.value = title;
        descriptionInput.value = description;
        dateInput.value = convertedDate;

        taskOptionsModal.close();
      }
      // Debugging purpose-only
      // console.log(event.target);
    });

    const btnDeleteTask = document.createElement('button');
    btnDeleteTask.id = 'delete';
    btnDeleteTask.textContent = 'Delete 💢';
    taskOptions.appendChild(btnDeleteTask);

    btnDeleteTask.addEventListener('click', () => {
      if (confirm('Delete?')) {
        alert('Deleted!');
      } else {
        alert('Cancelled');
      }
    });

    taskOptionsModalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const currentData = tasks;
      const getInputsValue = Array.from(inputsContainer.childNodes);
      const inputsValue = getInputsValue.map((input) => input.value)
          .filter((value) => value !== '')
          .map((value) => ({
            task: value,
            isDone: false
          }));

      const mergeData = [...currentData, ...inputsValue];
      const filterData = _.uniqBy(mergeData, 'task');

      // Debugging purpose-only
      // console.log(filterData);

      const objectize = {
        id: id,
        createdAt: createdAt,
        title: titleInput.value,
        description: descriptionInput.value,
        date: new Date(dateInput.value)
            .toLocaleDateString('en-GB').split('/').join('-'),
        // The result is taken from merging previous data and newly
        // added data in the edit session.
        tasks: filterData
      };

      // Debugging purpose-only
      // console.log(objectize);

      // Pass data to the controller
      if (this.controller) {
        taskOptionsModalForm.reset(); // Clear form
        this.controller.updateData(id, objectize);
      } else {
        console.warn('Please set the controller first to pass the data.');
      }
    });

    cardContainer.appendChild(taskOptions);

    return cardContainer;
  };

  /**
   * Handles add data form.
   * @param {HTMLFormElement} form
   * @param {HTMLInputElement} title
   * @param {HTMLTextAreaElement} description
   * @param {HTMLInputElement} date
   * @param {HTMLDivElement} inputsContainer
   * @param {string} multipleInputsQuery
   * Input query for input element(s).
   * - To make it easier for you to catch the elements.\
   * You can apply that/those input(s) by using the same
   * `name` attribute value. Example:\
   * "input[name="yourApplyHere"]".
   * @param {HTMLButtonElement} btnAddInput
   * @param {HTMLButtonElement} btnRemoveInput
   * @return {false}
   * If element that being passed is not a valid
   * HTMLElement, then return `false`.
   */
  formAddData({
    form,
    title,
    description,
    date,
    inputsContainer,
    multipleInputsQuery,
    btnAddInput,
    btnRemoveInput,
    inputClassName = ''
  }) {
    if (!(form instanceof HTMLFormElement)) {
      console.error('Not valid HTMLFormElement is being passed!');
      return false;
    }

    if (!(title instanceof HTMLInputElement)) {
      console.error('Not valid HTMLInputElement is being passed!');
      return false;
    }

    if (description != '' && !(description instanceof HTMLTextAreaElement)) {
      console.error('Not valid HTMLTextAreaElement is being passed!');
      return false;
    }

    if (!(date instanceof HTMLInputElement)) {
      console.error('Not valid HTMLInputElement is being passed!');
      return false;
    }

    if (!(inputsContainer instanceof HTMLDivElement)) {
      console.error('Not valid HTMLDivElement is being passed!');
      return false;
    }

    if (multipleInputsQuery == '') {
      console.log('No query passed as argument!');
      return false;
    }

    if (typeof multipleInputsQuery !== 'string') {
      console.error('Not valid String value is being passed!');
      return false;
    }

    const _form = form;
    const _title = title;
    const _description = description;
    const _date = date;
    const _inputsContainer = inputsContainer;
    const _query = multipleInputsQuery;
    const _btnAddInput = btnAddInput;
    const _btnRemoveInput = btnRemoveInput;

    _title.required = true;
    _date.required = true;

    _btnAddInput.addEventListener('click', () => {
      if (_inputsContainer.childElementCount >= 5) {
        alert(`
          Maximum item limit reached: ${_inputsContainer.childElementCount}
          items.
        `.replace(/\s+/g, ' ')); // Removes spaces

        return false;
      }

      if (_inputsContainer.childElementCount < 5) {
        const newInputElement = document.createElement('input');
        newInputElement.type = 'text';

        const string = _query;
        const start = string.indexOf('\'') + 1;
        const end = string.lastIndexOf('\'');
        const value = string.substring(start, end);
        newInputElement.name = value;

        if (inputClassName !== '') {
          newInputElement.setAttribute('class', inputClassName.toString());
        }

        _inputsContainer.appendChild(newInputElement);
      }
    });

    _btnRemoveInput.addEventListener('click', () => {
      if (_inputsContainer.children.length > 0) {
        _inputsContainer.removeChild(_inputsContainer.lastElementChild);
      }
    });

    _form.addEventListener('submit', (event) => {
      event.preventDefault();

      const _titleValue = _title.value;
      const _descriptionValue = _description.value;
      const _dateValue = _date.value;
      const _inputs = Array.from(document.querySelectorAll(_query));
      const _inputsValue = _inputs.map((input) => input.value)
          .filter((value) => value !== '')
          .map((value) => ({
            task: value,
            isDone: false
          }));

      /**
       * Return random number between 1 - 99999
       * @return {Number}
       */
      const generateId = () => {
        const minId = 1;
        const maxId = 99999;
        const combineMinMax = Math.floor(
            Math.random() * (maxId - minId + 1) + minId
        );
        const timeStamp = Number(new Date());
        const id = Number(combineMinMax + timeStamp);

        return Number(id);
      };

      const objectize = {
        id: generateId(),
        // createdAt: DD-MM-YYYY
        createdAt: new Date()
            .toLocaleDateString('en-GB').split('/').join('-'),
        title: _titleValue,
        description: _descriptionValue,
        // date: DD-MM-YYYY
        date: new Date(_dateValue)
            .toLocaleDateString('en-GB').split('/').join('-'),
        tasks: _inputsValue
      };

      // Debugging purpose-only
      // console.log(objectize);

      // Pass data to the controller
      if (this.controller) {
        _form.reset(); // Clear form
        this.controller.addData(objectize);
      } else {
        console.warn('Please set the controller first to pass the data.');
      }
    });
  }
};

export default Presenter;
