import HomePage from "../Page Objects/HomePage";
import GasAuthenticationPage from "../Page Objects/GasAuthenticationPage";
import GasFlows from "../Flows/GasFlows.flow";
const {startStep, endStep, addStep} = require('@wdio/allure-reporter');

describe('Login Tests', () => {
    let isValidLimit;

    before(async() => {
        browser.url("/");
        await browser.maximizeWindow(); 
    });

    beforeEach(async() => {
        await GasFlows.navigateToGasAuthenticationPage(); 
    });

    afterEach(async() => {
        await GasFlows.closeTheLastWindow();
    });

    
    
    it('Verify submit button functionality', async() => {
        startStep("Opening the site and navigate to the gas authentication page");
        endStep();
        startStep("Leaving the fields empty and clicking on the submit button");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        endStep();
        startStep("Asserting error messages in the fields");
        addStep("Verify ID field error is displayed");
        await expect (GasAuthenticationPage.idTextError).toBeDisplayed();
        addStep("Verify phone field error is displayed");
        await expect (GasAuthenticationPage.phoneTextError).toBeDisplayed();
        endStep();
        startStep("Filling the required fields and clicking on the submit button");
        await GasAuthenticationPage.setIdNumber('314055179');
        await GasAuthenticationPage.setPhoneNumber('0542557513');
        await GasAuthenticationPage.clickOnTheSubmitButton();
        endStep();
        startStep("Verify the login loader is displayed");
        await expect (GasAuthenticationPage.loginLoader).toBeDisplayed();
        endStep();
        startStep("Closing authentication tab");
        endStep();
    });

    it('Verify customer ID validations', async() => {
        startStep("navigate to the gas authentication page");
        endStep();
        await GasAuthenticationPage.clickCustomerIdRB();
        await GasAuthenticationPage.setPhoneNumber("0542557513");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify customer id field error is displayed after leaving the field empty");
        await expect(GasAuthenticationPage.customerIdTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setCustomerIdField("&%^&%*^%&*");
        await GasAuthenticationPage.setPhoneNumber("0542557514");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify customer id field error is displayed after inserting special characters");
        await expect(GasAuthenticationPage.customerIdTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setCustomerIdField("abc12345");
        await GasAuthenticationPage.setPhoneNumber("0542557515");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("verify valid customer id value population without errors");
        await expect(GasAuthenticationPage.loginLoader).toBeDisplayed();
        endStep();
        startStep("Closing authentication tab");
        endStep();
    });

    it('Verify ID field validation', async() => {
        startStep("navigate to the gas authentication page");
        endStep();
        await GasAuthenticationPage.setPhoneNumber("0542557513");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearence when the id field is empty");
        await expect(GasAuthenticationPage.idTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setIdNumber("abcdefghi");
        await GasAuthenticationPage.clickOnTheSubmitButton();
       startStep("Verify error message appearence when inserting alphabethic digits");
        await expect(GasAuthenticationPage.idTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setIdNumber("!@#$%^&$#");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearence when inserting special characters");
        await expect(GasAuthenticationPage.idTextError).toBeDisplayed();
        endStep();
        isValidLimit= await GasAuthenticationPage.verifyIdFieldValueLimit("3140551799");
        startStep("Verify no option to insert more than 9 digits");
        await expect(isValidLimit).toEqual(true);
        endStep();
        await GasAuthenticationPage.setIdNumber("3140551");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearence when inserting less than 9 digits");
        await expect(GasAuthenticationPage.idTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setIdNumber("314011111");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearence when inserting invalid id number");
        await expect(GasAuthenticationPage.idTextError).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setIdNumber("314055179");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify login logo appearence when inserting valid id number");
        await expect(GasAuthenticationPage.loginLoader).toBeDisplayed();
        endStep();
        startStep("Closing authentication tab");
        endStep();
    });
    
    it('Verify Phone field validations',async () => {
        startStep("navigate to the gas authentication page");
        endStep();
        await GasAuthenticationPage.setIdNumber("314055179");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message in the phone field when leaving it empty");
        await expect(GasAuthenticationPage.phoneFieldErrorMessage).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setPhoneNumber("abcdefghij");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message in the phone field when inserting alphabetic value");
        await expect(GasAuthenticationPage.phoneFieldErrorMessage).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setPhoneNumber("!@#$%%$#@!");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message in the phone field when inserting special characters");
        await expect(GasAuthenticationPage.phoneFieldErrorMessage).toBeDisplayed();
        endStep();
        isValidLimit= await GasAuthenticationPage.verifyPhoneFieldValueLimit("05425575133");
        startStep("Verify no option to insert more than 10 digits to the field");
        await expect(isValidLimit).toEqual(true);
        endStep();
        await GasAuthenticationPage.setPhoneNumber("054255751");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearence when inserting less than 10 digits");
        await expect(GasAuthenticationPage.phoneFieldErrorMessage).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setPhoneNumber("5552557513");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify error message appearance when inserting a phone number with invalid prefix");
        await expect(GasAuthenticationPage.phoneFieldErrorMessage).toBeDisplayed();
        endStep();
        await GasAuthenticationPage.setPhoneNumber("0542557513");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Verify a valid value acceptance");
        await expect(GasAuthenticationPage.loginLoader).toBeDisplayed();
        endStep();
        startStep("Closing authentication tab");
        endStep();
    });

    it('Verify Credit card field validations', async() => {
        startStep("navigate to the gas authentication page");
        endStep();
        startStep("switching to the credit card, filling all the required fields, leaving the credit card field empty and clicking on the submit button");
        await GasAuthenticationPage.clickCreditCardRB();
        await GasAuthenticationPage.setPhoneNumber("0540000000");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        addStep("Assert credit card field's error message is displayed");
        await expect(GasAuthenticationPage.creditCardFieldTextError).toBeDisplayed();
        endStep();
        startStep("Setting alphabetic letters in the credit card field and clicking on the submit button");
        await GasAuthenticationPage.setCreditCardField("aaaa");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        addStep("Assert credit card field's error message is displayed");
        await expect(GasAuthenticationPage.creditCardFieldTextError).toBeDisplayed();
        endStep();
        startStep("Setting special characters in the credit card field and clicking on the submit button");
        await GasAuthenticationPage.setCreditCardField("!!!!");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        addStep("Assert credit card field's error message is displayed");
        await expect(GasAuthenticationPage.creditCardFieldTextError).toBeDisplayed();
        endStep();
        startStep("Verify no option to insert more than 4 digits in the credit card field");
        isValidLimit =await GasAuthenticationPage.verifyCreditCardFieldValueLimit("44444");
        addStep("Asserting the typed value's limit");
        await expect(isValidLimit).toEqual(true);
        endStep();
        startStep("Adding less than 4 digits and clicking on the submit button");
        await GasAuthenticationPage.clickCreditCardRB();
        await GasAuthenticationPage.setCreditCardField("444");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        addStep("Asserting credit card field's error message text");
        let errorMessageContent= await GasAuthenticationPage.getCreditCardFieldErrorMessageText();
        console.log(errorMessageContent);
        await expect (errorMessageContent).toEqual("יש להזין 4 ספרות");
        endStep();
        startStep("Closing authentication tab");
        endStep();
    });

    it.only('Verify email field validations', async() => {
        startStep("navigate to the gas authentication page");
        endStep();
        await GasAuthenticationPage.clickEmailRB();
        await GasAuthenticationPage.setIdNumber("314055179");
        await GasAuthenticationPage.clickOnTheSubmitButton();
        startStep("Asserting Error message when the email field is empty");
        await expect (GasAuthenticationPage.emailFieldErrorMessage).toEqual("יש להזין טלפון נייד או כתובת מייל כדי להתקדם");
        endStep();
        await browser.pause(5000);
    });
});