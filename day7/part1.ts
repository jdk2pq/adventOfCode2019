import { input, testInput1, testInput2, testInput3 } from './input';
import { amplifier, getPermutations, intcodeComputer } from './incodeComputer';
import cloneDeep from 'lodash/cloneDeep';

const permutations = getPermutations([0, 1, 2, 3, 4]);

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

console.log(run(testInput1));
console.log(run(testInput2));
console.log(run(testInput3));
console.log(run(input));