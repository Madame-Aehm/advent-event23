const input = {
  time: [61, 67, 75, 71],
  distance: [430, 1036, 1307, 1150],
}

function findAnswer1 () {
  const all = [];
  input.time.forEach((time, i) => {
    const ways = getRaceWays(time, input.distance[i])
    all.push(ways);
  })
  const result = all.reduce((acc, cv) => acc * cv, 1);
  console.log(result);
}

function findAnswer2 () {
  const fullTime = input.time.join("");
  const fullDistance = input.distance.join("");
  console.log(fullTime, fullDistance);
  // let ways = 0;
  // for (let i = 0; i < fullTime; i++) {
  //   const hold = i;
  //   const run = fullTime - i;
  //   if ((run * hold) > fullDistance) {
  //     ways++
  //   }
  // }
  const ways = getRaceWays(fullTime, fullDistance);
  console.log(ways);
}

function getRaceWays (time, distance) {
  let ways = 0;
  for (let i = 0; i < time; i++) {
    const hold = i;
    const run = time - i;
    if (run * hold > distance) {
      ways++
    }
  }
  return ways
}

findAnswer1();
findAnswer2();