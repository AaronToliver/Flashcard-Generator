//Basic card constructor
var BasicCard = require("./BasicCard.js");

//clozeCard constructor
var ClozeCard = require("./ClozeCard.js");

//inquirer
var inquirer = require("inquirer");

//fs node package
var fs = require("fs");

// inquirer

inquirer.prompt([{
    name: "command",
    message: "new-card or show-cards?",
    type: "list",
    choices: [{
        name: "new-card"
    }, {
        name: "show-cards"
    }]
}]).then(function(answer){
    if  (answer.command === "new-card") {
        newCard();
    }
    else if (answer.command === "show-cards") {
        showCards();
    }
});

var newCard = function() {
    //acquire user input
    inquirer.prompt([{
        name: "Type",
        message: "basic-card or cloze-card?",
        type: "list",
        choices: [{
            name: "basic-card"
        }, {
            name:"cloze-card"
        }]
    }]).then(function(answer) {
        if (answer.Type === "basic-card") {
            inquirer.prompt([{
                name: "front",
                message: "Enter question.",
                validate: function(input) {
                    if (input === "") {
                        console.log("Enter a question for the front of the card");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                name: "back",
                message: "Enter answer.",
                validate: function(input) {
                    if (input === "") {
                        console.log("Create an answer for the back of the card");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }]).then(function(answer) {
                var newB = new BasicCard(answer.front, answer.back);
                newB.create();
                resumePrompt();
            });
            //doesn't seem to work unless I enter else if
        }   else if (answer.Type === "cloze-card") {
                inquirer.prompt([{
                    name: "full statement",
                    message: "Enter the full statement.",
                    validate: function(input) {
                        if (input === "") {
                            console.log("A full statement is needed.");
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                },
            {
                name: "cloze",
                message: "Enter the Cloze portion.",
                validate: function(input) {
                    if (input === "") {
                        console.log("Enter the portion removed from the full statement.");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }]).then(function(answer){
                var text = answer.text;
                var cloze = answer.cloze;
                if (text.includes(cloze)) {
                    var newC = new ClozeCard(text, cloze);
                    newC.create();
                    resumePrompt();
                }
                else {
                    console.log("The portion you provided is not included in the full statement.");
                    newCard();
                }
            });
        }
    });
};
        
//resume Prompt function
var resumePrompt = function() {
    //inquirer resumes
    inquirer.prompt([{
        name: "resume",
        message: "Next option.",
        type: "list",
        choices: [{
            name: "new-card"
        }, {
            name: "show-cards"
        }, {
            name: "exit"
        }]  
    //recieve
    }]).then(function(answer) {
        if(answer.resume === "new-card") {
            newCard();
        }
        //else if?
        else if (answer.resume === "show-cards") {
            showAll();
        }

        else if (answer.resume === "exit") {
            return;
        }
    });
};

//show All function
var showAll = function() {
    fs.readFile("./log.txt", "utf8", function(error, data) {
        //log the error
        if (error) {
            console.log(error);
        }
        var questions = data;
        var returnValue = function(value) {
            return value;
        };
        questions = questions.filter(returnValue);
        //wont work unless there's a count... I hate numbers lol
        var count = 0;
        showFront(questions, count);
    });
};

var showFront = function(array, index) {
    question = array[index];
    var formatQuestion = JSON.parse(question);
    var questionText;
    var correctResponse;
    var correctResponse;
    if (formatQuestion.type === "basic") {
        questionText = formatQuestion.front;
        correctResponse = formatQuestion.back;
    }
    else if (formatQuestion.type === "cloze") {
        questionText = formatQuestion.clozeDeleted;
        correctResponse = formatQuestion.cloze;
    }
    inquirer.prompt([{
        name: "response",
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctResponse) {
            console.log("Good Job.");
            if (index < array.length - 1) {
                showFront(array, index + 1);
            }
        } else {
            console.log("Try Again.");
            if (insex < array.length - 1) {
                showFront(array, index + 1);
            }
        }
    });
};