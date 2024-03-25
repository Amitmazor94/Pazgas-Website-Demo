import HomePage from "../Page Objects/HomePage";
import GasPage from "../Page Objects/GasAuthenticationPage";
class GasFlows{

   
    async navigateToGasAuthenticationPage(){
        await HomePage.clickGasButton();
        var windowHandles= await browser.getWindowHandles();
        var lastHandleIndex=  windowHandles[windowHandles.length-1]; 
        if(windowHandles.length>1){
        await browser.switchToWindow(lastHandleIndex);
       }
        else {
        console.warn('There is no second window to switch to');
       }
       
    }

    async closeTheLastWindow(){
        await browser.closeWindow();
        var windowHandles= await browser.getWindowHandles();
        await browser.switchToWindow(windowHandles[0]);  
    }
    

} export default new GasFlows();