/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
Feature('Create, Read, Update and Delete a Task');

Before(({I}) => {
  I.amOnPage('/#/dashboard');
});

Scenario('Add a New Task', async ({I}) => {
  /**
   * Add a New Task
   */
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

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dueDate = `${day}-${month}-${year}`;

  I.say('I am going to input the Task Due-date');
  I.fillField('#due-date', dueDate);

  I.say('I am going to add the new Task');
  I.pressKey('Enter');

  I.say('I expect to see a succesful message modal and then close it');
  I.seeElement(locate('.swal2-confirm'));
  I.click(locate('.swal2-confirm'));

  I.say('I am going to close the Task Form');
  I.seeElement(locate('button[data-bs-dismiss=\'modal\']'));
  I.click(locate('button[data-bs-dismiss=\'modal\']'));
});

Scenario('Read The Recently Added Task and Check it\'s Data Validity', async ({I}) => {
  I.say('I expect to see a card of the recently added task');
  I.waitForElement('a.card-custom');
  I.seeElement('a.card-custom');
});

