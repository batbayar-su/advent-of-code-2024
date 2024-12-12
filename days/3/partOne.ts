const regex = /mul\([0-9]{0,3},[0-9]{0,3}\)/g;

function collectValidInstructions(input: string) {
  return [...input.matchAll(regex)].map((e) => new Instruction(e[0]));
}

class Instruction {
  terms: [number, number];
  operation: string;

  constructor(input: string) {
    const open = input.indexOf('(');
    this.operation = input.slice(0, open);
    const eoFirstTerm = input.indexOf(',', open);
    const firstTerm = parseInt(input.slice(open + 1, eoFirstTerm));
    const lastTerm = parseInt(input.slice(eoFirstTerm + 1, -1));
    this.terms = [firstTerm, lastTerm];
  }

  execute() {
    switch (this.operation) {
      case 'mul':
        return this.terms[0] * this.terms[1];
      default:
        return 0;
    }
  }
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const instructions = collectValidInstructions(input);

  let sum = 0;
  instructions.forEach((instruction) => {
    sum += instruction.execute();
  });

  console.log(sum);
}

await main();
