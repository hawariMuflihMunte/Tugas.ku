/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
Feature('Add task');

Before(({I}) => {
  I.amOnPage('/#/dashboard');
});

Scenario('Showing empty task in dashboard', async ({I}) => {
  // pause();
  I.wait(3);
  I.click(locate('button[title="add task"]'));

  I.wait(3);
  I.fillField('#title', 'Task Title');
  I.click(locate('button#add-task-item'));
  I.seeElement(locate('div#task-items'));
  I.fillField(locate('input[name=\'task\''), 'subtask');
  I.seeElement(locate('textarea#description'));
  I.fillField(locate('textarea#description'), `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Ipsam, possimus? Doloribus aspernatur,
    id explicabo eius nulla corporis qui labore sequi.
  `.replace(/\s+/g, ' '));


  I.wait(3);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dueDate = `${day}-${month}-${year}`;

  I.fillField('#due-date', dueDate);
  I.pressKey('Enter');

  I.seeElement(locate('.swal2-confirm'));
  I.click(locate('.swal2-confirm'));

  I.wait(1);
  I.seeElement(locate('button[data-bs-dismiss=\'modal\']'));
  I.click(locate('button[data-bs-dismiss=\'modal\']'));

  // I.wait(2);
  // I.see('Task Title', 'h3.card-custom__title');
});
