function lookupXmas(matrix: string[][], row: number, col: number) {
  const r = [matrix?.[row]?.[col], matrix?.[row]?.[col + 1], matrix?.[row]?.[col + 2], matrix?.[row]?.[col + 3]].join('');
  const l = [matrix?.[row]?.[col], matrix?.[row]?.[col - 1], matrix?.[row]?.[col - 2], matrix?.[row]?.[col - 3]].join('');
  const d = [matrix?.[row]?.[col], matrix?.[row + 1]?.[col], matrix?.[row + 2]?.[col], matrix?.[row + 3]?.[col]].join('');
  const u = [matrix?.[row]?.[col], matrix?.[row - 1]?.[col], matrix?.[row - 2]?.[col], matrix?.[row - 3]?.[col]].join('');
  const dr = [matrix?.[row]?.[col], matrix?.[row + 1]?.[col + 1], matrix?.[row + 2]?.[col + 2], matrix?.[row + 3]?.[col + 3]].join('');
  const dl = [matrix?.[row]?.[col], matrix?.[row + 1]?.[col - 1], matrix?.[row + 2]?.[col - 2], matrix?.[row + 3]?.[col - 3]].join('');
  const ur = [matrix?.[row]?.[col], matrix?.[row - 1]?.[col + 1], matrix?.[row - 2]?.[col + 2], matrix?.[row - 3]?.[col + 3]].join('');
  const ul = [matrix?.[row]?.[col], matrix?.[row - 1]?.[col - 1], matrix?.[row - 2]?.[col - 2], matrix?.[row - 3]?.[col - 3]].join('');
  const array = [r, l, d, u, dr, dl, ur, ul];
  return array.reduce((t, e) => {
    t += e === 'XMAS' ? 1 : 0;
    return t;
  }, 0);
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const matrix = input.trim().split('\n').map((line) => line.split(''));
  let count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const element = matrix[row]?.[col];
      if (element !== 'X') {
        continue;
      }

      count += lookupXmas(matrix, row, col);
    }
  }

  console.log(count);
}

await main();
