import BasePage from "./BasePage";
const {startStep, endStep, addStep} = require('@wdio/allure-reporter');
class GasAuthenticationPage extends BasePage{

/////////Elements////////////////////////////////////////////
////////////////////////////////////////////////////////////
    get idField(){
        return $(" label input#cvn");
    }

    get phoneField(){
        return $("#phone");
    }

    get emailField(){
        return $("//*/input[@name='email']");
    }

    get submitButton(){
        return $("#loginSubmit");
    }

    get idTextError(){
        return $("#tab-1 .error-message");
    }

    get phoneTextError(){
        return $("//input[@class='phone format error']/following-sibling:: div");
    }

    get loginLoader(){
        return $("img[alt='loader']");
    }

    get customerIdRB(){
        return $("input[value='customer_method']");
    }

    get customerIdField(){
        return $("input[name='customerID']");
    }

    get customerIdTextError(){
        return $("label[for='customerID'] .error-message");
    }

    get phoneFieldErrorMessage(){
        return $("label[for='phone'] .error-message");
    }

    get emailFieldErrorMessage(){
        return $("//*/input[@name='email']/following-sibling::div[@class='error-message']");
    }

    get creditCardRB(){
        return $("#credit_method");
    }

    get creditCardField(){
        return $("#creditCard");
    }

    get creditCardFieldTextError(){
        return $("label[for='creditCard'] .error-message");
    }

    get emailRB(){
        return $("#email_subdetail");
    }

   
////////////Page Actions/////////////////////////////////////
////////////////////////////////////////////////////////////
    async open(){
        return super.open('/he/login_page/?requestOrigin=gasOrder');
    }

     async setIdNumber(text){
        startStep(`Setting in the ID number field the value: ${text}`);
        await super.writeText(this.idField, text);
        endStep();
    }
    async setPhoneNumber(text){
        startStep(`Setting in the phone number field the value: ${text}`);
        await super.writeText(this.phoneField, text);
        endStep();
    }

    async setEmailField(text){
        startStep(`setting in the email field the value: ${text}`);
        await super.writeText(this.emailField, text);
        endStep();
    }

    async clickOnTheSubmitButton(){
        startStep(`Clicking on the submit button`);
        await super.clickButton(this.submitButton);
        endStep();
    }
    async clickCustomerIdRB(){
        startStep(`Clicking on the customer ID radio button`);
        await super.clickButton(this.customerIdRB);
        endStep();
    }

    async clickCreditCardRB(){
        startStep("clicking on the credit card radio button");
        await super.clickButton(this.creditCardRB);
        endStep();
    }
    async clickEmailRB(){
        startStep("clicking on the email radio button");
        await super.clickButton(this.emailRB);
        endStep();
    }
    async setCreditCardField(text){
        startStep(`Setting in the credit card field the value: ${text} `);
        await super.writeText(this.creditCardField, text);
        endStep();
    }

    async setCustomerIdField(text){
        startStep(`Setting in the customer ID field the value: ${text}`);
        await super.writeText(this.customerIdField, text);
        endStep();
    }

    async verifyIdFieldValueLimit(text){
        startStep(`Verifying the id field value limit for the value- ${text}`);
        let isValid;
        let idFieldValue;
        let idValueLength
        await this.setIdNumber(text);
        idFieldValue= (await (await this.idField).getValue()).replace(/\s*\d+\s*/g, (match) => match.trim());
        idValueLength= idFieldValue.length;
      
        if(idValueLength>9){
            isValid=false;
            startStep("The ID value is longer than 9");
            endStep();
            return isValid;

        }
        else if(idValueLength<9){
            isValid=false;
            startStep("The ID value is shorter than 9");
            endStep();
            return isValid;
        }
        else if(idValueLength=9){
             isValid=true;
             startStep("The ID value has 9 digits");
             endStep();
             return isValid;
    }
        endStep();
}

    async verifyPhoneFieldValueLimit(text){
        startStep(`Verifying the phone field value limit for the value- ${text}`);
        let isValid;
        let phoneFieldValue;
        let phoneValueLength;
        await this.setPhoneNumber(text);
        phoneFieldValue= (await this.phoneField.getValue()).replace("-", "");
        phoneValueLength= phoneFieldValue.length;
        console.log(await phoneFieldValue);
        if(phoneValueLength>10){
            isValid=false;
            startStep("The value is longer than 10 digits");
            endStep();
            return isValid;
        }
        else if(phoneValueLength<10){
            isValid= false;
            startStep("The value is shorter than 10 digits");
            endStep();
            return isValid;
        }
        else if(phoneValueLength= 10){
            isValid= true;
            startStep("The phone value has 10 digits");
            endStep();
            return isValid;
        }
        endStep();
    }

    async verifyCreditCardFieldValueLimit(text){
        startStep(`Verifying the credit card field value limit for the value- ${text}`);
        let isValid;
        let creditCardFieldValue;
        let creditCardValueLength;
        await this.setCreditCardField(text);
        creditCardFieldValue= (await this.creditCardField).getValue();
        creditCardValueLength= (await creditCardFieldValue).length;
        console.log("credit card field value length: "+creditCardValueLength);
        if(creditCardValueLength>4){
            isValid=false;
            startStep("The value is longer than 4");
            endStep();
            return isValid;
        }
        else if(creditCardValueLength<4){
            isValid=false;
            startStep("The value is shorter than 4");
            endStep();
            return isValid;
        }
        else if(creditCardFieldValue=4){
            isValid=true;
            startStep("The value has 4 digits");
            endStep();
            return isValid;
        }
        endStep();
    }

    async getCreditCardFieldErrorMessageText(){
        startStep(`Reading credit card field error message: ${await this.readText(this.creditCardFieldTextError)}`);
        let errorMessageText= await super.readText(this.creditCardFieldTextError);
        endStep()
        return errorMessageText;
    }

    async getEmailPhoneFieldErrorMessage(){
        let errorMessageText= await super.readText(this.emailFieldErrorMessage);
        return await errorMessageText;
    }

    async getEmailFieldValue(){
        return await super.getFieldValue(this.emailField);
    }
}
export default new GasAuthenticationPage();