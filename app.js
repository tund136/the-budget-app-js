// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    };

    return {
        addItem: function (type, des, value) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, des, value);
            } else if (type === "inc") {
                newItem = new Income(ID, des, value);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },
        testing: function () {
            console.log(data);
        },
    };
})();

// UI CONTROLLER
var UIController = (function () {
    var DOMStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMStrings.inputDescription)
                    .value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },

        addListItem: function (obj, type) {
            // Create HTML string with placeholder text
            var html, newHtml, element;

            if (type === "inc") {
                element = DOMStrings.incomeContainer;

                html =
                    '<div class="item clearfix" id="income-0"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMStrings.expensesContainer;

                html =
                    '<div class="item clearfix" id="expense-%id %"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);

            // Insert the HTML into the DOM
            document
                .querySelector(element)
                .insertAdjacentHTML("beforeend", newHtml);
        },

        getDOMStrings: function () {
            return DOMStrings;
        },
    };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListener = function () {
        var DOM = UICtrl.getDOMStrings();

        document
            .querySelector(DOM.inputBtn)
            .addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            // Keycode of ENTER is 13
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(
            input.type,
            input.description,
            input.value
        );

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListener();
        },
    };
})(budgetController, UIController);

controller.init();
