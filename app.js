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
        },
        budeget : 0
    }; // end data object

    var calculation = function(type) {
        var sum = 0; 
            data.class(type).forEach(function(cur) {
                sum += cur.value;
            });
            data.total[type] = sum;
    }

    return {
        addItem : function(type, description, value) { // type will be +/-
            var newItem;
            var id; // id used for distinguish different items. id will be updated based on previous record

            // in case of arrayIndexOutOfBound
            if (data.class[type].length > 0) { 
                id = data.class[type][data.class[type].length - 1].id + 1; 
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
        }, // end of addItem()

        getBudget : function() {
            return {
                budget : data.budeget,
                incomeTotal : data.total.income,
                expenseTotal : data.total.expense
            };
        },
        
        calculateBudget : function() {
            // calculate total income and expenses
            calculation('expenses');
            calculation('income');
            // calculate the budeget : income - expenses
            data.budeget = data.total.income - data.total.expenses;
        } // end of calcuate()
    } // end of return
}) (); // end of budgetController()

/**
 *  DISPLAY ON INTERFACE
 */
var UIController = (function() {
    // get input shown on interface
    return {
        getInput : function() {
            return {
                // fetch value if type + as for income or - as for expense
                type : document.getElementsByClassName('add-type').value,
                // fetch value of description
                description : document.getElementsByClassName('add-description').value,
                // fetch value of $ number
                value : parseFloat(document.getElementsByClassName('add-value').value) //convert string to number
            };          
        }, // end of getInput()
        addListItem : function(item, type) {
            var html;
            var newHtml; // updated every time when new item added to list
            var className; // helps define class name for later use
            // STEP 1 : create HTML with placehoder text
            if (type == 'income') {
                className = 'income-list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
            } else if (type == 'expense') {
                className = 'expenses-list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }         
            // STEP 2 : replace the placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //STEP 3 :  insert HTML into DOM
            document.getElementsByClassName(className).insertAdjacentHTML('beforeend', newHtml);
        } // end of addListItem()
    };
}) (); // end of UIController

/**
 * GlOBAL APP CONTROLLER
 */
var controller = (function(budgetController, UIController) {
    var input;
    var newItem;

    var updateBudget = function() {
        // STEP 1 : calculate
        budgetController.calculateBudget();
        // STEP 2 : return
        var budeget = budgetController.getBudget();
        // STEP 3 : display
    };

    //addBtn events bind: what happened if addBtn is clicked?
    var addBtnEvent = function() {
        // STEP 1 : get the input.
        input = UIController.getInput(); // function getInput() is defined in UIController
        if (input.description != '' && !isNaN(input.value) && input.value > 0) { //description cannot be empty and number should be number
            // STEP 2 : add item to budget. The item info is based upon input in STEP 1
            newItem = budgetController.addItem(input.type, input.description, input.value); // addItem() is defined in budgetController
            // STEP 3 : add item to UI
            UIController.addListItem(newItem, input.type);
            // STEP 4 : calculate and display on UI
            updateBudget();
        }     
    }; // end of addBtnEvent

    // when addBtn clicked
    document.getElementsByClassName('addBtn').addEventListener('click', addBtnEvent);

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
// var init = function() {
//     // when addBtn clicked
//     document.getElementsByClassName('addBtn').addEventListener('click', addBtnEvent);

//     // when Enter is hit : keyboard event
//     document.addEventListener('keypress', function(event) {
//         if (event.keyCode == 13) {
//             addBtnEvent();   
//         }
//     });
// }
// init();