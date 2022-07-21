var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userEnteredPattern = [];
var level = 0;

$(document).on("keydown", function() {

    if(level == 0){
        nextSequence();
        blinkLastColourInGamePattern();
    }

});



$(".btn").click(function() {

    var userChosenColour = this.id;
    userEnteredPattern.push(userChosenColour);

    if(isUserEnteredPatternCorrect(userEnteredPattern.length - 1)) {
        
        playButtonSound(userChosenColour);
        blink(userChosenColour);
    
    } else {
    
        $("body").addClass("game-over");
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("#level-title").text("Game Over.");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        level = 0;
        gamePattern.length = 0;
        userEnteredPattern.length = 0;
        return ;
    
    }

    if(userEnteredPattern.length == gamePattern.length) {
        nextSequence();
        blinkLastColourInGamePattern();
    }
    
});

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColours[randomNumber]);
    level++;
    $("#level-title").text(`Level - ${level}`);
    userEnteredPattern.length = 0;

}

function blink(buttonColour) {
    $("#" + buttonColour).fadeOut(100).fadeIn(100);   
}

function blink(buttonColour,i) {
    setTimeout(() => {
    $("#" + buttonColour).fadeOut(100).fadeIn(100);
    }, 700*i);
}

function playButtonSound(buttonColour) {

    var audio;

    switch(buttonColour) {
        
        case "red":
            audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        
        case "green":
            audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
    
        default:
            break;
    
    }
}

function playSound(buttonColour) {

    setTimeout(() => {
        playButtonSound(buttonColour);
    }, 700);

}


function blinkLastColourInGamePattern() {

    var i = gamePattern.length - 1;
    var buttonColour = gamePattern[gamePattern.length - 1];

    blink(buttonColour,1);
    playSound(buttonColour);

}

function isUserEnteredPatternCorrect(index) {

    if(userEnteredPattern[index] != gamePattern[index]){
        return false;
    }
    return true;

}