/*
Day 1: Rock Paper Scissors

Description:
You are given a strategy guide to win a rock-paper-scissors tournament.
It lists all the opponent's moves and how you should respond.
It includes enough losses to not look suspicious.
The elf may be trying to trick you

Goal:
* Precalculate the outcome of the guide
* Scoring = your shape + outcome of the round
* * rock=1, paper=2, scissors=3
* * lose=0, tie=3, win=6

Input:
* A text file (aoc2022_02.txt) strategy guide.
* Column 1 = opponent: A=rock, B=paper, C=scissors
* Column 2 = you: X=rock, Y=paper, Z=scissors

*/
import { readFileSync } from 'fs';
import { join } from 'path';

// Get the data:
let rawData = readFileSync(join(__dirname, './aoc2022_02.txt'), 'utf8');
let lines = rawData.split('\n');

const shapeScore = {
  'A': 1, 'B': 2, 'C': 3,
  'X': 1, 'Y': 2, 'Z': 3,
}

const outcomeScore = {
  'X': {'A': 3, 'B': 0, 'C': 6},
  'Y': {'A': 6, 'B': 3, 'C': 0},
  'Z': {'A': 0, 'B': 6, 'C': 3},
}

// -------------------------- Part 1: Get your score ----------------------------------
const getGameScore = (game: string): number => {
  game;
  
  const moves = game.split(' '); // [opponent, us]
  let score = shapeScore[moves[1]];
  score += outcomeScore[moves[1]][moves[0]];
  return score;
}

let tournamentScore = 0;
for (let line of lines) {
  tournamentScore += getGameScore(line);
}
console.log(tournamentScore);
// Correct answer is 11449

// --------------------------- Part 2: Reinterpret the list ----------------------------------------
// X means lose, Y means draw, Z means win
// A, B, and C means the same thing as above
// Choose a weapon based on the strategies given and 

const loseDrawWinScore = {
  'X': 0,
  'Y': 3,
  'Z': 6,
}
const loseDrawWinIndex = {
  'X': 0,
  'Y': 1,
  'Z': 2,
}

const weaponGuide = {
  // Opponent: [lose, draw, win]
  'A': ['Z', 'X', 'Y'],
  'B': ['X', 'Y', 'Z'],
  'C': ['Y', 'Z', 'X'],
}

const getAlternateGameScore = (game: string): number => {
  let moves = game.split(' '); // [opponent weapon, our strategy]
  
  const opponentShape = moves[0]; 
  const gameOutcome = moves[1];
  let score = loseDrawWinScore[gameOutcome];
  let weapon = weaponGuide[opponentShape][loseDrawWinIndex[gameOutcome]];
  score += shapeScore[weapon];

  return score;
}

tournamentScore = 0;
for (let line of lines) {
  tournamentScore += getAlternateGameScore(line);
}
console.log(tournamentScore);
// Correct answer is 13187