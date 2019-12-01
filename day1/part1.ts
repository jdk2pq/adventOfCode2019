import { input, testInput } from './input';

export function getFuel (mass: number): number {
    return Math.floor(mass / 3) - 2;
}
// Tests
testInput.forEach((arr) => {
    console.log(getFuel(arr[0]) === arr[1]);
});

// Challenge
console.log(input.reduce((acc, val) => acc + getFuel(val), 0));