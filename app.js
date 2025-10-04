
let display = document.getElementById('display');
let buttons = document.querySelectorAll('.btn');
let clearBtn = document.getElementById('clear');
let equalBtn = document.getElementById('equal'); 

let currentInput = '';
let operator = '';
let firstNumber = null;

let clickSound = new Audio('sound/click.wav');
let equalSound = new Audio('sound/equal.mp3');

clickSound.volume = 0.4;

buttons.forEach(button => {
    button.addEventListener('click', () => {

         clickSound.currentTime = 0;
        clickSound.play();

        let value = button.getAttribute('data-value');

       
        if (button.classList.contains('operator')) {
            if (currentInput === '' && display.value !== '') {
               
                firstNumber = parseFloat(display.value);
            } else if (firstNumber === null && currentInput !== '') {
                firstNumber = parseFloat(currentInput);
            }
            operator = value;
            currentInput = '';
        }
     
        else if (!button.classList.contains('operator') && button.id !== 'equals' && button.id !== 'clear') {
            if (value === '.' && currentInput.includes('.')) return; 
            currentInput += value;
            display.value = currentInput;
        }
    });
});


equalBtn.addEventListener('click', () => {
    equalSound.currentTime = 0;
    equalSound.play();
    if (firstNumber !== null && operator && currentInput !== '') {
        let secondNumber = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = secondNumber !== 0 ? firstNumber / secondNumber : 'Error';
                break;
        }

        display.value = result;
        currentInput = result.toString();
        firstNumber = null;
        operator = '';
    }
});


clearBtn.addEventListener('click', () => {
    currentInput = '';
    firstNumber = null;
    operator = '';
    display.value = '';      
    display.placeholder = '0'; 
});