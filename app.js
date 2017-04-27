//create a variable to store all button class for easy change purpose
var DOMstrings={
  inputType:".add__type",
  inputDescription:".add__description",
  inputValue:".add__value",
  inputBtn:".add__btn"
};/*--end of DOMstrings---*/

//using IIFE so the variables in between each function does not affect on each other
//Budget CONTROLLER
var budgetController=(function(){

})();/*---end of budgetController function---*/

//UI controller
var UIController=(function(){
  return{
    //read data from UI
    /*---define properties in ojbect, using : instead of = and end with , instead of :   */
    getInput:function(){
      return{
        //get value of .add__type class, will be either inc or exp
        type:document.querySelector(DOMstrings.inputType).value,
        //get value of .add__description class
        description:document.querySelector(DOMstrings.inputDescription).value,
        //get value of .add__value class
        value:document.querySelector(DOMstrings.inputValue).value
      };/*---end of return---*/
    }/*---end of getinput function---*/
  };/*---end of return---*/
})();/*---end of UIController fucntion---*/

//GLOBAL APP CONTROLLER
var controller=(function(budgetCtrl,UICtrl){
  //create a function event once the checkmark is clicked
  var ctrlAddItem=function(){
    //get the filed input data
    var input=UICtrl.getInput();
    console.log(input);
    //add the item to the budget controller

    //add new item to the UI

    //calculate the budget

    //display budget on UI

  }/*---end of ctrlAddItem function---*/

  //monitor the event function and apply the function when checkmark button clicked
  document.querySelector(DOMstrings.inputBtn).addEventListener("click",function(){
    ctrlAddItem();
  });/*---end of add__btn event---*/

  //apply above function when ENTER KEY pressed too
  document.addEventListener("keypress",function(event){
    if (event.keycode===13){/*--13 is the keycode for ENTER--*/
      ctrlAddItem();
    }/*---end of keycode 13 statement---*/
  });/*---end of keypress event listener---*/
})(budgetController,UIController);/*---end of controller function---*/
