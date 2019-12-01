import { input, testInput2 } from './input';

export function getFuel (mass: number): number {
    if (mass <= 0) {
        return 0;
    }
    const fuel = Math.max(0, Math.floor(mass / 3) - 2);
    return fuel + getFuel(fuel);
}
// Tests
testInput2.forEach((arr) => {
    console.log(getFuel(arr[0]) === arr[1]);
});

// Challenge
console.log(input.reduce((acc, val) => acc + getFuel(val), 0));