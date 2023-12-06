let numHasBeenAdded;

fetch("day3/input3.txt")
  .then((res) => res.text())
  .then((res) => {
    const structured = res.split("\n").map((row) => structureData(row.split("")));
    const result1 = firstPart(structured);
    const result2 = secondPart(structured);
    console.log(result1, result2);
  })
  .catch((e) => console.log(e));

function secondPart (structured) {
  let gearRatios = [];
  structured.forEach((row, i) => {
    row.symbols.forEach((symbol) => {
      if (symbol.value === "*") {
        const touchingNums = [];
        const gearIndex = symbol.index;
        row.nums.forEach((num) => {
          if ((num.indexes[0] - 1 === gearIndex) || (num.indexes[num.indexes.length - 1] + 1 === gearIndex)) touchingNums.push(Number(num.value));
        })
        compareRowForGear (structured[i - 1], gearIndex, touchingNums)
        compareRowForGear (structured[i + 1], gearIndex, touchingNums)
        if (touchingNums.length === 2) {
          gearRatios.push(touchingNums[0] * touchingNums[1]);
        }
      }
    })
  })
  return gearRatios.reduce((agg, cv) => agg + cv, 0);
}


function firstPart (structured) {
  const sums = structured.map((row, i) => findPartNums(row, structured[i - 1], structured[i + 1]))
  return sums.reduce((acc, cv) => acc + cv, 0);
}

function structureData (array) {
  const symbols = [];
  const nums = [];
  let numValue = "";
  let indexArray = [];
  array.forEach((item, i) => {
    if (item !== ".") {
      if (isNaN(Number(item))) symbols.push({ value: item, index: i });
      else {
        numValue = numValue + item;
        indexArray.push(i);
        if (array[i + 1] === "." || isNaN(Number(array[i + 1])) ) {
          nums.push({ value: numValue, indexes: indexArray });
          numValue = "";
          indexArray = [];
        }
      }
    }
  })
  return { symbols, nums }
}

function findPartNums (row, rowBefore, rowAfter) {
  const partNums = [];
  for (let i = 0; i < row.nums.length; i++) {
    numHasBeenAdded = false;
    for (let j = 0; j < row.nums[i].indexes.length; j++) {
      if (numHasBeenAdded) break;
      compareSelf(row, partNums, i, j);
      if (rowBefore && !numHasBeenAdded) compareRows(row, rowBefore, partNums, i, j);
      if (rowAfter && !numHasBeenAdded) compareRows(row, rowAfter, partNums, i, j);
    }
  }
  return partNums.reduce((acc, cv) => acc + cv, 0);
}

function compareSelf (row, partNums, i, j) {
  for (let k = 0; k < row.symbols.length; k++) {
    if ((row.symbols[k].index === (row.nums[i].indexes[j] - 1)) || (row.symbols[k].index === (row.nums[i].indexes[j] + 1))) {
      partNums.push(Number(row.nums[i].value))
      numHasBeenAdded = true;
      break;
    }
  }
}

function compareRows (row, compareRow, partNums, i, j) {
  for (let k = 0; k < compareRow.symbols.length; k++) {
    if ((compareRow.symbols[k].index === (row.nums[i].indexes[j] - 1)) 
      || (compareRow.symbols[k].index === (row.nums[i].indexes[j] + 1))
      || (compareRow.symbols[k].index === row.nums[i].indexes[j])
    ) {
      partNums.push(Number(row.nums[i].value));
      numHasBeenAdded = true;
      break;
    }
  }
}

function compareRowForGear (compareRow, gearIndex, touchingNums) {
  compareRow.nums.forEach((compareNum) => {
    for (let j = 0; j < compareNum.indexes.length; j++) {
      if ((compareNum.indexes[j] - 1 === gearIndex)
        || (compareNum.indexes[j] + 1 === gearIndex)
        || (compareNum.indexes[j] === gearIndex)) {
          touchingNums.push(Number(compareNum.value));
          break;
        }
    }
  })
}

// 550934
// 81997870


// heron
// 543867
// 79613331