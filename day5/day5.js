// fetch("day5/input5.txt")
//   .then((res) => res.text())
//   .then((res) => {
//     console.log(res)
//     const map = structure(res);
//     console.log(map);

//     const lowestPartOne = getLowestPartOne(map[0], map);
//     console.log("!!!",lowestPartOne)
   
//     const lowestPartTwo = getLowestPartTwo(lowestPartOne, map);

//     // const resultForTestmms = workedForSmallmms(map);
//     // console.log(getPart2(map)); 

//   })
//   .catch((e) => console.log(e));

// had to resort to Node to run the function......
import fs from 'fs';

function start () {
  try {
    const data = fs.readFileSync('input5.txt', 'utf-8');
    const res = data.toString();
    const map = structure(res);
    const lowestPartOne = getLowestPartOne(map[0], map);
    console.log("!!!",lowestPartOne)
    const lowestPartTwo = getLowestPartTwo(lowestPartOne, map);
    console.log(lowestPartTwo);
  } catch (e) {
    console.log(e);
  }
}

start()

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
  const lowest = seedsArray.map((seed) => getSingleSeedLocation(seed, map)).sort((a, b) => a - b)[0];
  return lowest
}

function getLowestPartTwo(current, map) {
  let currentLowest = current;
  console.log("currentLowest", currentLowest);
  for (let i = 0; i < map[0].length; i = i + 2) {
    const low = map[0][i];
    const range = map[0][i + 1];
    console.log("start", low, "end", low + range);
    
    for (let seed = low; seed < low + range; seed++) {
      const location = getSingleSeedLocation(seed, map);
      if (location < currentLowest) currentLowest = location;
    }
  }
  return currentLowest
}





// function getNextLevel(seedPoints, map, mapPoint) {
//   const nextValues = [];
//   seedPoints.forEach((seed) => {
//     // let next = seed;
//     // mapPoint.forEach((mm) => {
//     //   const rangeStart = mm[1];
//     //   const rangeEnd = mm[1] + mm[2];
//     //   // let counter = mm[0];
//     //   const difference = rangeStart - mm[0];
//     //   console.log("difference", difference)
//     //   if ((seed >= rangeStart) && (seed < rangeEnd)) {
//     //     // for (let j = rangeStart; j < rangeEnd; j++) {     // first successful attempt - works but is super slow (loops and uses counter)
//     //     //   if (seed === j) next = counter;
//     //     //   counter++
//     //     // }
//     //     next = seed - difference;           // so much simpler lol just take away the difference
//     //   }
//     // })
//     // nextValues.push(next)
//     // console.log(nextValues)
//     nextValues.push(getSingleSeedLocation(seed, map));
//   })
//   return nextValues
// }




// // first attempt using sample input, but with true input the numbers are too big and it doesn't work
// function workedForSmallValues(map) {
//   const wholeMap = [map[0]];
//   for (let i = 1; i < map.length; i++) {
//     wholeMap.push(useIndexForComparison(wholeMap[i - 1], map[i]))
//   }
//   for (let i = 1; i < wholeMap.length; i++) {
//     wholeMap[0].forEach((mm, j) => {
//       wholeMap[0][j] = wholeMap[i][mm]
//     });
//   }
//   return wholeMap[0].sort((a, b) => a - b)[0];
// }

// function useIndexForComparison(array, mapIndex) {
//   const highestNumber = [...array].sort((a, b) => a - b)[array.length - 1];
//   const values = [...Array.from(Array(highestNumber).keys()), highestNumber];
//   mapIndex.forEach((mm) => {
//     let counter = mm[0];
//     for (let i = mm[1]; i < mm[1] + mm[2]; i++) {
//       values.splice(i, 1, counter);
//       counter++;
//     }
//   })
//   return values
// }