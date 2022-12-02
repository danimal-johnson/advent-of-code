/*
Day 1: Calorie counting

Description:
* Elves are carrying a number of food items.
* Each item has a calorie value.

Goal:
* Find the elf carrying the most calories in total
* The first elf is Elf #1

Input:
* A text file (aoc2022_01.txt) with one food item per line.
* There is a blank line after each elf's goods (except the last one)

*/
import { readFileSync } from 'fs';
import { join } from 'path';

// Get the data:
let rawData = readFileSync(join(__dirname, './aoc2022_01.txt'), 'utf8');
const lines = rawData.trim().split('\n\n');
const elfCalories: number[] = [];

// Organize the data:
for (let elfIndex = 0; elfIndex < lines.length; elfIndex++) {
  let elfItems = lines[elfIndex].split('\n').map(x => Number(x));
  elfCalories.push(elfItems.reduce((sum, a) => sum + a, 0));
}

// Find the index of the most calorically dense elf:
let maxCalories = 0;
let maxElf = 0;

for (let i = 0; i < elfCalories.length; i++) {
  if (elfCalories[i] > maxCalories) {
    maxCalories = elfCalories[i];
    maxElf = i;
  }
}

console.log(`Elf ${maxElf + 1} is carrying ${maxCalories} calories`);

// Note: The question of "which" elf wasn't what they were looking for
// They only needed the total number of calories.

// ---------- Part 2 ----------
// Find the total calories of the top 3 elves.

elfCalories.sort((a, b) => b - a);
elfCalories
let topThree = elfCalories[0] + elfCalories[1] + elfCalories[2];
console.log(`The top 3 elves are carrying ${topThree} calories in total.`)
