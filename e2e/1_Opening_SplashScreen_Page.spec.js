/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
Feature('Opening SplashScreen Page');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Showing Jumbotron', async ({ I }) => {
  I.wait(2);
  I.seeElement(locate('div#jumbotron'));
});


