var lulu={}

lulu.nameOfCards = ["spain", "netherlands", "jamaica", "argentina", "romania", "australia"]
lulu.createArrOfImg = function(){
    lulu.images = []
    for (var i=0; i<lulu.nameOfCards.length; i++){
        var imgSrc = `./img/${lulu.nameOfCards[i]}.jpg`;
        lulu.images.push(imgSrc)
        lulu.images.push(imgSrc);
    }
}
lulu.createCards = function(){
    lulu.cardsArray = [];
    for(var i=0; i<lulu.images.length; i++){
        lulu.createRandomPlace(i);
    }
}
lulu.createRandomPlace = function(index){
    var num = Math.floor(Math.random()*(lulu.images.length));
    if (lulu.cardsArray[num] === undefined){
        lulu.cardsArray[num] = lulu.images[index];
    }
    else {
        lulu.createRandomPlace(index);
    }
}
lulu.enterCards = function(){
    var index=0;
        $("span").each(function(){
            var card = $("<img/>").attr("src", lulu.cardsArray[index]);
            card.addClass("non-active");
            $(this).append(card);
            index++;
        })
}

$(document).ready(function(){
    lulu.start();
});

lulu.start = function(){
    lulu.createArrOfImg();
    lulu.createCards();
    lulu.enterCards();
    lulu.conectEvents();
}