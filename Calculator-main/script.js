const display=document.querySelector('.calculator-input'); 
const keys=document.querySelector('.calculator-keys');  

let displayValue='0'; 


let firstValue=null;
let operator_bilgisi=null;
let waitingForSecondValue=false; 

updateDisplay();
function updateDisplay() {  
    display.value = displayValue;  
    console.log("hi : " + displayValue);
}

/
keys.addEventListener('click',function(e){
    const element =e.target;
    
    if(!element.matches('button')) return; 
    console.log(element);
     
    
    if(element.classList.contains('operator')){
        
        handleOperator(element.value);
        updateDisplay(); 
        return;
    }

    
    if(element.classList.contains('decimal')){
        
        inputDecimal();  
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')){
         
        clear();
        updateDisplay();
        return;
    }
    
    
    
    inputNumber(element.value);  
    updateDisplay(); 
    
});

function inputNumber(num) {
    if(waitingForSecondValue ) {
        displayValue=num;
        waitingForSecondValue=false;
    } else {
    displayValue = displayValue === '0' ? num : displayValue + num ;  
   }
   console.log(firstValue,displayValue,operator_bilgisi,waitingForSecondValue);
}

function inputDecimal(){
    if(!displayValue.includes('.')){  
        displayValue += '.';
    }
}
function clear(){
    displayValue='0';
}

function handleOperator(nextOperator) { 

    const value = parseFloat(displayValue);
    if(operator_bilgisi && waitingForSecondValue){ 
        operator_bilgisi = nextOperator;  
        return;
    }
    
    if(firstValue === null) {   
        firstValue = value; 
    } else if(operator_bilgisi) {
        const result = calculate(firstValue, value, operator_bilgisi);

        displayValue = `${parseFloat(result.toFixed(7))}`;   
        firstValue = result ; 
    waitingForSecondValue = true; 
    operator_bilgisi = nextOperator; 
    console.log(firstValue,displayValue,operator_bilgisi,waitingForSecondValue);
}

function calculate(firstSayi,secondSayi,operator_bilgisi) {
    if(operator_bilgisi === '+'){
        return firstSayi + secondSayi;
    }
    else if(operator_bilgisi === '-'){
        return firstSayi - secondSayi;
    }
    else if(operator_bilgisi === '*'){
        return firstSayi * secondSayi;
    }
    else if(operator_bilgisi === '/'){
        return firstSayi / secondSayi;
    }
    return secondSayi;  
}

