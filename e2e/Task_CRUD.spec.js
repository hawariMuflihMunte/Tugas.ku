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
  I.seeElement(locate('input#title'));
  I.clearField('input#title');
  I.fillField(locate('input#title'), 'Task Title Testing');

  I.say('I am going to add a Sub-task');
  I.click(locate('button#add-task-item'));
  I.seeElement(locate('div#task-items'));
  I.fillField(locate('input[name=\'task\''), 'Sub-Task Testing');

  I.say('I am going to input the Task Description');
  I.seeElement(locate('textarea#description'));
  I.fillField(locate('textarea#description'), `Task Description Testing`.replace(/\s+/g, ' '));

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
  assert.equal(taskTitle, `Task Title Testing`.toUpperCase());

  I.say('I am going to check if the Task Description is valid');
  const taskDescription = await I.grabTextFrom('p.detail__description');
  assert.equal(taskDescription, `Task Description Testing`);

  I.say('I am going to check if the Task Due Date is valid');
  const taskDueDate = await I.grabTextFrom('p.detail__date');
  assert.equal(taskDueDate, `14 Juni 2023`);

  I.say('I am going to check if the Sub-Task is valid');
  const subTask = await I.grabTextFrom('li.detail__task-list');
  assert.equal(subTask, `Sub-Task Testing`);

  I.say('I am going to check if the Sub-Task state is valid');
  const subTaskState = await I.grabAttributeFrom('li.detail__task-list', 'state');
  assert.equal(subTaskState, 'undone');

  I.say('I am going to check if the Task Progress is valid');
  const taskProgress = await I.grabTextFrom('span.progress__value');
  assert.equal(taskProgress, `0%`);
});

