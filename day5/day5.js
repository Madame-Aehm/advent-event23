fetch("day5/input5.txt")
  .then((res) => res.text())
  .then((res) => {
    const map = structure(res);
    console.log(map);

    // const lowestPartOne = getLowestPartOne(map[0], map);
    // console.log(lowestPartOne);

    // const resultForTestmms = workedForSmallmms(map);
    console.log(getPart2(map)); 

  })
  .catch((e) => console.log(e));

function getPart2(map) {
  let currentLowest = getSingleSeedLocation(map[0][0], map);
  // const low1 = map[0][0] + 1;
  // const range1 = map[0][1];

  // for (let i = low1; i < low1 + range1; i++) {
  //   const location = getSingleSeedLocation(i, map);
  //   if (location < currentLowest) currentLowest = location;
  // }

  // const low2 = map[0][2];
  // const range2 = map[0][3];
  // for (let i = low2; i < low2 + range2; i++) {
  //   const location = getSingleSeedLocation(i, map);
  //   if (location < currentLowest) currentLowest = location;
  // }
  return currentLowest
}

// function returnLowestFromRange (low, range) {

// }

function getSingleSeedLocation(seed, map) {
  let next = seed;
  for (let i = 1; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const rangeStart = map[i][j][1];
      const rangeEnd = map[i][j][1] + map[i][j][2] - 1;
      const difference = rangeStart - map[i][j][0];
      if ((next >= rangeStart) && (next <= rangeEnd)) {
        next = next - difference;
        break;
      }
    }
  }
  return next
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