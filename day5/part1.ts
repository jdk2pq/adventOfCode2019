import { input } from './input';
import { testIntcodeComputer } from './test';


// testIntcodeComputer([3,0,4,0,99], 10, false);
testIntcodeComputer(input.split(',').map((str) => parseInt(str, 10)), 1, false);
