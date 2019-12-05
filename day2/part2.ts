import { input } from './input';
import cloneDeep from 'lodash/cloneDeep';
import { intcodeComputer } from './intcodeComputer';

// Challenge
const finalValue = 19690720;
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        input[1] = i;
        input[2] = j;
        if (intcodeComputer(cloneDeep(input)) === finalValue) {
            console.log(i);
            console.log(j);
            console.log(100 * i + j);
            i = 100;
            j = 100;
            break;
        }
    }
}
