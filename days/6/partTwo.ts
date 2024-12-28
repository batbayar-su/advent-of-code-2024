type GuardLoc = [number, number];
enum Direction {
  'up',
  'right',
  'down',
  'left',
}

const GUARD = '^' as const;
const OBSTACLE = '#' as const;
let TOUCH_MAP: Record<string, number> = {};

function findGuardLocation(map: string[][]): GuardLoc | undefined {
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    const guardIndex = row.indexOf(GUARD);
    if (guardIndex !== -1) return [i, guardIndex];
  }
}

function moveToNext(guardLoc: GuardLoc, direction: Direction): GuardLoc {
  switch (direction) {
    case Direction.up:
      return [guardLoc[0] - 1, guardLoc[1]];
    case Direction.right:
      return [guardLoc[0], guardLoc[1] + 1];
    case Direction.down:
      return [guardLoc[0] + 1, guardLoc[1]];
    case Direction.left:
      return [guardLoc[0], guardLoc[1] - 1];
    default:
      throw new Error('direction is unknown');
  }
}

function turnGuard(direction: Direction): Direction {
  switch (direction) {
    case Direction.up:
      return Direction.right;
    case Direction.right:
      return Direction.down;
    case Direction.down:
      return Direction.left;
    case Direction.left:
      return Direction.up;
    default:
      throw new Error('direction is unknown');
  }
}

function isGuardInBoundary(nextLoc: GuardLoc, map: string[][]): boolean {
  const rowLimit = map.length;
  const colLimit = map[0].length;
  return (nextLoc[0] > -1 && nextLoc[0] < rowLimit) && (nextLoc[1] > -1 && nextLoc[1] < colLimit);
}

function isObstacle(nextLoc: GuardLoc, map: string[][]): boolean {
  return map[nextLoc[0]][nextLoc[1]] === OBSTACLE;
}

function isGuardMoveable(nextLoc: GuardLoc, map: string[][]): boolean {
  return (
    isGuardInBoundary(nextLoc, map) &&
    !isObstacle(nextLoc, map)
  );
}

function isMapLoopable(guardLoc: GuardLoc, map: string[][]) {
  let direction = Direction.up;

  while (isGuardInBoundary(guardLoc, map)) {
    let nextLoc = moveToNext(guardLoc, direction);
    while (isGuardMoveable(nextLoc, map)) {
      guardLoc = nextLoc;
      nextLoc = moveToNext(guardLoc, direction);
    }

    if (!isGuardInBoundary(nextLoc, map)) return false;
    if (isObstacle(nextLoc, map)) {
      TOUCH_MAP[`${guardLoc[0]}-${guardLoc[1]}`] = (TOUCH_MAP[`${guardLoc[0]}-${guardLoc[1]}`] || 0) + 1;
      if (TOUCH_MAP[`${guardLoc[0]}-${guardLoc[1]}`] > 3) {
        return true;
      }
    }

    direction = turnGuard(direction);
  }
}

function findGuardLoops(map: string[][]) {
  const guardLoc = findGuardLocation(map);
  if (!guardLoc) throw new Error('guard location unknown');

  let counter = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === OBSTACLE || map[row][col] === GUARD) continue;

      const cloned = JSON.parse(JSON.stringify(map)) as string[][];
      cloned[row][col] = OBSTACLE;
      TOUCH_MAP = {};
      if (isMapLoopable(guardLoc, cloned)) counter++;
    }
  }

  return counter;
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const map = input.trim().split('\n').map((row) => row.split(''));

  console.log(findGuardLoops(map));
}

await main();
