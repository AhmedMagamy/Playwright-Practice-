    /*
     */
export default class SubredditPage{




    constructor(page){
        this.page = page;
        this.joinBtn=page.locator("xpath=(//button[@role='button'])[2]");
        this.createPostField =page.getByPlaceholder('Create Post');
        this.titleField =page.getByPlaceholder('Title');
        this.descreptionField =page.getByRole('textbox').nth(2);
        this.saveDraftBtn=page.getByRole('button', { name: 'Save Draft' });
        this.draftsBtn=page.locator("xpath=//button[text()='Drafts']");
        this.savedBtn = page.locator("xpath=//button[normalize-space()='Update draft']").first();

    }

    async joinSubreddit (){
        await this.joinBtn.click();
       
    }


    /*
     * this function to create the post and adding it to the draft 
     */
    async careatDraftPost (title,descreption){
        await this.createPostField.click();
        await this.titleField.click();
        await this.titleField.fill(title);
        await this.descreptionField.click(); 
        await this.descreptionField.fill(descreption); 
        await this.saveDraftBtn.click();
        // to make sure the post is saved scussfully
        await this.savedBtn.waitFor({state : 'visible'});
    }
    /*
     * this function to open the list of drafts 
     */
    async openDrafts (){
        await this.draftsBtn.click();
   
    }




}

