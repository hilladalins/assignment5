var lulu = {}

lulu.start = function () {
    lulu.setDefault();
    lulu.setBackground();
    lulu.setBackCards();
    lulu.createArrOfImg();
    lulu.createArrayOfRandomIndexes();
    lulu.enterCardsToTheBoard();
    lulu.connectButtonsEvent();
    lulu.connectClickToCards();
    lulu.startPlayingAudio();
}

lulu.world = ["spain", "netherlands", "jamaica", "argentina", "romania", "australia"];
lulu.rap = ["eminem", "jay-z", "kendrick-lamar", "nas", "snoop-dog","two-pac"];
lulu.flowers = ["calanit", "irus", "narkis", "rakefet", "sitvanit", "tzivoni"];

lulu.setDefault = function () {
    lulu.subject = "flowers"
    lulu.cardsFlipped = [];
    lulu.trialsCounter = 0;
    $(".trials-counter").text(lulu.trialsCounter);
};

lulu.newGame = function () {
    location.reload();
};

lulu.setBackground = function () {
    $("body").addClass(lulu.subject);
}

lulu.setBackCards = function () {
    $(".back").css({
        "background" :`url("./img/${lulu.subject}/${lulu.subject}-back.jpg")`,
        "background-size": "cover"
    })
}

lulu.createArrOfImg = function () {
    lulu.imagesNames = []
    for (var i = 0; i < lulu[lulu.subject].length; i++) {
        lulu.imagesNames.push(lulu[lulu.subject][i]);
        lulu.imagesNames.push(lulu[lulu.subject][i]);
    }
};

lulu.createArrayOfRandomIndexes = function () {
    lulu.randomIndexesArray = [];
    for (var i = 0; i < lulu.imagesNames.length; i++) {
        lulu.createRandomIndex(i);
    }
};

lulu.createRandomIndex = function (index) {
    var num = Math.floor(Math.random() * (lulu.imagesNames.length));
    if (lulu.randomIndexesArray[num] === undefined) {
        lulu.randomIndexesArray[num] = lulu.imagesNames[index];
    }
    else {
        lulu.createRandomIndex(index);
    }
};

lulu.enterCardsToTheBoard = function () {
    var index = 0;
    $(".card").each(function () {
        var imgPath = `url(./img/${lulu.subject}/${lulu.randomIndexesArray[index]}.jpg)`
        var frontCard = $("<div/>").css({
            "background-image": imgPath,
            "background-position": "center"
        });
        frontCard.addClass("card-img");
        frontCard.addClass("is-flipped");
        $(this).append(frontCard);
        $(this).data("cardImg", lulu.randomIndexesArray[index]);
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
    if (lulu.cardsFlipped[0].data("cardImg") !== lulu.cardsFlipped[1].data("cardImg")) {
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
            },600);            
        }
        lulu.cardsFlipped = [];
        lulu.connectClickToCards();
    }

};


$(document).ready(function () {
    lulu.start();
});

