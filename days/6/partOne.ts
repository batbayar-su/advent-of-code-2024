const GUARD = '^' as const;
const OBSTACLE = '#' as const;
type GuardLoc = [number, number];
enum Direction {
  'up',
  'right',
  'down',
  'left',
}

function findGuardLocation(map: string[]): GuardLoc | undefined {
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

function isGuardInBoundary(nextLoc: GuardLoc, map: string[]): boolean {
  const rowLimit = map.length;
  const colLimit = map[0].length;
  return (nextLoc[0] > -1 && nextLoc[0] < rowLimit) && (nextLoc[1] > -1 && nextLoc[1] < colLimit);
}

function isGuardMoveable(nextLoc: GuardLoc, map: string[]): boolean {
  return (
    isGuardInBoundary(nextLoc, map) &&
    map[nextLoc[0]][nextLoc[1]] !== OBSTACLE
  );
}

function traceGuardPath(map: string[], pathRecord: Set<string>) {
  let direction = Direction.up;
  let guardLoc = findGuardLocation(map);
  if (!guardLoc) throw new Error('guard location unknown');

  while (isGuardInBoundary(guardLoc, map)) {
    let nextLoc: GuardLoc = [...guardLoc];
    while (isGuardMoveable(nextLoc, map)) {
      guardLoc = nextLoc;
      pathRecord.add(guardLoc.join('|'));
      nextLoc = moveToNext(guardLoc, direction);
    }

    if (!isGuardInBoundary(nextLoc, map)) return;

    direction = turnGuard(direction);
    guardLoc = moveToNext(guardLoc, direction);
  }
}

async function main() {
  const input = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const map = input.trim().split('\n');
  const pathRecord = new Set<string>();

  traceGuardPath(map, pathRecord);

  console.log(pathRecord.size);
}

await main();
