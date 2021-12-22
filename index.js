let deckId
let computerScore = 0
let myScore = 0
const remainingText = document.getElementById("remaining")
const drawCardBtn = document.getElementById("drawCard-btn")
const newDeckBtn = document.getElementById("newDeck-btn")
const compScoreEl = document.getElementById("computerScore")
const myScoreEl = document.getElementById("myScore")
const resetBtn = document.getElementById("reset")
const cardContainer = document.getElementById("cardContainer")



newDeckBtn.addEventListener("click", function () {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      console.log(data)
      console.log(deckId)
      remainingText.textContent = `Remaining: ${data.remaining}`
      drawCardBtn.disabled = false



    })
  // startGame()
})
startGame()

function startGame() {
  drawCardBtn.addEventListener("click", function () {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json())
      .then(data => {
        cardContainer.children[0].innerHTML = `
          <img src=${data.cards[0].image} class="card"/>
        `
        cardContainer.children[1].innerHTML = `
          <img src=${data.cards[1].image} class="card"/>
        `
        remainingText.textContent = `Remaining: ${data.remaining}`
        console.log(data)

        const winnerText = determineWinner(data.cards[0], data.cards[1])
        header.textContent = winnerText
        myScoreEl.innerHTML = `My Score: ${myScore}`
        compScoreEl.innerHTML = `Computer Score: ${computerScore}`


        if (data.remaining === 0) {
          drawCardBtn.disabled = true
          if (computerScore > myScore) {
            header.textContent = "I'm sorry, you lost!"
          } else if (computerScore < myScore) {
            header.textContent = "congrats! You won the game!"
          } else {
            header.textContent = "tie game"
          }
          endGame();
        }
      })
  })

  function determineWinner(card1, card2) {
    const cardIndexValues = ["2", "3", "4", "5", "6", "7", "8", "9",
      "10", "JACK", "QUEEN", "KING", "ACE"]
    let cardOneValue = cardIndexValues.indexOf(card1.value)
    let cardTwoValue = cardIndexValues.indexOf(card2.value)
    if (cardOneValue > cardTwoValue) {
      computerScore++;
      return "The computer won this hand"
    } else if (cardOneValue < cardTwoValue) {
      myScore++;
      return "You won this hand!"
    } else {
      return "tie game"
    }


  }






}

// resetBtn.addEventListener("click", function () {
//   console.log("click")
//   compScoreEl.textContent = "hello"
// })

function endGame() {
  resetBtn.addEventListener("click", function () {
    console.log("click")
    // compScoreEl.textContent = `Computer Score: `
    // myScoreEl.textContent = `My Score: `
    header.textContent = "WAR!"
    cardContainer.innerHTML = ""
    resetGame()
  })

}

function resetGame() {
  endGame();
}




// Build off below
// function initNewGame(){
//   // setup game vars and cards
// }

// function endGame(){
//   // clean game vars and remove cards
// }

// function newOrReset(){
//   endGame();
//   initNewGame();
// }   