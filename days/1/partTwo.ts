const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
const lines = input.trim().split('\n');
const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
  const [one, two] = line.split('   ');
  left.push(parseInt(one));
  right.push(parseInt(two));
}

const cache: Record<number, number> = {};

function countOccurances(find: number, list: number[]) {
  const found = list.filter((target) => find === target);
  return found.length;
}

let result = 0;
for (let i = 0; i < left.length; i++) {
  const seed = left[i];

  let acc = cache[seed];
  if (!acc) {
    acc = countOccurances(seed, right);
    cache[seed] = acc;
  }

  result += seed * acc;
}

console.log(result);
