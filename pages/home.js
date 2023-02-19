export default class HomePage{

    constructor(page){
        this.page = page;
        this.searchField = page.getByPlaceholder('Search Reddit');
        this.firstResultItem = page.locator("xpath=(//a[@role='link'])[1]");

    }


    /*
     * this function to search and select subreddit
     */
    async searchForSubreddit (subreddit){
        await this.searchField.fill(subreddit);
        await this.firstResultItem.click();
    }

}

