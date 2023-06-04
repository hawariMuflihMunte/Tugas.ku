/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
Feature('add task');

Before(({I}) => {
  I.amOnPage('/#/dashboard');
});

Scenario('Showing empty task in dashboard', async ({I}) => {
  pause();
  I.click(locate('.btn.btn-warning[title="add task"]'));
  I.fillField('#title', 'taskTitle');
  I.click(locate('.btn.btn-outline-warning'));
  I.fillField('.form-control.mb-2', 'subtask');
  I.fillField('#description', 'Description');

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dueDate = `${day}-${month}-${year}`;

  I.fillField('#due-date', dueDate);
  I.pressKey('Enter');

  I.see('TASKTITLE');
});
