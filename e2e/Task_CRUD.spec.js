/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const assert = require('assert');

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
  const taskTitle = await I.grabTextFrom('h3.detail__title');
  assert.equal(taskTitle, `Dummy Task Title`.toUpperCase());

  I.say('I am going to check if the Task Description is valid');
  const taskDescription = await I.grabTextFrom('p.detail__description');
  assert.equal(taskDescription, `Dummy Task Description`);

  I.say('I am going to check if the Task Due Date is valid');
  const taskDueDate = await I.grabTextFrom('p.detail__date');
  assert.equal(taskDueDate, `14 Juni 2023`);

  I.say('I am going to check if the Sub-Task is valid');
  const subTask = await I.grabTextFrom('li.detail__task-list');
  assert.equal(subTask, `Dummy Sub-Task`);

  I.say('I am going to check if the Sub-Task completion status is valid');
  const subTaskState = await I.grabAttributeFrom('li.detail__task-list', 'state');
  assert.equal(subTaskState, 'undone');

  I.say('I am going to check if the Task Progress is valid');
  const taskProgress = await I.grabTextFrom('span.progress__value');
  assert.equal(taskProgress, `0%`);

  I.say('I am going to close the Task Detail card and get back to Dashboard page');
  I.seeElement('a[href="/#/dashboard"]');
  I.click('a[href="/#/dashboard"]');
});

Feature('Update Existing Task');
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

  I.say('I am going to add a new Sub-Task');
  I.seeElement('#addItem');
  I.click('#addItem');
  const newSubTask = locate('input[type="text"]')
    .inside('div.form-input-column')
    .last();
  I.seeElement(newSubTask);
  I.fillField(newSubTask, 'New Dummy Sub-Task');

  I.say('I am going to update the Task Description');
  I.seeElement('textarea#description');
  I.clearField('textarea#description');
  I.fillField('textarea#description', 'Updated Dummy Task Description');

  I.say('I am going to update the Task Due Date');
  I.seeElement('input#date');
  I.clearField('input#date');
  I.fillField('input#date', '12-11-2042');

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
    const taskTitle = await I.grabTextFrom('h3.detail__title');
    assert.equal(taskTitle, `Updated Dummy Task Title`.toUpperCase());

    I.say('I am going to check if the Task Description is valid');
    const taskDescription = await I.grabTextFrom('p.detail__description');
    assert.equal(taskDescription, `Updated Dummy Task Description`);

    I.say('I am going to check if the Task Due Date is valid');
    const taskDueDate = await I.grabTextFrom('p.detail__date');
    assert.equal(taskDueDate, `12 November 2042`);

    const subTaskListElement = await locate('li.detail__task-list');

    I.say('I am going to check if all the Sub-Tasks are valid');
    const subTask = await I.grabTextFrom(subTaskListElement.first());
    assert.equal(subTask, `Dummy Sub-Task`);
    const newSubTask = await I.grabTextFrom(subTaskListElement.last());
    assert.equal(newSubTask, `New Dummy Sub-Task`);

    I.say('I am going to check if all the Sub-Tasks completion status are valid');
    const subTaskState = await I.grabAttributeFrom(subTaskListElement.first(), 'state');
    assert.equal(subTaskState, 'done');
    const newSubTaskState = await I.grabAttributeFrom(subTaskListElement.last(), 'state');
    assert.equal(newSubTaskState, 'undone');

    I.say('I am going to check if the Task Progress is valid');
    const taskProgress = await I.grabTextFrom('span.progress__value');
    assert.equal(taskProgress, `50%`);

    I.say('I am going to close the Task Detail card and get back to Dashboard page');
    I.seeElement('a[href="/#/dashboard"]');
    I.click('a[href="/#/dashboard"]');
  }
);

Feature('Delete Existing Task');
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
  pause();
});
