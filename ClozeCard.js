//inquirer
var inquirer = require("inquirer");
//node module export
module.exports = ClozeCard;

//cloze card constructor
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, "------");
    this.make = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: "cloze"//??
        };
        //log it all..copying from basicCard
        fs.appendFile("log.txt", JSON.stringify(data) + "-", "utf8", function(error) {
            //log error
            if (error) {
                console.log(error);
            }
        });
    };

}

    //partial property EDIT: none of this wrorks!
    /*this.partial = function () {
        //make an array out of partial
        var partial = [];
        //user word
        var word = text.split(" ");
        //for loop for words. i=2 for input
        for (var i=2; i < word.length; i++) {
            partial.push(word[i]);
            var partialInput = "..." + partial.join(" ");
            var partialCloze = word[0] + " " + word[1];
        }

        if (this.cloze == partialCloze) {
            console.log("Error");
        }

        else {
            console.log(partialInput);
        }
    };
};*/



