import { input, testInput1, testInput2, testInput3, testInputPartTwo1, testInputPartTwo2 } from './input';
import { amplifier, getPermutations, intcodeComputer } from './incodeComputer';
import cloneDeep from 'lodash/cloneDeep';

const permutations = getPermutations([5, 6, 7, 8, 9]);

function run (input: Array<number>) {
    return Math.max(
        ...permutations.map((phases: Array<number>) => {
            let output = 0;
            phases.forEach((phaseSetting: number) => {
                output = amplifier(cloneDeep(input), phaseSetting, output);
            });
            return output;
        })
    );
}

console.log(run(testInputPartTwo1));
console.log(run(testInputPartTwo2));
// console.log(run(input));