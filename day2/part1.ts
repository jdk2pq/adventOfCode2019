import { input, testInput, testInput2, testInput3, testInput4, testInput5 } from './input';
import { intcodeComputer } from './intcodeComputer';

// Tests
console.log(intcodeComputer(testInput) === 3500);
console.log(intcodeComputer(testInput2) === 2);
console.log(intcodeComputer(testInput3) === 2);
console.log(intcodeComputer(testInput4) === 2);
console.log(intcodeComputer(testInput5) === 30);

// Challenge
input[1] = 12;
input[2] = 2;
console.log(intcodeComputer(input));