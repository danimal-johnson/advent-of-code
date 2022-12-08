/*
Day 6: Tuning Trouble

Description:
* Finding the start of a packet in a data stream.
* The start of a packet is indicated by n characters that are all different.

Input:
* A text file (aoc2022_06.txt) representing a data stream.

*/

import { readFileSync } from 'fs';
import { join } from 'path';

let rawData = readFileSync(join(__dirname, './aoc2022_06.txt'), 'utf8');

const numCharsProcessedToFindMarker = (data: string, markerLength: number): number => {
  let markerFound = false;
  let numCharsProcessed = markerLength - 1;
  let leftPointer = 0;
  let rightPointer = markerLength - 1;
  while (rightPointer < data.length) {
    numCharsProcessed++;
    let fourString = data.slice(leftPointer, rightPointer + 1);
    let uniqueChars = new Set(fourString);
    uniqueChars.size;
    if (uniqueChars.size === markerLength) return numCharsProcessed;
    leftPointer++;
    rightPointer++;
  }
  return -1; // No marker found
}

// Part 1: Find the number of characters processed to find the first marker
// Markers are 4 characters long 
// Examples: Expect 5, 6, 10, 11, 1640
numCharsProcessedToFindMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 4); //?
numCharsProcessedToFindMarker("nppdvjthqldpwncqszvftbrmjlhg", 4); //?
numCharsProcessedToFindMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4); //?
numCharsProcessedToFindMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4); //?
console.log ("Part 1: ", numCharsProcessedToFindMarker(rawData, 4));

// Part 2: Find the number of characters processed to find the first marker
// Markers are 14 characters long 
// Examples: Expect 19, 23, 23, 29, 26
numCharsProcessedToFindMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14); //?
numCharsProcessedToFindMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 14); //?
numCharsProcessedToFindMarker("nppdvjthqldpwncqszvftbrmjlhg", 14); //?
numCharsProcessedToFindMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14); //?
numCharsProcessedToFindMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14); //?
console.log("Part 2: ", numCharsProcessedToFindMarker(rawData, 14));
