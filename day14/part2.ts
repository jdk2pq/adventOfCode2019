import { input, testInput, testInput2, testInput3, testInput4, testInput5 } from './input';
import { getAmountOfOre } from './part1';

function getAmountOfFuel (input: string): number {
    const maxOre = 1000000000000;
    let amountOfFuel = 0;

    let fuelToAdd = maxOre / 1000;

    while (fuelToAdd >= 1) {
        let ore = 0;
        while (ore < maxOre) {
            amountOfFuel += fuelToAdd;
            ore = getAmountOfOre(input, amountOfFuel);
        }
        amountOfFuel -= fuelToAdd;
        fuelToAdd = fuelToAdd / 10;
    }
    return amountOfFuel;
}

// console.log(getAmountOfFuel(testInput3));
// console.log(getAmountOfFuel(testInput4));
// console.log(getAmountOfFuel(testInput5));
console.log(getAmountOfFuel(input));
