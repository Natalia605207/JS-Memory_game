const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let hasFlippedCard = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !hasFlippedCard) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        hasFlippedCard = true;
        let cardOneImg = cardOne.querySelector(".back-face img").src,
        cardTwoImg = cardTwo.querySelector(".back-face img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return hasFlippedCard = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        hasFlippedCard = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    hasFlippedCard = false;
    cardOne = cardTwo = "";
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    numbers.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let backImage = card.querySelector(".back-face img");
        backImage.src = `assets/img-${numbers[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});