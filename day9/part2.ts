import { input, testInput, testInput2, testInput3 } from './input';
import { intcodeComputer } from '../shared/intcodeComputer';

async function run () {
    // Challenge
    console.log(await intcodeComputer(input, () => {return 2}));
}
run();
