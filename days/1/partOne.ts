const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
const lines = input.trim().split('\n');
const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
  const [one, two] = line.split('   ');
  left.push(parseInt(one));
  right.push(parseInt(two));
}

left.sort();
right.sort();

let result = 0;
for (let i = 0; i < left.length; i++) {
  result += Math.abs(left[i] - right[i]);
}

console.log(result);
