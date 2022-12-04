/*
Day 4: Camp Cleanup

Description:
* Elves are cleaning up the camp and are working in pairs.
* Each elf has a range of sections to clean up.
* Some of the ranges overlap.


Input:
* A text file (aoc2022_03.txt) with two ranges per line.
* Format: 1st range start-end, 2nd range start-end (e.g. "1-5, 3-7")

*/
import { readFileSync } from 'fs';
import { join } from 'path';

let rawData = readFileSync(join(__dirname, './aoc2022_04.txt'), 'utf8');
let lines = rawData.split('\n');

// let testline = "7-96,6-95";
// let [range1, range2] = testline.split(',');
// range1;
// range2;
// let [start1, end1] = range1.split('-');
// start1;
// end1;


// ------------ Part 1: ------------
// Goal:
// * Find the number of pairs (lines) with one range that completely contains the other.
const countContainedRanges = (): number => {
  let containedMatches = 0;

  for (let line of lines) {
    let [range1, range2] = line.split(',');
    let [start1, end1] = range1.split('-');
    let [start2, end2] = range2.split('-');
    let start1Num = parseInt(start1);
    let end1Num = parseInt(end1);
    let start2Num = parseInt(start2);
    let end2Num = parseInt(end2);

    if (start1Num <= start2Num && end1Num >= end2Num) {
      containedMatches++;
      continue;
    }
    if (start1Num >= start2Num && end1Num <= end2Num) {
      containedMatches++;
      continue;
    }
  }

  console.log(containedMatches);
  return containedMatches;
}

// Expected value: 490
countContainedRanges(); //?

// ------------- Part 2: -------------
// Goal:
// * Find the number of pairs (lines) with any overlap.

const countOverlappingRanges = (): number => {
  let overlappingRanges = 0;

  for (let line of lines) {
    let [range1, range2] = line.split(',');
    let [start1, end1] = range1.split('-');
    let [start2, end2] = range2.split('-');
    let start1Num = parseInt(start1);
    let end1Num = parseInt(end1);
    let start2Num = parseInt(start2);
    let end2Num = parseInt(end2);

    // First range starts lower than second range
    // If it ends higher than the start of the second range, there is an overlap
    if (start1Num <= start2Num && start2Num <= end1Num) {
        overlappingRanges++;
        continue;
      }
    // Second range starts lower than first range
    // If it ends higher than the start of the first range, there is an overlap
    if (start2Num <= start1Num && start1Num <= end2Num) {
      console.log(line);
      overlappingRanges++;
      continue;
    }
  }

  console.log(overlappingRanges);
  return overlappingRanges;
}

// Expected value: 921
countOverlappingRanges(); //?
