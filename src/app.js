import "./style.css";
let cardArray = [];
const input = document.querySelector("#cards_amount");
const drawBtn = document.querySelector(".draw-btn");
const sortBtn = document.querySelector(".sort-btn");
const cardNumb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
const cardSimb = ["♦", "♥", "♠", "♣"];

// Card
class Card {
  constructor(num, suit) {
    this.suit = suit;
    this.num = num;
  }
}

//functions

const RandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SortedContainer = () => {
  let cardsSorted = document.querySelector(".sorted-cards");
  while (cardsSorted.firstChild) {
    cardsSorted.removeChild(cardsSorted.firstChild);
  }
};

// new array of cards
const generateArray = numCards => {
  let cardArray = [];

  for (let i = 0; i < numCards; i++) {
    let card = new Card();
    card.suit = cardSimb[RandomNum(0, cardSimb.length - 1)];
    card.num = cardNumb[RandomNum(0, cardNumb.length - 1)];
    cardArray.push(card);
  }
  return cardArray;
};

// cards
const generateCard = card => {
  if (["♦", "♥"].includes(card.suit)) {
    return `<div class="card"> <div class="suit suit--top color-red">${card.suit}</div> <div class="number">${card.num}</div> <div class="suit suit--bottom color-red">${card.suit}</div> </div>`;
  } else {
    return `<div class="card"> <div class="suit suit--top color-black">${card.suit}</div> <div class="number">${card.num}</div> <div class="suit suit--bottom color-black">${card.suit}</div> </div>`;
  }
};

const addCards = (cardArray, sort, iteration) => {
  let cardsContainer = document.querySelector(".cards-container");
  let cardsSorted = document.querySelector(".sorted-cards");
  let cardsDOM = "";

  for (let i = 0; i < cardArray.length; i++) {
    cardsDOM += generateCard(cardArray[i]);
  }

  if (!sort) {
    cardsContainer.innerHTML =
      '<div class="cards-container-row">' + cardsDOM + "</div>";
  } else {
    cardsSorted.innerHTML +=
      '<div class="cards-container-sort-row"> <div class="container-iteration-num"> <p class="iteration-num">' +
      iteration +
      "</p> </div> " +
      cardsDOM +
      " </div>";
  }
};

//events

drawBtn.addEventListener("click", () => {
  let numCards = input.value;
  cardArray = generateArray(numCards);
  addCards(cardArray, false, 0);
});

sortBtn.addEventListener("click", () => {
  SortedContainer();
  selectSort(cardArray);
});

// select sort

const selectSort = cardArray => {
  let newCardArray = [...cardArray];
  let iteration = -1;

  for (let i = 0; i < newCardArray.length; i++) {
    let indexOfMin = i;
    for (let j = i + 1; j < newCardArray.length; j++) {
      if (
        cardNumb.indexOf(newCardArray[j].num) <
        cardNumb.indexOf(newCardArray[indexOfMin].num)
      ) {
        indexOfMin = j;
      }
    }

    if (indexOfMin !== i) {
      const menor = newCardArray[indexOfMin];
      newCardArray[indexOfMin] = newCardArray[i];
      newCardArray[i] = menor;
      iteration++;
      addCards(newCardArray, true, iteration);
    }
  }

  if (iteration == -1) {
    addCards(newCardArray, true, 0);
  }

  return newCardArray;
};
