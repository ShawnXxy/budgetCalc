/**
 * STORE DATA
 */
var budgetController = (function() {
    // Expense constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Income constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
   
    // var expenseList = [];
    // var incomeList = [];
    // var incomeTotal = 0;
    // var expenseTotal = 0;
    var data = {
        // expenseList : [],
        // incomeList : [],
        // incomeTotal : 0,
        // expenseTotal : 0
        class : {
            expense:  [],
            income : []
        },
        total : {
            expense : 0,
            income : 0
        }
    }; // end data object

    return {
        addItem : function(type, description, value) { // type could be +/-
            var newItem;
            var id;
            if (data.class[type].length > 0) { // in case of arrayIndexOutOfBound
                id = data.class[type][data.class[type].length - 1].id + 1; // id used for distinguish different items. id will be updated based on previous record
            } else {
                id = 0;
            }

            if (type == 'expense') {
                // add to new Expense list
                newItem = new Expense(id, description, value);
            } else if (type == 'income') {
                // add to new Income list
                newItem = new Income(id, description, value);
            }
            // push above record into data object
            data.class[type].push(newItem);
            return newItem;
        } // end of addItem()
    }

}) (); // end of budgetController()

/**
 * 
 */
var UIController = (function() {
    // get input shown on interface
    return {
        getInput : function() {
            return {
                // fetch value if type + as for income or - as for expense
                type : document.querySelector('.add-type').value,
                // fetch value of description
                description : document.querySelector('.add-description').value,
                // fetch value of $ number
                value : document.querySelector('.add-value').value
            };          
        }, // end of getInput()
        addListItem : function(obj, type) {
            // STEP 1 : create HTML with placehoder text
            // STEP 2 : 
        }
    };
}) (); // end of UIController

/**
 * GlOBAL APP CONTROLLER
 */
var controller = (function(budgetController, UIController) {
    var input;
    var newItem;
    //addBtn events bind   
    var addBtnEvent = function() {
        // STEP 1 : get the input.
        input = UIController.getInput(); // function getInput() is defined in UIController
        // STEP 2 : add item to budget. The item info is based upon input in STEP 1
        newItem = budgetController.addItem(input.type, input.description, input.value); // addItem() is defined in budgetController
        // STEP 3 : add item to UI

        // STEP 4 : calculate

        // STEP 5 : display on UI

    }; // end of addBtnEvent

    // when addBtn clicked
    document.querySelector('addBtn').addEventListener('click', addBtnEvent);

    // when Enter is hit : keyboard event
    document.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            addBtnEvent();   
        }
    }); // end of keypress

}) (budgetController, UIController); // end of controller

/**
 * INITIALIZATION
 */
var init = function() {
    // when addBtn clicked
    document.querySelector('addBtn').addEventListener('click', addBtnEvent);

    // when Enter is hit : keyboard event
    document.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            addBtnEvent();   
        }
    });
}
init();