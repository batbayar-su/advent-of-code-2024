type Equation = [number, number[]];

function testEquation([testValue, numbers]: Equation, total: number, index: number): boolean {
  if (index === numbers.length) {
    return total === testValue;
  }

  const plusR = testEquation([testValue, numbers], total + numbers[index], index + 1);
  const multR = testEquation([testValue, numbers], total * numbers[index], index + 1);
  const concR = testEquation([testValue, numbers], total * Math.pow(10, numbers[index].toString().length) + numbers[index], index + 1);
  return plusR || multR || concR;
}

function sumOfCorrectEquations(equations: Equation[]): number {
  return equations.reduce((sum, equation) => {
    const result = testEquation(equation, 0, 0);
    return sum += result ? equation[0] : 0;
  }, 0);
}

function parseInput(input: string): Equation[] {
  return input.trim().split('\n').map((line) => {
    const [testValue, numbersRaw] = line.split(': ');
    const numbers = numbersRaw.split(' ').map((value) => parseInt(value));
    return [parseInt(testValue), numbers];
  });
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);

  const equations = parseInput(input);

  console.log(sumOfCorrectEquations(equations));
}

await main();
