function checkReport(reports: number[]): boolean {
  const increment = reports[1] - reports[0] > 0;
  for (let i = 1; i < reports.length; i++) {
    const diff = Math.abs(reports[i] - reports[i - 1]);
    if (
      diff < 1 ||
      diff > 3 ||
      (increment && reports[i] < reports[i - 1]) ||
      (!increment && reports[i] > reports[i - 1])
    ) {
      return false;
    }
  }

  return true;
}

function validateReports(reports: number[]): boolean {
  if (checkReport(reports)) {
    return true;
  }

  for (let i = 0; i < reports.length; i++) {
    const dampened = [...reports.slice(0, i), ...reports.slice(i + 1)];
    if (checkReport(dampened)) {
      return true;
    }
  }

  return false;
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
