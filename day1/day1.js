fetch("input1.txt")
  .then((res) => res.text())
  .then((res) => {
    // console.log(res);
    const full = [];
    res.split("\r\n").forEach((entry) => {
      full.push(findValues(entry));
    })
    // console.log(full);
    const result = full.reduce((acc, cv) => acc + cv, 0);
    console.log("reduced", result)
  })
  .catch((e) => console.log(e));


const findValues = (string) => {
  const numNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const present = [];
  numNames.forEach((nn, i) => {
    if (string.indexOf(nn) !== -1) present.push({ value: (i + 1).toString(), index: string.indexOf(nn) });
    if (string.lastIndexOf(nn) !== -1) present.push({ value: (i + 1).toString(), index: string.lastIndexOf(nn) });
  })
  string.split("").forEach((ch, i) => {
    if (!isNaN(Number(ch))) {
      present.push({ value: ch, index: i })
    }
  })
  present.sort((a,b) => a.index-b.index);
  return Number(present[0].value + present[present.length - 1].value);
}