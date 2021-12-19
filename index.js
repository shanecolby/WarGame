let deckId
const remainingText = document.getElementById("remaining")
const drawCardBtn = document.getElementById("drawCard-btn")
const newDeckBtn = document.getElementById("newDeck-btn")

newDeckBtn.addEventListener("click", function () {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      console.log(data)
      console.log(deckId)
      remainingText.textContent = `Remaining: ${data.remaining}`

    })
})



drawCardBtn.addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("cardContainer").children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/>
      `
      document.getElementById("cardContainer").children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/>
      `
      remainingText.textContent = `Remaining: ${data.remaining}`
      console.log(data)

      const winnerText = determineWinner(data.cards[0], data.cards[1])
      header.textContent = winnerText

      if (data.remaining === 0) {
        drawCardBtn.disabled = true
      }
    })
})

function determineWinner(card1, card2) {
  const cardIndexValues = ["2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"]
  let cardOneValue = cardIndexValues.indexOf(card1.value)
  let cardTwoValue = cardIndexValues.indexOf(card2.value)
  if (cardOneValue > cardTwoValue) {
    return "computer wins"
  } else if (cardOneValue < cardTwoValue) {
    return "you win"
  } else {
    return "tie game"
  }

}

