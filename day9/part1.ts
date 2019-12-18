import { input, testInput, testInput2, testInput3 } from './input';
import { intcodeComputer } from '../shared/intcodeComputer';

async function run () {
    // Tests
    // console.log(await intcodeComputer(testInput, () => {return null}));
    console.log(await intcodeComputer(testInput2, () => {return null}));
    console.log(await intcodeComputer(testInput3, () => {return null}));
    // Challenge
    console.log(await intcodeComputer(input, () => {return 1}));
}
run();
