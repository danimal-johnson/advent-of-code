/*
Day 5: Supply Stacks (Part 2)

Description:
* There are several stacks of crates that need to be moved by a crane.
* In this part, the crane can move multiple crates at once.

Input:
* A text file (aoc2022_05.txt) with directions for each move.
* Format: "move x from y to z" means move the top x crates from stack y to stack z.
* The stack configuration has been removed from the file and is shown below.

Initial stack arrangement:

[T]     [D]         [L]            
[R]     [S] [G]     [P]         [H]
[G]     [H] [W]     [R] [L]     [P]
[W]     [G] [F] [H] [S] [M]     [L]
[Q]     [V] [B] [J] [H] [N] [R] [N]
[M] [R] [R] [P] [M] [T] [H] [Q] [C]
[F] [F] [Z] [H] [S] [Z] [T] [D] [S]
[P] [H] [P] [Q] [P] [M] [P] [F] [D]
 1   2   3   4   5   6   7   8   9 

*/

const stacks = [
  ['P', 'F', 'M', 'Q', 'W', 'G', 'R', 'T'], 
  ['H', 'F', 'R'],
  ['P', 'Z', 'R', 'V', 'G', 'H', 'S', 'D'],
  ['Q', 'H', 'P', 'B', 'F', 'W', 'G'],
  ['P', 'S', 'M', 'J', 'H'],
  ['M', 'Z', 'T', 'H', 'S', 'R', 'P', 'L'],
  ['P', 'T', 'H', 'N', 'M', 'L'],
  ['F', 'D', 'Q', 'R'],
  ['D', 'S', 'C', 'N', 'L', 'P', 'H'],
]

import { readFileSync } from 'fs';
import { join } from 'path';

let rawData = readFileSync(join(__dirname, './aoc2022_05.txt'), 'utf8');
let instructions = rawData.split('\n');

// Part 2: Find the top crate in each stack after all moves are complete.
// In this part, the crane can move multiple crates at once.

const moveCrates = (quantity: number, fromStack: number, toStack: number) => {
  const claw: string[] = [];
  for (let i = 0; i < quantity; i++) {
    claw.push(stacks[fromStack].pop() as string);
  }
  for (let i = 0; i < quantity; i++) {
    stacks[toStack].push(claw.pop() as string);
  }
}

// Make the moves
for (let instruction of instructions) {
  const pattern = /move (\d+) from (\d+) to (\d+)/;
  let [_, quantity, fromStack, toStack] = instruction.match(pattern) as RegExpMatchArray;
  moveCrates(Number(quantity), Number(fromStack) - 1, Number(toStack) - 1);
}

// Print the results
let topCrates = stacks.map(stack => stack[stack.length-1]);
let topCratesString = topCrates.join('');
console.log(topCratesString);
// Expected result:  'DMRDFRHHH'


