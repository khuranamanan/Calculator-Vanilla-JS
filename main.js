class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === "") this.clear();
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNum(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let result;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "÷":
                result = previous / current;
                break;
            case "×":
                result = previous * current;
                break;
            default:
                break;
        }

        this.previousOperand = "";
        this.currentOperand = result;
        this.operation = undefined;
    }

    getCommasInNumbers(number) {
        let numArr = number.toString().split(".");
        let integerNum = parseFloat(numArr[0]);
        let decimalNum = numArr[1];
        let integerDisplay;
        if (isNaN(integerNum)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerNum.toLocaleString("en-IN");
        }
        if (decimalNum != null) {
            return `${integerDisplay}.${decimalNum}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getCommasInNumbers(this.currentOperand);
        // this.previousOperandElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.getCommasInNumbers(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll("[data-numbers]");
const operationButtons = document.querySelectorAll("[data-operations]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");
const allButtons = document.querySelectorAll("button");


const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener("keydown", keyboardInteraction)

function keyboardInteraction(e) {
    if ((/[0-9]|\./).test(e.key)) {
        calculator.appendNum(e.key);
        calculator.updateDisplay();
        return;
    } else if (e.key === "Backspace") {
        calculator.delete();
        calculator.updateDisplay();
        return;
    } else if (e.key === "*") {
        calculator.chooseOperation("×");
        calculator.updateDisplay();
        return;
    } else if (e.key === "/") {
        calculator.chooseOperation("÷");
        calculator.updateDisplay();
        return;
    } else if (e.key === "+") {
        calculator.chooseOperation("+");
        calculator.updateDisplay();
        return;
    } else if (e.key === "-") {
        calculator.chooseOperation("-");
        calculator.updateDisplay();
        return;
    } else if (e.key === "Enter") {
        calculator.compute();
        calculator.updateDisplay();
        return;
    }
    return;
}

console.log(allButtons)
//Adding ripple effect to all the buttons
allButtons.forEach((btn)=>{
    btn.addEventListener("click",function(e){
        let x = e.pageX - e.target.offSetLeft;
        let y = e.pageY - e.target.offSetTop;

        let ripples = document.createElement("span");
        ripples.style.left = x + "px";
        ripples.style.top = y + "px";
        this.appendChild(ripples);

        setTimeout(()=>{
            ripples.remove()
        },1000);
    })
})