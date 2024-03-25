import BasePage from "./BasePage";
class HomePage extends BasePage{

get gasButton(){
    return $(".quick-menu-wrapper :nth-of-type(5) a");
}

get electionPopupXButton(){
    return $("//div[@id='ZA_CAMP_DIV_1_INNER']/div[@class='za_reset']/button");
}


open(){
    return super.open('/he');
}

async clickGasButton(){
  await super.clickButton(this.gasButton);     
}

async switchToGasButton(){
   await super.clickButton(this.gasButton);
   await super.switchTab[1];
}

async scrollToGasButton(){
    await super.scrollToElement(this.gasButton);
}

async closeElectionPopup(){
    await super.clickButton(this.electionPopupXButton);
}

    } 
export default new HomePage();