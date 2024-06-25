listGuessedNumbers = [];
max_number = 4;

function generateRandomNumber(){
    let chosen_number = parseInt(Math.random() * max_number + 1);
    let listQuantityElements = listGuessedNumbers.length;

    if(listQuantityElements == max_number){
        listGuessedNumbers = [];
    }

    if(listGuessedNumbers.includes(chosen_number)){
        return generateRandomNumber();
    }else{
        listGuessedNumbers.push(chosen_number);
        console.log(listGuessedNumbers);
        return chosen_number;
    }
}

function displayInitialMessage(){
    textOnScreen("h1", "Guessing Game");
    textOnScreen("p", `Choose a number between 1 and ${max_number}`);
}

displayInitialMessage();

let secret_number = generateRandomNumber();
let attempts = 1;

function textOnScreen(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, "UK English Female", {rate: 1.2});
}

function clear_field(){
    guess = document.querySelector("input");
    guess.value = "";
}

function restart_game(){
    secret_number = generateRandomNumber();
    clear_field();
    attempts = 1;
    displayInitialMessage();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}

function checkGuess(){
    let guess = document.querySelector("input").value;
    let text_attempts = attempts > 1 ? "attempts": "attempt";
    let attempts_message = `You guessed the secret number with ${attempts} ${text_attempts}!`;
    if(guess == secret_number){
        textOnScreen("h1","Got it!");
        textOnScreen("p", attempts_message);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if(guess>secret_number){
            textOnScreen("p",`The secret number is less than ${guess}`);
        }else{
            textOnScreen("p",`The secret number is greater than ${guess}`);
        }
        attempts++;
        clear_field();
    }
}