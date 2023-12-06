fetch("day4/input4.txt")
  .then((res) => res.text())
  .then((res) => {
    const array = res.split("\r\n").map((card) => {
      const removeCardNo = card.split(": ")[1];
      return removeCardNo.split(" | ");
    })
    // console.log(array)
    const cardValues = array.map(card => getCardValues(card))
    const result1 = cardValues.reduce((acc, cv) => acc + cv, 0);
    // console.log(result1)
  })
  .catch((e) => console.log(e))

  function getCardValues (card) {
    const winningNums = card[0].split(" ").filter((n) => n !== "");
    const myNums = card[1].split(" ").filter((n) => n !== "");
    let matches = 0;
    myNums.forEach((mn) => {
      winningNums.forEach((wn) => {
        if (mn === wn) matches++
      }) 
    })
    let cardValue = 0;
    for (let i = 1; i <= matches; i++) {
      if (i === 1) cardValue = 1;
      else cardValue = cardValue * 2
    }
    return cardValue
  }