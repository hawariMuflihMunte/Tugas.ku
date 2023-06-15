/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
Feature('Opening SplashScreen Page');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Check if Jumbotron and Benefit Section has been succesfully rendered', async ({ I }) => {
  I.say('I expect to see the Jumbotron element');
  I.waitForElement('div#jumbotron');
  I.seeElement('div#jumbotron');

  I.say('I expect to see the Benefit Section');
  I.waitForElement('section#benefit');
  I.seeElement('section#benefit');
});


