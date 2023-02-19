/**
 * Note: This implementation is following page object model design pattern to increase code maintanbility and resuability 
 * and this is done by capturing selectors and test steps in page classes.
 */

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
 
 