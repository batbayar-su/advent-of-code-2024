function parseRules(rawRules: string): Record<string, string[]> {
  const array = rawRules.split('\n').map((rule) => rule.split('|'));

  return array.reduce((hash, rule) => {
    if (hash[rule[0]]) {
      hash[rule[0]].push(rule[1]);
    } else {
      hash[rule[0]] = [rule[1]];
    }
    return hash;
  }, {} as Record<string, string[]>);
}

function parseUpdates(rawUpdates: string): string[][] {
  return rawUpdates.split('\n').map((rule) => rule.split(','));
}

function isRightOrder(update: string[], rules: Record<string, string[]>): boolean {
  for (let i = 0; i < update.length - 1; i++) {
    const target = update[i];
    for (let j = i + 1; j < update.length; j++) {
      const against = rules[update[j]];
      if (against?.includes(target)) return false;
    }
  }
  return true;
}

function correctOrder(update: string[], rules: Record<string, string[]>): string[] {
  const corrected = [...update];

  for (let i = 0; i < corrected.length - 1;) {
    const target = corrected[i];
    let madeCorrection = false;
    for (let j = i + 1; j < corrected.length; j++) {
      const against = rules[corrected[j]];
      if (against?.includes(target)) {
        corrected[i] = corrected[j];
        corrected[j] = target;
        madeCorrection = true;
        break;
      }
    }
    if (madeCorrection) {
      continue;
    }
    i++;
  }

  return corrected;
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const [rawRules, rawUpdates] = input.trim().split('\n\n');
  const rules = parseRules(rawRules);
  const updates = parseUpdates(rawUpdates);

  let sumOfMid = 0;

  for (let i = 0; i < updates.length; i++) {
    if (!isRightOrder(updates[i], rules)) {
      const corrected = correctOrder(updates[i], rules);
      const mid = Math.floor(corrected.length / 2);
      sumOfMid += parseInt(corrected[mid]);
    }
  }

  console.log(sumOfMid);
}

await main();
