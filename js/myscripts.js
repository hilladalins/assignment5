var lulu = {}

lulu.start = function () {
    lulu.createDefault();
    lulu.createArrOfImg();
    lulu.createArrayOfRandomIndexes();
    lulu.enterCardsToTheBoard();
    lulu.connectButtonsEvent();
    lulu.connectClickToCards();
    lulu.startPlayingAudio();
}

lulu.namesOfCards = ["spain", "netherlands", "jamaica", "argentina", "romania", "australia"]

lulu.createDefault = function () {
    lulu.cardsFlipped = [];
    lulu.trialsCounter = 0;
    $(".trials-counter").text(lulu.trialsCounter);
};

lulu.newGame = function () {
    location.reload();
};

lulu.createArrOfImg = function () {
    lulu.imagesUrl = []
    for (var i = 0; i < lulu.namesOfCards.length; i++) {
        var imgUrl = `url(./img/${lulu.namesOfCards[i]}.jpg)`;
        lulu.imagesUrl.push(imgUrl)
        lulu.imagesUrl.push(imgUrl);
    }
};

lulu.createArrayOfRandomIndexes = function () {
    lulu.randomIndexesArray = [];
    for (var i = 0; i < lulu.imagesUrl.length; i++) {
        lulu.createRandomIndex(i);
    }
};

lulu.createRandomIndex = function (index) {
    var num = Math.floor(Math.random() * (lulu.imagesUrl.length));
    if (lulu.randomIndexesArray[num] === undefined) {
        lulu.randomIndexesArray[num] = lulu.imagesUrl[index];
    }
    else {
        lulu.createRandomIndex(index);
    }
};

lulu.enterCardsToTheBoard = function () {
    var index = 0;
    $(".card").each(function () {
        var card = $("<div/>").css("background-image", lulu.randomIndexesArray[index]);
        card.addClass("card-img");
        card.addClass("is-flipped");
        $(this).append(card);
        $(this).data("imgUrl", lulu.randomIndexesArray[index]);
        $(this).addClass("non-matched");
        index++;
    })
};

lulu.connectButtonsEvent = function () {
    $(".new-game-button").on("click", lulu.newGame);
};

lulu.connectClickToCards = function () {
    $(".non-matched").on("click", lulu.play);
};

lulu.startPlayingAudio = function (){
    var audio = document.createElement("audio");
    audio.id = "game-audio";
    audio.src = "./audio/world.mp3"
    audio.type = "audio/mpeg";
    audio.preload = "auto";
    audio.loop = "true";
    audio.volume = 1;
    audio.autoplay = "true";
    document.getElementsByTagName("body")[0].appendChild(audio);
    audio.load();
};

lulu.play = function () {
    lulu.flipCard($(this));
    lulu.cardsFlipped.push($(this));
    if (lulu.cardsFlipped.length === 2) {
        lulu.checkIfCorrect();
        return;
    }
    $(this).off("click", lulu.play);
};

lulu.flipCard = function (elem) {
    elem.toggleClass("is-flipped");
};

lulu.checkIfCorrect = function () {
    $(".card").off("click", lulu.play);
    if (lulu.cardsFlipped[0].data("imgUrl") !== lulu.cardsFlipped[1].data("imgUrl")) {
        setTimeout(function () {
            lulu.flipCard(lulu.cardsFlipped[0]);
            lulu.flipCard(lulu.cardsFlipped[1]);
            lulu.trialsCounter++;
            $(".trials-counter").text(lulu.trialsCounter);
            lulu.cardsFlipped = [];
            lulu.connectClickToCards();
        }, 1000);
    }
    else {
        lulu.cardsFlipped[0].removeClass("non-matched");
        lulu.cardsFlipped[1].removeClass("non-matched");
        lulu.cardsFlipped[0].off("click", lulu.play);
        lulu.cardsFlipped[1].off("click", lulu.play);
        if ($(".non-matched").length === 0) {
            setTimeout(function(){
                $("#modal-container").css("display", "block");
            },700);            
        }
        lulu.cardsFlipped = [];
        lulu.connectClickToCards();
    }

};


$(document).ready(function () {
    lulu.start();
});

