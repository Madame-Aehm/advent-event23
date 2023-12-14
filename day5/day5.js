fetch("day5/input5.txt")
  .then((res) => res.text())
  .then((res) => {
    const map = structure(res);
    console.log(map);

    // const lowestPartOne = getLowestPartOne(map[0], map);
    // console.log(lowestPartOne);

    const part2Seeds = getPart2SeedsLowest(map); //array too big :(
    console.log(part2Seeds);








    // const resultForTestmms = workedForSmallmms(map);
  })
  .catch((e) => console.log(e));

function getPart2SeedsLowest(map) {
  let currentLowest;
  
  // for (let i = 0; i < map[0].length; i = i + 2) {
  //   for (let mapPoint = 1; mapPoint < map.length; mapPoint++) {

  //     const start = map[0][i];
  //     const range = map[0][i + 1];
  
  //     for (let seed = start; seed < start + range; seed++) {
  //       let next = seed;
  //       if (seed === start) {
  //         map[mapPoint].forEach((mm) => {
  //           const rangeStart = mm[1];
  //           const rangeEnd = mm[1] + mm[2];
  //           const difference = rangeStart - mm[0];
  //           if ((seed >= rangeStart) && (seed < rangeEnd)) {
  //             next = seed - difference;
  //           }
  //         })
  //         currentLowest = next
  //       } else {
  //         map[mapPoint].forEach((mm) => {
  //           const rangeStart = mm[1];
  //           const rangeEnd = mm[1] + mm[2];
  //           const difference = rangeStart - mm[0];
  //           if ((seed >= rangeStart) && (seed < rangeEnd)) {
  //             next = seed - difference;
  //           }
  //         })
  //         if (next < currentLowest) currentLowest = next
  //       }
  //     }
  //   }
  //   console.log(currentLowest)
  // }
  
  // return currentLowest
}

function getLowestPartOne(seedsArray, map) {
  const trail = [seedsArray];
  for (let i = 1; i < map.length; i++) {
    trail.push(getNextLevel(trail[i - 1], map[i]))
  }
  const lowest = trail[trail.length-1].sort((a, b) => a - b)[0];
  return lowest
}

function getNextLevel(seedPoints, mapPoint) {
  const nextValues = [];
  seedPoints.forEach((seed) => {
    let next = seed;
    mapPoint.forEach((mm) => {
      const rangeStart = mm[1];
      const rangeEnd = mm[1] + mm[2];
      // let counter = mm[0];
      const difference = rangeStart - mm[0];
      console.log("difference", difference)
      if ((seed >= rangeStart) && (seed < rangeEnd)) {
        // for (let j = rangeStart; j < rangeEnd; j++) {     // first successful attempt - works but is super slow (loops and uses counter)
        //   if (seed === j) next = counter;
        //   counter++
        // }
        next = seed - difference;           // so much simpler lol just take away the difference
      }
    })
    nextValues.push(next)
    console.log(nextValues)
  })
  return nextValues
}

function structure(res) {
  const map = [];
    const array = res.split("\r\n").filter((item) => item !== "");
    let order = 0;
    let lastKey = "";
    array.forEach((item, i) => {
      if (i === 0) map.push(item.split(" ").slice(1).map((seed) => Number(seed)));
      else {
        const isKey = isNaN(Number(item.charAt(0)));
        if (isKey) {
          lastKey = item;
          order++
          map.push([]);
        } else {
          map[order].push(item.split(" ").map((num) => Number(num)))
        }
      }
    })
    return map
}


// first attempt using sample input, but with true input the numbers are too big and it doesn't work
function workedForSmallValues(map) {
  const wholeMap = [map[0]];
  for (let i = 1; i < map.length; i++) {
    wholeMap.push(useIndexForComparison(wholeMap[i - 1], map[i]))
  }
  for (let i = 1; i < wholeMap.length; i++) {
    wholeMap[0].forEach((mm, j) => {
      wholeMap[0][j] = wholeMap[i][mm]
    });
  }
  return wholeMap[0].sort((a, b) => a - b)[0];
}

function useIndexForComparison(array, mapIndex) {
  const highestNumber = [...array].sort((a, b) => a - b)[array.length - 1];
  const values = [...Array.from(Array(highestNumber).keys()), highestNumber];
  mapIndex.forEach((mm) => {
    let counter = mm[0];
    for (let i = mm[1]; i < mm[1] + mm[2]; i++) {
      values.splice(i, 1, counter);
      counter++;
    }
  })
  return values
}