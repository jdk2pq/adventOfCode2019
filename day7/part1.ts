import { input, testInput1, testInput2, testInput3 } from './input';
import { getPermutations, intcodeComputer } from '../shared/intcodeComputer';
import cloneDeep from 'lodash/cloneDeep';

const permutations = getPermutations([0, 1, 2, 3, 4]);

async function run (input: Array<number>) {
    const values = await Promise.all(permutations.map(async (phases: Array<number>) => {
        let output = 0;
        for (let i = 0; i < phases.length; i++) {
            const phaseSetting = phases[i];
            let usedFirstInput = false;
            const intcode = await intcodeComputer(cloneDeep(input), () => {
                if (!usedFirstInput) {
                    usedFirstInput = true;
                    return phaseSetting;
                } else {
                    // console.log(`output: ${output}`);
                    return output;
                }
            });
            // console.log(intcode);
            output = intcode[0];
        }
        return output;
    }));
    // console.log(values);
    return Math.max(
        ...values
    );
}

async function test() {
    // console.log(await run(testInput1));
    // console.log(await run(testInput2));
    // console.log(await run(testInput3));
    console.log(await run(input));
}

test();