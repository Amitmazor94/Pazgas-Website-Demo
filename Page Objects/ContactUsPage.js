import BasePage from "./BasePage";

class ContactUsPage extends BasePage{

    get openCaseButton(){
        return $("//div[@class='styles_leftColumn__uY8Pf']/button[1]");
    }

    open(){
        return super.open("/contactus");
    }

    async clickSendCaseButton(){
        await super.clickButton(this.openCaseButton);
    }

    async scrollToOpenCaseButton(){
        await super.scrollToElement(this.openCaseButton);
    }

}
export default new ContactUsPage();