//inquirer... EDIT: eliminating inquirer for basiccard
//var inquirer = require("inquirer");
// fs
var fs = require("fs");
//node module export
module.exports = BasicCard;
//basic card constructor... EDIT
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    this.create = function() {
        var data = {
            front: this.front,
            back: this.back,
            type: "basic",
        };
        //json time
        fs.appendFile("log.txt", JSON.stringify(data) + "-", "utf8", function(error) {
            //log error
            if (error) {
                console.log(error);
            }
        });
    };
};

/*adding prototype to makeCard due to instructions
BasicCard.prototype.makeCard = function () {
    console.log("Front: " + this.front);
    console.log("Back: " + this.back);
};*/

//inquirer
/*inquirer.prompt([
    {
        name: "front",
        message: "Enter question."
    },
    {
        name: "back",
        message: "Enter answer."
    },
]).then(function(answer) {
    var newCard = new BasicCard (
        answer.front,
        answer.back
    );
    //call function
    newCard.makeCard();
    //function for writing content
    function writeLog() {
        //function meant for newCard
        var basicContent = "Front: " + newCard.front + "\nBack: " + newCard.back;
        //appending
        fs.appendFile("package.json", basicContent, function(error, data){
            if (error) {
                console.log(error);
            }
            else {
                return;
            }
        });

    }
    //call writeLog
    writeLog();
});*/

