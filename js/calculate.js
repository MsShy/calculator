function Calculator() {
    this.values = ["c", "^", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "=", "*"];

}
Calculator.prototype.buildCalculator = function () {
    var i, j, br, form, button, screen, numbersButton;

    form = document.createElement("form");
    form.className = "calculator";
    br = document.createElement("br");

    for (i = 0; i < 2; i++) {
        button = document.createElement("input");
        form.appendChild(button);
    }

    screen = document.createElement("input");
    screen.className = "display";
    form.appendChild(screen);

    form.appendChild(br);

    for (i = 0; i < 4; i++) {
        br = document.createElement("br");
        for (j = 0; j < 4; j++) {
            numbersButton = document.createElement("input");
            numbersButton.setAttribute('type', "button");
            numbersButton.setAttribute('width', "button");
            form.appendChild(numbersButton);
        }
        form.appendChild(br);
    }

    document.body.insertBefore(form, document.body.firstChild);
};


Calculator.prototype.setAttribute = function () {
    // var values = ["c", "^", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "=", "*"];
    var arrayInput = document.getElementsByTagName("input");

    for (var i = 2; i < this.values.length; i++) {
        arrayInput[i + 1].setAttribute('value', this.values[i]);
    }

    arrayInput[0].setAttribute('value', this.values[0]);
    arrayInput[0].setAttribute('type', "reset");
    arrayInput[1].setAttribute('value', this.values[1]);
    arrayInput[1].setAttribute('type', "button");
    arrayInput[2].setAttribute('type', "text");
    arrayInput[2].setAttribute('autofocus', "true");
};


Calculator.prototype.inputData = function () {
    var form = document.getElementsByClassName("calculator")[0];
    var screen = document.getElementsByClassName("display")[0];

    form.onclick = function (event) {
        var target = event.target;
        if (target.className === 'display' || target.tagName != 'INPUT') {
            return;
        }
        screen.value += target.value.replace("=", "");
    };

};


Calculator.prototype.solve = function () {
    var form = document.getElementsByClassName("calculator")[0];
    var screen = document.getElementsByClassName("display")[0];
    var result = document.querySelectorAll('input[value="="]')[0];

    result.onclick = calculate;

    form.onkeydown = function (event) {
        if (event.keyCode == 13) {
            calculate();
        }
    };


    function calculate(event) {

        if (checkData(screen.value)) {
            if (screen.value.match(/\^/g)) {
                var re = getExponentiation(screen.value);
                screen.value = (eval(re));
            } else {
                screen.value = (eval(screen.value));
            }
        }
        return screen.value;
    }


    function getExponentiation(string) {
        var array = /(?:(?:.*[\+\-\*\/])?(\d+(?:\.\d)?\^\d+(?:\.\d)?)(?:[\+\-\*\/]?.*))/.exec(string);
        if (array === null) {
            return string;
        }
        var numberToPow = array[1].split("^");
        var result = Math.pow(numberToPow[0], numberToPow[1]);
        return getExponentiation(string.replace(array[1], result));
    }

    function checkData(data) {
        var correctData = true;

        if (/([\+\/\*\-\^\.]){2,}/g.test(data) || /([^0-9\+\/\*\-\^\.])/g.test(data)) {
            correctData = false;
            screen.value = "incorrect data";
        } else if (/\/0/g.test(data)) {
            correctData = false;
            screen.style.fontSize = "9px";
            screen.value = "Divide by zero error encountered.";
        } else if (/(\d[\+\/\*\-\^\.])$/g.test(data)) {
            correctData = false;
        }
        return correctData;
    }

};


(function init() {
    var calculator = new Calculator();
    calculator.buildCalculator();
    calculator.setAttribute();
    calculator.inputData();
    calculator.solve();

}());