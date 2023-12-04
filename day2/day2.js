fetch("input2.txt")
  .then((res) => res.text())
  .then((res) => {
    const colours = ["red", "green", "blue"];
    const games = parseData(res, colours);
    // const result = getValidGameIds(games);
    const result = getPowers(games, colours);
    const total = result.reduce((acc, cv) => acc + cv, 0);
    console.log(total);
  })
  .catch((e) => console.log(e));


function parseData(res, colours) {
  const array = res.split("Game");
    array.shift()
    const games = array.map((g) => {
      const bags = g.slice(4).split("; ").map((b) => b.split(","));
      const objectified = bags.map((bag) => {
        const object = { red: 0, green: 0, blue:0 };
        bag.forEach((item) => {
          colours.forEach((colour) => {
            if (item.includes(colour)) object[colour] = Number(item.slice(0, item.indexOf(colour)-1));
          })
        })
        return object
      })
      return objectified
    });
    return games
}

function getValidGameIds (games) {
  const ids = [];
  for (let i = 0; i < games.length; i++) {
    let isValid = true
    for (let j = 0; j < games[i].length; j++) {
      if (games[i][j].red > 12 || games[i][j].green > 13 || games[i][j].blue > 14) isValid = false;
    }
    if (isValid) ids.push(i + 1);
  }
  return ids;
}

function getPowers (games, colours) {
  const powers = games.map((game) => {
    const lowest = { blue: 0, red: 0, green: 0 };
    game.forEach((bag) => {
      colours.forEach((colour) => {
        if (bag[colour] > lowest[colour]) lowest[colour] = bag[colour];
      })
    })
    return lowest.blue * lowest.red * lowest.green;
  });
  return powers
}