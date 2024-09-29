let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxInitialAttempts = 3;
let extraAttempts = 3;
let totalAttempts = maxInitialAttempts + extraAttempts;
let guessRange = [1, 100];
let remainingAttempts = totalAttempts;

document.getElementById("guessButton").addEventListener("click", checkGuess);
document.getElementById("guess").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }
});

document.getElementById("reloadButton").addEventListener("click", function() {
    window.location.reload();
});

function checkGuess() {
    let guess = parseInt(document.getElementById("guess").value);
    
    // Ensure the input is valid
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("result").innerHTML = "Please enter a valid number between 1 and 100.";
        return;
    }

    if (remainingAttempts > 0) {
        attempts++;
        remainingAttempts--;

        document.getElementById("attemptsInfo").innerHTML = `You have ${remainingAttempts} attempts remaining.`;

        if (guess === secretNumber) {
            document.getElementById("result").innerHTML = `🎉 Congratulations! You guessed the number in ${attempts} attempt(s).`;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("attemptsInfo").innerHTML = `You guessed correctly with ${remainingAttempts} attempts left!`;
            document.getElementById("reloadButton").style.display = "block"; // Show reload button
            return;
        } 

        if (guess < secretNumber) {
            document.getElementById("result").innerHTML = "Too low! Try again.";
            guessRange[0] = Math.max(guess, guessRange[0]);
        } else {
            document.getElementById("result").innerHTML = "Too high! Try again.";
            guessRange[1] = Math.min(guess, guessRange[1]);
        }

        if (attempts === maxInitialAttempts) {
            document.getElementById("hint").innerHTML = `Hint: The number is between ${guessRange[0]} and ${guessRange[1]}.`;
        }

        if (attempts >= totalAttempts) {
            document.getElementById("result").innerHTML = `You've exceeded the maximum attempts. The correct number was ${secretNumber}.`;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("reloadButton").style.display = "block"; // Show reload button after game ends
        }
    } else {
        document.getElementById("result").innerHTML = `Game over! You've used all your attempts. The correct number was ${secretNumber}.`;
        document.getElementById("guessButton").disabled = true;
        document.getElementById("reloadButton").style.display = "block"; // Show reload button after game ends
    }
}
