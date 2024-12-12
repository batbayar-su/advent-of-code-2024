function collectValidRanges(input: string) {
  const ranges = [];
  let rangeStart = 0;
  let rangeEnd = 0;
  while (rangeEnd !== -1) {
    if (rangeEnd !== 0) {
      rangeStart = input.indexOf('do()', rangeEnd);
      if (rangeStart === -1) break;
      rangeStart += 4;
    }
    rangeEnd = input.indexOf("don't()", rangeStart);
    if (rangeEnd === -1) {
      ranges.push(input.slice(rangeStart));
    } else {
      ranges.push(input.slice(rangeStart, rangeEnd));
    }
  }
  return ranges;
}

const operationRegex = /mul\([0-9]{0,3},[0-9]{0,3}\)/g;
function collectInstructionsInRange(input: string): Instruction[] {
  return [...input.matchAll(operationRegex)].map((e) => new Instruction(e[0]));
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
  const ranges = collectValidRanges(input);
  const instructions = ranges.map((range) => collectInstructionsInRange(range)).flat();

  let sum = 0;
  instructions.forEach((instruction) => {
    sum += instruction.execute();
  });

  console.log(sum);
}

await main();
