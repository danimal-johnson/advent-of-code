/*
Day 7: No Space Left On Device

Description:
* Given a shell output, figure out which files can be deleted to free up space.

Input:
* A text file (aoc2022_07.txt) with shell output.
* Lines that start with "$" are commands. Ex: "$ cd /" means the directory was changed to "/"
* Lines that start with "dir" indicate directories. Ex: "dir reindeer" means there is a directory named "reindeer"
* Lines that start with a number indicate the size of a file. Ex: "10000 dasher.log" means there is a 10000 byte file named "dasher.log"

*/

import { readFileSync } from 'fs';
import { join } from 'path';

let rawData = readFileSync(join(__dirname, './aoc2022_07.txt'), 'utf8');
// let rawData = readFileSync(join(__dirname, './day07ex.txt'), 'utf8');
let lines = rawData.split('\n');

// --------------- Data Structures ----------------
class DataFile { // The name "File" is reserved
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Dir {
  name: string;
  sizeOfFiles: number;
  sizeOfSubdirs: number;
  subdirs: Dir[];
  files: DataFile[];
  parent: Dir | null;

  constructor(name: string, parent: Dir | null) {
    this.name = name;
    this.sizeOfFiles = 0;
    this.sizeOfSubdirs = 0;
    this.files = [];
    this.subdirs = [];
    this.parent = parent;
  }

  addFile(file: DataFile) {
    this.files.push(file);
    this.sizeOfFiles += file.size;
    if (this.parent !== null) this.parent.updateSubdirSize(file.size);
  }

  addSubdir(directory: Dir) {
    this.subdirs.push(directory);
  }

  getSize() {
    return this.sizeOfFiles + this.sizeOfSubdirs;
  }

  updateSubdirSize(size: number) {
    this.sizeOfSubdirs += size;
    if (this.parent !== null) this.parent.updateSubdirSize(size);
  }
}

// --------------- Parsing ----------------

const parseLine = (line: string) => {
  const [command, ...rest] = line.split(' ');
  if (command === '$') {
    if (rest[0] === 'cd') return { command: 'cd', path: rest.slice(1).join(' ')};
    if (rest[0] === 'ls') return { command: 'ls'};
  }
  if (command === 'dir') return { command: 'dir', path: rest.join(' ') };
  // Else: it's a file
  const [name] = rest;
  return { command: 'file', size: Number(command), name: rest[0] };
};

const root = new Dir( "/", null);

const parseShellOutput = (lines: string[]) => {
  let currentDir: any = root;
  lines.forEach((line) => {
    const { command, path, name, size } = parseLine(line);
    switch(command) {
      case 'cd':
        if (path === '/') {
          currentDir = root;
          break;
        }
        if (path === '..') {
          currentDir = currentDir.parent;
          if (currentDir === null) currentDir = root;
          break;
        }
        // console.log('cd', path);
        currentDir = currentDir.subdirs.find((dir) => dir.name === path);
        // console.log('Switched to dir:', currentDir.name);
        break;
      case 'dir':
        // console.log('Creating dir:', path);
        const newDir = new Dir(path || "", currentDir);
        currentDir.addSubdir(newDir);
        break;
      case 'file':
        // console.log('file', name, size);
        const newFile = new DataFile(name || "" , size || 0);
        currentDir.addFile(newFile);
        break;
      case 'ls':
        break; // Do nothing
      case 'default':
        console.log('Not implemented');
        break;
      }
  });
};

parseShellOutput(lines);

// --------------- Solving ----------------

// Part 1: Find the total size of all directories under 100,000 bytes
// * Sizes include the size of all files and subdirectories
// * Files may be counted more than once if their parent directories are small enough.
// * Part 1 solution = 1,141,028

const dirsUnderMaxSize = (dir: Dir, maxSize: number, sum: number=0) => {
  dir.subdirs.forEach((dir) => {
    sum = dirsUnderMaxSize(dir, maxSize, sum);
    if (dir.getSize() <= maxSize) sum += dir.getSize();
  });
  return sum;
}

console.log ('Part 1 solution:', dirsUnderMaxSize(root, 100_000)); //?

// Part 2: Find the smallest directory to delete that will free up enough space for the update.
// * Total space available on device is 70,000,000 bytes
// * The update requires 30,000,000 bytes
// * The update will fail if there is not enough space to install the update
// * Part 2 solution = 8,278,005

const TOTAL_MEMORY_SIZE = 70_000_000;
const MIN_SPACE_NEEDED = 30_000_000;
const spaceAvailable = TOTAL_MEMORY_SIZE - root.getSize(); //?
const minSizeToDelete = MIN_SPACE_NEEDED - spaceAvailable; //?

console.log(`Need to free up ${minSizeToDelete} bytes`);

const smallestDirOverMinSize = (dir: Dir, minNeeded: number, minFound: number = TOTAL_MEMORY_SIZE) => {
  let currentSize = dir.getSize();
  if (currentSize >= minNeeded && currentSize < minFound) minFound = currentSize;
  dir.subdirs.forEach((dir) => {
    let submin = smallestDirOverMinSize(dir, minNeeded, minFound);
    if (submin < minFound) minFound = submin;
  });
  return minFound;
}

console.log('Part 2 solution:', smallestDirOverMinSize(root, minSizeToDelete)); //?
