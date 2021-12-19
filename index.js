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

      if (data.remaining === 0) {
        drawCardBtn.disabled = true
      }
    })
})

