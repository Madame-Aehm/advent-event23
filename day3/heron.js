function splitStr(str, divider) {
  return str.split(divider);
}

const isNumber = (str) => !isNaN(str);
const isStrNumber = (str) => str.match(/[0-9]/i);
const isDot = (str) => str === ".";
const isLetter = (str) => str.match(/[a-z]/i);
const isUndefined = (str) => str === undefined;
const numToStr = (num) => num.toString();
const strToNum = (str) => Number(str);
const isSchematic = (obj) => obj.isSchematic;

const isSymbol = (str) => {
  return !isNumber(str) && !isDot(str) && !isUndefined(str) && !isLetter(str);
};

function add(arr) {
  return arr.reduce((acc, curr) => acc + Number(curr), 0);
}

function updatePeripheralCoordinates(map, y, x) {
  const directions = [
    [0, -1], // west
    [0, 1], // east
    [-1, 0], // north
    [1, 0], // south
    [-1, -1], // northwest
    [-1, 1], // northeast
    [1, -1], // southwest
    [1, 1], // southeast
  ];

  for (let [dy, dx] of directions) {
    let xNum = strToNum(x) + dx;
    let yNum = strToNum(y) + dy;
    let xStr = numToStr(xNum);
    let yStr = numToStr(yNum);
    const value = map.get(`${yStr}:${xStr}`);
    if (value !== undefined) {
      const char = value.char;
      if (isNumber(char)) {
        const key = `${yStr}:${xStr}`;
        map.set(key, { char: char, isSchematic: true });
      }
    }
  }
}

function updateAdjacentNums(map, y, x, dy, dx) {
  let xNum = strToNum(x) + dx;
  let yNum = strToNum(y) + dy;
  let xStr = numToStr(xNum);
  let yStr = numToStr(yNum);

  const currentVal = map.get(`${yStr}:${xStr}`);
  if (!currentVal || !isNumber(currentVal.char)) {
    return;
  }

  map.set(`${yStr}:${xStr}`, { ...currentVal, isSchematic: true });

  updateAdjacentNums(map, yStr, xStr, dy, dx);
}

function createHashMap(matrix) {
  const hashMap = new Map();
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const key = `${y}:${x}`;
      hashMap.set(key, { char: matrix[y][x], isSchematic: false });
    }
  }
  return hashMap;
}

const star5 = async () => {
  return fetch("heron.txt")
    .then((res) => res.text())
    .then((data) => {
      const matrix = splitStr(data, "\n");
      const hashMap = createHashMap(matrix);
      //  ! hashmap.get(`${y}:${x}`)
      hashMap.forEach((value, key) => {
        const char = value.char;
        if (isSymbol(char)) {
          const [y, x] = key.split(":");
          updatePeripheralCoordinates(hashMap, y, x);
        }
      });
      console.log(hashMap);
      const directions = [
        [0, -1], // west
        [0, 1], // east
      ];

      hashMap.forEach((value, key) => {
        if (value.isSchematic) {
          const [y, x] = key.split(":");
          directions.forEach(([dy, dx]) => {
            updateAdjacentNums(hashMap, y, x, dy, dx);
          });
        }
      });

      const completedSchematicArr = [];

      let partialSchematicArr = [];

      hashMap.forEach((value, key) => {
        if (value.isSchematic) {
          const partialSchematic = value.char;
          partialSchematicArr.push(partialSchematic);
        } else {
          if (partialSchematicArr.length === 0) {
            return;
          }
          const concatedSchematic = partialSchematicArr.join("");
          completedSchematicArr.push(concatedSchematic);
          partialSchematicArr = [];
        }
      });
      console.log(completedSchematicArr);

      const sum = add(completedSchematicArr);

      console.log("sum :>> ", sum);

      console.log(hashMap);
    });
};

const updatedMap = star5();