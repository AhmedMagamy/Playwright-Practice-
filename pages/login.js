export default class LoginPage{

    constructor(page){
        this.page = page;
        this.userNameField = page.getByPlaceholder('\n        Username\n      ');
        this.passwordField = page.getByPlaceholder('\n        Password\n      ');
        this.loginBtn=page.getByRole('button', { name: 'Log In' });

    }

    async login (Username,Password){
        await this.userNameField.click();
        await this.userNameField.fill(Username);
        await this.passwordField.click();
        await this.passwordField.fill(Password);
        await this.loginBtn.click();
        await this.page.waitForURL('https://www.reddit.com/');

    }

}

