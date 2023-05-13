let casinoWarGame = {
    player: {
      scoreSpan: "#player-count",
      div: ".player",
      boxSize: ".playing-row",
      score: 0,
    },

    house: {
      scoreSpan: "#house-count",
      div: ".house",
      boxSize: ".playing-row",
      score: 0,
    },

    //array with card faces
    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],

    //values of the cards
    cardsMap: {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, K: 10, J: 10, Q: 10, A: 1,},

    //starting point
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    isTurnsOver: false,
    pressOnce: false,
  };

  const PLAYER = casinoWarGame["player"];
  const HOUSE = casinoWarGame["house"];

  //recommended to add a window width to help screen adjust w3s
  let windowWidth = window.screen.width;
  let windowHeight = window.screen.height;

  //from the interent the best working form for thr cards to load properly
  function widthSize() {
    if (windowWidth > 1000) {
      let newWidthSize = window.screen.width * 0.1;
      return newWidthSize;
    } else {
      return window.screen.width * 0.18;
    }
  }

  function heightSize() {
    if (windowHeight > 700) {
      let newHeightSize = window.screen.height * 0.18;
      return newHeightSize;
    } else {
      return window.screen.height * 0.15;
    }
  }

  //function for the player hit peramiter
  function playerHit() {
    if (casinoWarGame["isStand"] === false) {
      let card = randomCard();
      showCard(card, PLAYER);
      updateScore(card, PLAYER);
      showScore(PLAYER);
    }
  }

  //setting the function for random card and value using .floor and .random
  function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return casinoWarGame["cards"][randomIndex];
  }

  //adding the load images factors for W+H and sources
  function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 10) {
      let cardImage = document.createElement("img");
      cardImage.src = `images/${card}.png`;
      console.log(card)
      cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
      document.querySelector(activePlayer["div"]).appendChild(cardImage);
    }
  }
  //function updating score
  function updateScore(card, activePlayer) {
    if (card === "A") {
      activePlayer["score"] += casinoWarGame["cardsMap"][card];
    }
      else {
      activePlayer["score"] += casinoWarGame["cardsMap"][card];
    }
    console.log(activePlayer["score"]);
  }
  //function showing score
  function showScore(activePlayer) {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
        activePlayer["score"];
  }

  //player hit button event Listeners
  document
    .querySelector("#player-btn")
    .addEventListener("click", playerHit);

  //function for the deal peramiter
  function deal() {
    if (casinoWarGame["isTurnsOver"] === true) {
      // Select all the images in both the player and house box
      let yourImages = document
        .querySelector(".player")
        .querySelectorAll("img");
      let dealerImages = document
        .querySelector(".house")
        .querySelectorAll("img");

      document.querySelector("#results").style.color = "white";

      //Sets the player and house scors to zero
      PLAYER["score"] = HOUSE["score"] = 0;
      document.querySelector("#player-count").textContent = 0;
      document.querySelector("#house-count").textContent = 0;

      //Reset color back to white
      document.querySelector("#player-count").style.color = "white";
      document.querySelector("#house-count").style.color = "white";

      //Reset to Let's Play
      document.querySelector("#results").textContent = "Lets Play";

      //Removes the cards form the box
      for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
        dealerImages[i].remove();
      }

      casinoWarGame["isStand"] = false;
      casinoWarGame.pressOnce = false;
      casinoWarGame["isTurnsOver"] = false;
    }
  }

  //deal button event listiner
  document
    .querySelector("#deal")
    .addEventListener("click", deal);

  //function for restart peramiter
  function restart() {
    deal();
    document.querySelector("#wins").textContent = 0;
    document.querySelector("#draws").textContent = 0;
    document.querySelector("#losses").textContent = 0;

    casinoWarGame.wins = 0;
    casinoWarGame.losses = 0;
    casinoWarGame.draws = 0;
  }

  //restart button event listiner
  document
    .querySelector("#restart")
    .addEventListener("click", restart);

  //function for the house hit peramiter
  function househit() {
    if (casinoWarGame.pressOnce === false) {
      casinoWarGame["isStand"] = true;

      //functions the house will produce the same amount of cards as player
      let yourImages = document
        .querySelector(".player")
        .querySelectorAll("img");

      for (let i = 0; i < yourImages.length; i++) {
        let card = randomCard();
        showCard(card, HOUSE);
        updateScore(card, HOUSE);
        showScore(HOUSE);
      }
     //tells pc turn is over upong
     casinoWarGame["isTurnsOver"] = true;

      computeWinner();
      showWinner(winner);
    }
    casinoWarGame.pressOnce = true;
  }

  //house button event listiner
  document
    .querySelector("#house-btn")
    .addEventListener("click", househit);

  //checking the winner
  function computeWinner() {
      if (PLAYER["score"] > HOUSE["score"]) {
        winner = PLAYER;
      } else if (PLAYER["score"] < HOUSE["score"]) {
        winner = HOUSE;
      } else if (PLAYER["score"] === HOUSE["score"]) {
        winner = "Draw";
      }
    return winner;
  }

  //add statments if player is winner and give messages with you won or loss
  function showWinner(winner) {
    let message, messageColor;
    if (winner === PLAYER) {
      message = "You Won!!";
      messageColor = "#00e676";
      document.querySelector("#wins").textContent = casinoWarGame["wins"] += 1;
    } else if (winner === HOUSE) {
      message = "House Won";
      messageColor = "red";
      document.querySelector("#losses").textContent = casinoWarGame["losses"] += 1;
    } else if (winner === "Draw") {
      message = "It's a Drew";
      messageColor = "yellow";
      document.querySelector("#draws").textContent = casinoWarGame["draws"] += 1;
    }

    document.querySelector("#results").textContent = message;
    document.querySelector("#results").style.color = messageColor;
  }