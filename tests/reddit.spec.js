const { test, expect } = require('@playwright/test');
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import SubredditPage from '../pages/subreddit';


/**
 * Using this hook to execute any sahred step before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto('https://reddit.com/login');
});



test('Workflow 1: Subscribe to a subreddit', async ({ page }) => {
  /*
      setup
    */
  const Login = new LoginPage(page);
  const Home = new HomePage(page);
  const Subreddit = new SubredditPage(page);
  /*
  Prepaing test data 
  */
  const userName = 'Adorable_Dot_2014';
  const password = 'agamiqa123';
  const subreddit = 'test automation';
  /*
  test steps 
  */
  await Login.login(userName, password);
  await Home.searchForSubreddit(subreddit);
  await Subreddit.joinSubreddit();

  /*
  assertion : verifying that the post header matches the search keyword 
  */
  const subredditHeader = await page.locator("//h1[contains(text(),'" + subreddit + "')]");
  await expect(subredditHeader.first()).toBeVisible();

});




test('Workflow 2: Create and save a draft post', async ({ page }) => {
  /*
    setup
  */
  const Login = new LoginPage(page);
  const Home = new HomePage(page);
  const Subreddit = new SubredditPage(page);
  /*
  Prepaing test data 
  */
  const userName = 'Adorable_Dot_2014';
  const password = 'agamiqa123';
  const subreddit = 'test automation';
  // here using timestamp to generate unique post title each execution
  const title = 'Automated Post' + Date.now();
  const descreption = 'This post is automated';

  /*
  test steps 
  */

  await Login.login(userName, password);
  await Home.searchForSubreddit(subreddit);
  await Subreddit.joinSubreddit();
  await Subreddit.careatDraftPost(title, descreption);
  await Subreddit.openDrafts();

  /*
  assertion : verifying a post with the same title is displayed in the list of drafts 
  */
  const createdPost = await page.locator("//h2[contains(text(),'" + title + "')]");
  await expect(createdPost.first()).toBeVisible();

});


/*
test('basic test', async ({ page }) => {
  await page.goto('https://reddit.com');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.frameLocator('xpath=(//iframe)[2]').getByPlaceholder('\n        Username\n      ').click();
  await page.frameLocator('xpath=(//iframe)[2]').getByPlaceholder('\n        Username\n      ').fill('Adorable_Dot_2014');
  await page.frameLocator('xpath=(//iframe)[2]').getByPlaceholder('\n        Password\n      ').click();
  await page.frameLocator('xpath=(//iframe)[2]').getByPlaceholder('\n        Password\n      ').fill('agamiqa123');
  await page.frameLocator('xpath=(//iframe)[2]').getByRole('button', { name: 'Log In' }).click();
  await page.frameLocator('xpath=(//iframe)[2]').getByRole('button', { name: 'Log In' }).waitFor({state:'hidden'});
  await page.getByPlaceholder('Search Reddit').fill('test automation');
  await page.locator("xpath=(//a[@role='link'])[1]").click();
  await page.locator("xpath=(//button[@role='button'])[2]").click();
  await page.getByPlaceholder('Create Post').click();
  await page.waitForURL('https://www.reddit.com/r/testautomation/submit');
  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('this is my post of 1st time ');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Hello this is test content');
  await page.getByRole('button', { name: 'Save Draft' }).click();
  //await page.getByPlaceholder('what the heck').fill('secrets of test automation');

});


/*

test('basic test here ', async ({ page }) => {
  await page.goto('https://reddit.com');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByPlaceholder('\n        Username\n      ').click();
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByPlaceholder('\n        Username\n      ').fill('Adorable_Dot_2014');
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByPlaceholder('\n        Password\n      ').click();
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByPlaceholder('\n        Password\n      ').fill('agamiqa123');
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByRole('button', { name: 'Log In' }).click();
  await page.frameLocator('#SHORTCUT_FOCUSABLE_DIV iframe').getByRole('button', { name: 'Log In' }).waitFor({state:'hidden'});
  await page.getByPlaceholder('Search Reddit').fill('test automation');
  await page.locator("xpath=(//a[@role='link'])[1]").click();
  await page.locator("xpath=(//button[@role='button'])[2]").click();
  await page.getByPlaceholder('Create Post').click();
  await page.waitForURL('https://www.reddit.com/r/testautomation/submit');
  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('this is my post of 1st time ');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Hello this is test content');
  await page.getByRole('button', { name: 'Save Draft' }).click();
  //await page.getByPlaceholder('what the heck').fill('secrets of test automation');

});
*/