function checkReport(diff: number, increment: boolean): boolean {
  if (diff === 0) return false;
  if (increment && diff < 0) return false;
  if (!increment && diff > 0) return false;
  if (Math.abs(diff) > 3) return false;

  return true;
}

function validateReports(reports: number[]): boolean {
  const increment = reports[1] - reports[0] > 0;

  for (let i = 0; i < reports.length - 1; i++) {
    const diff = reports[i + 1] - reports[i];
    if (!checkReport(diff, increment)) {
      return false;
    }
  }

  return true;
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const lines = input.trim().split("\n");

  let result = 0;
  for (const line of lines) {
    const reports = line.split(" ").map((r) => parseInt(r));

    if (validateReports(reports)) result++;
  }

  console.log(result);
}

await main();
