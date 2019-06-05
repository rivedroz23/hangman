// Global variable declarations
//Initial words array
var words = ["ga", "friend", "winter", "crash", "tacos"]; 

//Variable to hold random word selection for each new game
var word = words[Math.floor(Math.random()*words.length)]; 
console.log(word); 

//Create new variable to keep track of incorrect guesses. 
var incorrect = 0; 
var correct = 0; 

//Function that allows users to reset the gameboard. 
function resetGame(){
	location.reload();

} 

//Need to handle setting correct letter for every place in the word that it appears. Right now includes only getIndex just finds the first place and returns.
function checkUserGuess() {
    var form, guess; 
    form=document.getElementById("form"); 
    guess=form.elements["guess"].value; 
    //check to see if users letter is contained in our random word. The value of w is true or false
    var w = word.includes(guess);
    if (w === true) {
        getIndex(guess);
    }  else {
        //This code keeps track of the number of incorrect guesses and then updates the hangman image in our html page
        ++incorrect; 
    if (incorrect > 7) {
        alert("You're already dead");
        
    }
    else {

        const myHangman = document.getElementById("game-board");
        const oldHangman = myHangman.children[0];
     
        const newHangmanImg = document.createElement("img");
        newHangmanImg.setAttribute('src', 'images/'+incorrect+'.png');
        
        myHangman.replaceChild(newHangmanImg, oldHangman); 

    }
    }
   
}; 

function createGameBoard() {
    // Add initial hangman img
    // Set letter dashes
    var ld = word.length;
   
    //Set the initial hangman image
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/1.png');
    cardElement.setAttribute('id', 'image');
    document.getElementById("game-board").appendChild(cardElement);


    for (i = 0; i < ld; i++) {
     var letterElement = document.createElement('li');
     letterElement.innerHTML ="-"; 
     document.getElementById("holder3").appendChild(letterElement);
    }
}

function getIndex(guess) {
    //We need to check for multipel index postions... indexOf doesn't do that...it returns after the first
    indexPosition = word.indexOf(guess); 
   // console.log(indexPosition); 
    setCorrectLetter(guess, indexPosition);
}
//This function allows us to set the correct letter, then call checkForWinner
function setCorrectLetter(guess, indexPosition) {
   const myList = document.getElementById("holder3");
   const guessItem = myList.children[indexPosition];

   const newListItem = document.createElement("li");
   newListItem.textContent = guess;

   myList.replaceChild(newListItem, guessItem); 
   checkForWinner();

}

function checkForWinner() {
    ++correct;
    console.log(correct);
    if (correct === word.length) {
        alert("Congrats!");
        document.getElementById("guess").setAttribute("readonly", true); 
    } else if (correct > word.length) {
        alert("You already won, play again"); 
        resetGame(); 
    }
}

createGameBoard();
