let numHasBeenAdded;

fetch("input3.txt")
  .then((res) => res.text())
  .then((res) => {
    const structured = res.split("\r\n").map((row) => structureData(row.split("")));
    // secondPart(structured);

    const result1 = firstPart(structured);
    console.log(result1);
  })
  .catch((e) => console.log(e));

function secondPart (structured) {
  console.log(structured);
  structured.forEach((row, i) => {
    row.symbols.forEach((symbol) => {
      if (symbol.value === "*") {
        const allFoundNums = [];
        const gearIndex = symbol.index;

        // check for same row matches
        row.nums.forEach((num) => {
          if ((num.indexes[0] - 1 === gearIndex) || (num.indexes[num.indexes.length - 1] + 1 === gearIndex)) allFoundNums.push(num.value);
        })

        // check for prev row matches
        const prevRow = structured[i - 1];
        prevRow.nums.forEach((prevNum) => {
          for (let j = 0; j < prevNum.indexes.length; j++) {
            if ((prevNum.indexes[j] - 1 === gearIndex)
              || (prevNum.indexes[j] + 1 === gearIndex)
              || (prevNum.indexes[j] === gearIndex)) {
                allFoundNums.push(prevNum.value);
                break;
              }
          }
        })
        console.log(allFoundNums)




      }
    })
  })
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

// 550934