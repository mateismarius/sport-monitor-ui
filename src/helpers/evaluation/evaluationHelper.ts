export function getAllNames() {
  return "test";
}

export function getRandomColors(n: number) {
  var colors: string[] = [];
  while (colors.length < n) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (colors.indexOf(color.toString()) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }
  return colors;
}

export function ConvertToArrayWithDistinctValues(a: string[]) {
    return Array.from(new Set(a));
 }