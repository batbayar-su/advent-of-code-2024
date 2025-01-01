function calculateChecksum(disk: number[]): number {
  return disk.reduce((checksum, fileId, index) => {
    if (fileId === -1) {
      return checksum;
    }

    return checksum + index * fileId;
  }, 0);
}

function defragment(disk: number[]): number[] {
  const defragmented = [...disk];
  let i = 0, j = disk.length - 1;

  while (i < j) {
    if (defragmented[i] !== -1) {
      i++;
    } else if (defragmented[j] === -1) {
      j--;
    } else {
      defragmented[i] = defragmented[j];
      defragmented[j] = -1;
      i++;
      j--;
    }
  }

  return defragmented;
}

function diskmapToDisk(diskmap: string): number[] {
  const disk = [];
  for (let i = 0; i < diskmap.length; i++) {
    const number = parseInt(diskmap[i]);
    const id = Math.floor(i / 2);
    const isFile = i % 2 === 0;
    for (let j = 0; j < number; j++) {
      disk.push(isFile ? id : -1);
    }
  }
  return disk;
}

async function main() {
  const diskmap = await Deno.readTextFile(`${import.meta.dirname}/input.txt`);
  const disk = diskmapToDisk(diskmap);
  const defragmented = defragment(disk);
  const checksum = calculateChecksum(defragmented);
  console.log(checksum);
}

await main();
