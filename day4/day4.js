fetch("day4/smallerInput.txt")
  .then((res) => res.text())
  .then((res) => {
    const array = res.split("\r\n").map((card) => {
      const removeCardNo = card.split(": ")[1];
      return removeCardNo.split(" | ");
    })
    // console.log(array)
    const cards = array.map((card, i) => { 
      const cardMatches = getMatches(card)
      return { matches: cardMatches, instanceCount: 1 }
    });
    console.log(cards);
    cards.forEach((m, i) => {
      for (let j = i + 1; j < i+1+m.matches; j++) {
        cards[j].instanceCount++
      }
    })
    console.log(cards)
    const result = cards.map((c) => c.instanceCount).reduce((acc, cv) => acc + cv, 0);
    console.log(result);
    // part 2 incomplete



    const cardValues = array.map(card => getCardValues(card))
    const result1 = cardValues.reduce((acc, cv) => acc + cv, 0);
  })
  .catch((e) => console.log(e))

function getCardValues (card) {
  const matches = getMatches(card);
  let cardValue = 0;
  for (let i = 1; i <= matches; i++) {
    if (i === 1) cardValue = 1;
    else cardValue = cardValue * 2
  }
  return cardValue
}

function getMatches (card) {
  const winningNums = card[0].split(" ").filter((n) => n !== "");
  const myNums = card[1].split(" ").filter((n) => n !== "");
  let matches = 0;
  myNums.forEach((mn) => {
    winningNums.forEach((wn) => {
      if (mn === wn) matches++
    }) 
  })
  return matches
}

