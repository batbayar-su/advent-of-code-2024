function lookupXmas(matrix: string[][], row: number, col: number): boolean {
  const tl = [matrix?.[row - 1]?.[col - 1], matrix?.[row]?.[col], matrix?.[row + 1]?.[col + 1]].join('');
  const tr = [matrix?.[row - 1]?.[col + 1], matrix?.[row]?.[col], matrix?.[row + 1]?.[col - 1]].join('');
  return ((tl === 'MAS' || tl === 'SAM') && (tr === 'MAS' || tr === 'SAM'))
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const matrix = input.trim().split('\n').map((line) => line.split(''));
  let count = 0;

  for (let row = 1; row < matrix.length - 1; row++) {
    for (let col = 1; col < matrix[row].length - 1; col++) {
      const element = matrix[row]?.[col];
      if (element !== 'A') {
        continue;
      }

      if (lookupXmas(matrix, row, col)) 
        count++
    }
  }

  console.log(count);
}

await main();
