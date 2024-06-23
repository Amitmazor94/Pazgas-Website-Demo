export default class BasePage{

    async open(path){               
        return browser.url(`${path}`);//Recived a path for specific url
    };

    async clickButton(element){
            await element.waitForDisplayed({setTimeout: 3000, setInterval: 500});
            await element.waitForEnabled({setTimeout: 3000, setInterval: 500});
            await element.click();
           
        };

       async readText(element){
            await element.waitForDisplayed({setTimeout: 3000, setInterval: 500});
            await element.waitForEnabled({setTimeout: 3000, setInterval: 500});
            return element.getText();
        };

    async writeText(element, text){
            
            await element.setValue(text);
        };

    
    async scrollToElement(element){
            await element.scrollIntoView();
        };

    async getFieldValue(element){
        return await element.getValue();
    }
    };

