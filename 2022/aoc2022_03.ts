/*
Day 3: Rucksack Reorganization

Description:
* Rucksacks have two compartments.
* There are an equal number of items in each compartment
* Items are represented by a single letter.
* Items have priorities: a-z = 1-26, A-Z = 27-52

Input:
* A text file (aoc2022_03.txt) with one line per rucksack.
* The 1st half of each line = the 1st compartment's items.
* The 2nd half of each line = the 2nd compartment's items.

*/
import { readFileSync } from 'fs';
import { join } from 'path';

let rawData = readFileSync(join(__dirname, './aoc2022_03.txt'), 'utf8');
let sacks = rawData.split('\n');

// Part 1:
// Goal:
// * There is one duplicate item per rucksack. Find it.
// * Return the SUM of the PRIORITIES of each rucksack's duplicate item.

// array of alphabetical characters, a-z, A-Z
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getPriority = (item: string): number => {
  return alphabet.indexOf(item) + 1;
}

const getDuplicate = (compartment1: string, compartment2: string): string => {
  const c1Items = new Set(<string>compartment1);
  const c2Items = new Set(<string>compartment2);
  let duplicateItem = '';

  for (let item of c1Items) {
    item;
    if (c2Items.has(item)) {
      duplicateItem = item;
      break;
    }
  }

  return duplicateItem;
}

let duplicateItemPrioritySum = 0;

for (let sack of sacks) {
  let compartment1 = sack.slice(0, sack.length/2);
  let compartment2 = sack.slice(sack.length/2, sack.length);
  let duplicateItem = getDuplicate(compartment1, compartment2);
  let duplicateItemPriority = getPriority(duplicateItem);
  duplicateItemPrioritySum += duplicateItemPriority;
}

// Expected Answer = 8515
console.log(duplicateItemPrioritySum); //?



// ------------------- Part 2: -------------------
// Goal:
// * Get the next 3 rucksacks
// * Find the duplicate item in each of the 3 rucksacks
// * Return the SUM of the PRIORITIES of the group's duplicate item.

const getDuplicateInThree = (sack1: string, sack2: string, sack3: string): string => {
  const s1Items = new Set(<string>sack1);
  const s2Items = new Set(<string>sack2);
  const s3Items = new Set(<string>sack3);
  let duplicateItem = '';

  for (let item of s1Items) {
    item;
    if (s2Items.has(item) && s3Items.has(item)) {
      duplicateItem = item;
      break;
    }
  }

  return duplicateItem;
}

const numRucksacks = sacks.length;
let sack1 = 0;
let sack2 = 1;
let sack3 = 2;

duplicateItemPrioritySum = 0;

while(sack3 < numRucksacks) {
  let duplicateItem = getDuplicateInThree(sacks[sack1], sacks[sack2], sacks[sack3]);
  let duplicateItemPriority = getPriority(duplicateItem);
  duplicateItemPrioritySum += duplicateItemPriority;

  sack1 += 3;
  sack2 += 3;
  sack3 += 3;
}

// Expected Answer = 2434
console.log(duplicateItemPrioritySum); //?
