var lulu = {}

lulu.start = function () {  
    lulu.createArrOfImg();
    lulu.createArrayOfRandomIndexes();
    lulu.enterCardsToTheBoard();
    lulu.connectButtonsEvent();
    lulu.connectClickToCards();
}

lulu.namesOfCards = ["spain", "netherlands", "jamaica", "argentina", "romania", "australia"]
lulu.cardsFlipped = [];

lulu.newGame = function(){
    location.reload();
}

lulu.createArrOfImg = function () {
    lulu.imagesSRC = []
    for (var i = 0; i < lulu.namesOfCards.length; i++) {
        var imgSrc = `./img/${lulu.namesOfCards[i]}.jpg`;
        lulu.imagesSRC.push(imgSrc)
        lulu.imagesSRC.push(imgSrc);
    }
}

lulu.createArrayOfRandomIndexes = function () {
    lulu.randomIndexesArray = [];
    for (var i = 0; i < lulu.imagesSRC.length; i++) {
        lulu.createRandomIndex(i);
    }
}

lulu.createRandomIndex = function (index) {
    var num = Math.floor(Math.random() * (lulu.imagesSRC.length));
    if (lulu.randomIndexesArray[num] === undefined) {
        lulu.randomIndexesArray[num] = lulu.imagesSRC[index];
    }
    else {
        lulu.createRandomIndex(index);
    }
}

lulu.enterCardsToTheBoard = function () {
    var index = 0;
    $("span").each(function () {
        var card = $("<img/>").attr("src", lulu.randomIndexesArray[index]);
        card.addClass("non-active");
        $(this).append(card);
        $(this).data("imgSRC", lulu.randomIndexesArray[index]);
        $(this).addClass("non-matched");
        index++;
    })
}

lulu.connectButtonsEvent = function (){
    $(".new-game-button").on("click", lulu.newGame);
}

lulu.connectClickToCards = function () {
    $(".non-matched").on("click", lulu.play);
}

lulu.play = function () {
    lulu.flipCard($(this));
    lulu.cardsFlipped.push($(this));
    if (lulu.cardsFlipped.length === 2) {
        lulu.checkIfCorrect();
        return;
    }
    $(this).off("click", lulu.play);
}

lulu.flipCard = function (elem) {
    elem.find("img").toggleClass("non-active");
}

lulu.checkIfCorrect = function () { 
    $("span").off("click", lulu.play);
    if (lulu.cardsFlipped[0].data("imgSRC") !== lulu.cardsFlipped[1].data("imgSRC")) {
        setTimeout(function () {
            lulu.flipCard(lulu.cardsFlipped[0]);
            lulu.flipCard(lulu.cardsFlipped[1]);
            lulu.cardsFlipped = [];
            lulu.connectClickToCards();
        }, 1000);
    }
    else {
        lulu.cardsFlipped[0].removeClass("non-matched");
        lulu.cardsFlipped[1].removeClass("non-matched");
        lulu.cardsFlipped[0].off("click", lulu.play);
        lulu.cardsFlipped[1].off("click", lulu.play);
        if ($(".non-matched").length===0){
            $("#modal-container").css("display", "block");
        }
        lulu.cardsFlipped = [];
        lulu.connectClickToCards();
    }
    
}





$(document).ready(function () {
    lulu.start();
});

