// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// GetArray From Letters
let lettersArray = Array.from(letters);
// Select Letters Container 
let lettersContainer = document.querySelector(".letters");
// Generate Letters
lettersArray.forEach(letter => {
    // Create Span 
    let span = document.createElement("span");
    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);
    // Append The Letter To Span
    span.appendChild(theLetter);
    // Add Class On Span
    span.className = 'letter-box';
    // Append Span To The Letters Container
    lettersContainer.appendChild(span); 
});
// Object Of Words + Categories
const words = {
    programming : ["php", "javascript", "mysql", "python", "cplusplus", "csharp", "oracle", "go", "html", "css"],
    movies : ["Prestige", "Inception", "Coco", "Up", "Whiplash", "Prison Break"],
    people : ["Alexander", "Mohamed Ibrahim", "Amr Boghdady", "Mahatma Ghandi","Albert Einstein"],
    contries : ["Syria", "Palestine", "Yemen", "Egypt", "Qatar", "Moraco"]
}
// Get Random Property
let allKeys = Object.keys(words);
// Random Number Depend On Keys Length
let randomProbNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomProbName = allKeys[randomProbNumber];
// Category Words
let randomProbValue = words[randomProbName];
// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomProbValue.length);
// The Chosen Word
let randomValueValue = randomProbValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomProbName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letter-guess");

// Convert Choosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Words 
lettersAndSpace.forEach (letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === ' ') {
        // Add Class To Span
        emptySpan.className = 'with-space';
    }
    // Append Span To The Letters Guess Container
    letterGuessContainer.appendChild(emptySpan);
});

// Select Guess Span
let guessSpans = document.querySelectorAll(".letter-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letter 
document.addEventListener("click", (e) => {
    
    // Set The Choosen Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Choosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter,wordIndex) => {
            // If The Clicked Letter Equal To One Of The Choosen Word Letter
            if (theClickedLetter == wordLetter) {
                // Set Status To Correct
                theStatus = true;
                // Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        // Outside Loop
        // If Letter Is Wrong 
        if (theStatus !== true) {
            // Increase The Wrong Attempts
            wrongAttempts++;
            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            // Play Fail Sound
            document.getElementById('fail').play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            // Play Success Sound
            document.getElementById('success').play();
        }
    }
});

// End Game Function 
function endGame() {
    // Create Popup Div
    let div = document.createElement("div");
    // Create Text
    let divText = document.createTextNode(`Game Over, The Correct Word Is ${randomValueValue}`);
    // Append Text To Div
    div.appendChild(divText);
    // Add Class On Div
    div.className = "popup"
    // Append To The Body
    document.body.appendChild(div);
}