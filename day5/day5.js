fetch("day5/input5.txt")
  .then((res) => res.text())
  .then((res) => {
    const map = structure(res);
    console.log(map);
    const seeds = map[0].sort((a,b) => a - b)
    const allSeeds = [];
    
  })
  .catch((e) => console.log(e))

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