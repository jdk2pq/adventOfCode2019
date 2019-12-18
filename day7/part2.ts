import { input, testInputPartTwo1, testInputPartTwo2 } from './input';
import { getPermutations, intcodeComputer } from '../shared/intcodeComputer';
import cloneDeep from 'lodash/cloneDeep';

const permutations = getPermutations([5, 6, 7, 8, 9]);

async function run (input: Array<number>) {
    const values = await Promise.all(permutations.map(async (phases: Array<number>) => {
        let output1 = [phases[1]];
        let output2 = [phases[2]];
        let output3 = [phases[3]];
        let output4 = [phases[4]];
        let output5 = [phases[0], 0];
        const results = await Promise.all([
            intcodeComputer(cloneDeep(input), () => {
                return output5.shift();
            }, output1, 1),
            intcodeComputer(cloneDeep(input), () => {
                return output1.shift();
            }, output2, 2),
            intcodeComputer(cloneDeep(input), () => {
                return output2.shift();
            }, output3, 3),
            intcodeComputer(cloneDeep(input), () => {
                return output3.shift();
            }, output4, 4),
            intcodeComputer(cloneDeep(input), () => {
                return output4.shift();
            }, output5, 5)
        ]);
        // console.log(results[4][results[4].length - 1]);
        return results[4][results[4].length - 1];
    }));
    // console.log(values);
    return Math.max(...values);
}

async function test() {
    // console.log(await run(testInputPartTwo1));
    // console.log(await run(testInputPartTwo2));
    console.log(await run(input));
}

test();