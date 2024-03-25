export default class BasePage{

    async open(path){               
        return browser.url(`${path}`);//Recived a path for specific url
    };

    async clickButton(element){
            await element.click();
        };

        readText(element){
            return element.getText();
        };

    async writeText(element, text){
            
            await element.setValue(text);
        };

    
    async scrollToElement(element){
            await element.scrollIntoView();
        };

        
    };

