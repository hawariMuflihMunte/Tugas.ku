/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

Feature('Create New Task');
Before(({I}) => {
  I.amOnPage('/#/dashboard');
});

Scenario('Add a New Task', async ({I}) => {
  I.say('I am going to wait for Add New Task button to render, and then click it.');
  I.waitForElement('button[title="add task"]');
  I.click(locate('button[title="add task"]'));

  I.say('I am going to wait for Add New Task form to render');
  I.waitForElement('div.modal-content');

  I.say('I am going to input the Task Title');
  I.waitForElement(locate('input#title'));
  I.seeElement(locate('input#title'));
  I.clearField('input#title');
  I.fillField(locate('input#title'), 'Dummy Task Title');

  I.say('I am going to add a Sub-task');
  I.click(locate('button#add-task-item'));
  I.seeElement(locate('div#task-items'));
  I.fillField(locate('input[name=\'task\''), 'Dummy Sub-Task');

  I.say('I am going to input the Task Description');
  I.seeElement(locate('textarea#description'));
  I.fillField(locate('textarea#description'), `Dummy Task Description`.replace(/\s+/g, ' '));

  I.say('I am going to input the Task Due-date');
  I.fillField('#due-date', `14-06-2023`);

  I.say('I am going to add the new Task');
  I.pressKey('Enter');

  I.say('I expect to see a succesful message modal and then close it');
  I.waitForElement(locate('h2#swal2-title').withText('New Task Added!'));
  I.seeElement(locate('h2#swal2-title').withText('New Task Added!'));
  I.seeElement(locate('.swal2-confirm'));
  I.click(locate('.swal2-confirm'));

  I.say('I am going to close the Task Form');
  I.seeElement(locate('button[data-bs-dismiss=\'modal\']'));
  I.click(locate('button[data-bs-dismiss=\'modal\']'));
});

Feature('Render Recently Added Task');
Scenario('Read The Recently Added Task and Check it`s Data Validity', async ({I}) => {
  I.say('I expect to see a card element of the recently added task, and then click it');
  I.waitForElement('a.card-custom');
  I.seeElement('a.card-custom');
  I.click('a.card-custom');

  I.say('I expect to see the Task Detail card element');
  I.waitForElement('section#data-list');
  I.seeElement('section#data-list');

  I.say('I am going to check if the Task Title is valid');
  I.seeElement(locate('h3.detail__title').withText(`Dummy Task Title`.toUpperCase()));

  I.say('I am going to check if the Task Description is valid');
  I.seeElement(locate('p.detail__description').withText(`Dummy Task Description`));

  I.say('I am going to check if the Task Due Date is valid');
  I.seeElement(locate('p.detail__date').withText(`14 Juni 2023`));

  I.say('I am going to check if the Sub-Task is valid');
  I.seeElement(locate('li.detail__task-list').withText(`Dummy Sub-Task`));

  I.say('I am going to check if the Sub-Task completion status is valid');
  I.seeElement(locate('li.detail__task-list').withAttr({state: 'undone'}));

  I.say('I am going to check if the Task Progress is valid');
  I.seeElement(locate('span.progress__value').withText(`0%`));

  I.say('I am going to close the Task Detail card and get back to Dashboard page');
  I.seeElement('a[href="/#/dashboard"]');
  I.click('a[href="/#/dashboard"]');
});

Feature('Update Task');
Scenario('Update the Task data and progress', async ({I}) => {
  I.say('I expect to see a task card element, and then click it');
  I.waitForElement('a.card-custom');
  I.seeElement('a.card-custom');
  I.click('a.card-custom');

  I.say('I expect to see the Task Detail card element');
  I.waitForElement('section#data-list');
  I.seeElement('section#data-list');

  I.say('I am going to click Edit button');
  I.click('button#edit');

  I.say('I am going to update the Task Title');
  I.seeElement('input#title');
  I.clearField('input#title');
  I.fillField('input#title', 'Updated Dummy Task Title');

  const subTask = locate('input[type="text"]').inside('div.form-input-column');

  I.say('I am going to update the first Sub-Task');
  I.seeElement(subTask.first());
  I.clearField(subTask.first());
  I.fillField(subTask.first(), 'Updated Dummy Sub-Task');

  I.say('I am going to add a new Sub-Task');
  I.seeElement('#addItem');
  I.click('#addItem');
  I.seeElement(subTask.last());
  I.fillField(subTask.last(), 'New Dummy Sub-Task');

  I.say('I am going to update the Task Description');
  I.seeElement('textarea#description');
  I.clearField('textarea#description');
  I.fillField('textarea#description', 'Updated Dummy Task Description');

  I.say('I am going to update the Task Due Date');
  I.seeElement('input#date');
  I.clearField('input#date');
  I.fillField('input#date', '12-12-2042');

  I.say('I am going to click the Update button');
  I.seeElement(locate('button[type="submit"]').inside('form#edit-form'));
  I.click(locate('button[type="submit"]').inside('form#edit-form'));

  I.say('I expect to see a successful message modal, and then close it');
  I.waitForElement(locate('h2#swal2-title').withText('Task Updated!'));
  I.seeElement(locate('h2#swal2-title').withText('Task Updated!'));
  I.seeElement('button.swal2-confirm');
  I.click('button.swal2-confirm');

  I.say('I expect to see the Task Detail card element');
  I.waitForElement('section#data-list');
  I.seeElement('section#data-list');

  I.say('I am going to mark the first task as completed');
  I.seeElement(locate('li.detail__task-list'));
  I.click(locate('li.detail__task-list').first());

  I.say('I am going to close the Task Detail card and get back to Dashboard page');
  I.seeElement('a[href="/#/dashboard"]');
  I.click('a[href="/#/dashboard"]');
});

Feature('Render Recently Updated Task');
Scenario('Read The Recently Updated Task and Check it`s Data Validity', async ({I}) => {
  I.say('I expect to see a card element of the recently updated task, and then click it');
  I.waitForElement('a.card-custom');
  I.seeElement('a.card-custom');
  I.click('a.card-custom');

  I.say('I expect to see the Task Detail card element');
  I.waitForElement('section#data-list');
  I.seeElement('section#data-list');

  I.say('I am going to check if the Task Title is valid');
  I.seeElement(locate('h3.detail__title').withText(`Updated Dummy Task Title`.toUpperCase()));

  I.say('I am going to check if the Task Description is valid');
  I.seeElement(locate('p.detail__description').withText(`Updated Dummy Task Description`));

  I.say('I am going to check if the Task Due Date is valid');
  I.seeElement(locate('p.detail__date').withText(`12 Desember 2042`));

  const subTaskListElement = await locate('li.detail__task-list');

  I.say('I am going to check if all the Sub-Tasks are valid');
  I.seeElement(locate(subTaskListElement.first()).withText(`Dummy Sub-Task`));
  I.seeElement(locate(subTaskListElement.last()).withText(`New Dummy Sub-Task`));

  I.say('I am going to check if all the Sub-Tasks completion status are valid');
  I.seeElement(locate(subTaskListElement.first()).withAttr({state: 'done'}));
  I.seeElement(locate(subTaskListElement.last()).withAttr({state: 'undone'}));

  I.say('I am going to check if the Task Progress is valid');
  I.seeElement(locate('span.progress__value').withText(`50%`));

  I.say('I am going to close the Task Detail card and get back to Dashboard page');
  I.seeElement('a[href="/#/dashboard"]');
  I.click('a[href="/#/dashboard"]');
});

Feature('Delete Task');
Scenario('Delete the existing task', async ({I}) => {
  I.say('I expect to see the card element of a task, and then click it');
  I.waitForElement('a.card-custom');
  I.seeElement('a.card-custom');
  I.click('a.card-custom');

  I.say('I expect to see the Task Detail card element');
  I.waitForElement('section#data-list');
  I.seeElement('section#data-list');

  I.say('I am going to click the Delete button');
  I.seeElement('button#delete');
  I.click('button#delete');

  I.say('I am going to confirm to delete the Task');
  I.seeElement('button.swal2-confirm');
  I.click('button.swal2-confirm');

  I.say('I expect to see a successful message modal, and then close it');
  I.waitForElement(locate('h2#swal2-title').withText('Task Deleted!'));
  I.seeElement(locate('h2#swal2-title').withText('Task Deleted!'));
  I.seeElement('button.swal2-confirm');
  I.click('button.swal2-confirm');

  I.say('I expect to see an empty Task List on the dashboard page');
  I.dontSeeElement(locate('a.card-custom').inside('section#data-list'));
});
