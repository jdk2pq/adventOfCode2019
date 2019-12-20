import { input } from './input';
import { intcodeComputer } from '../shared/intcodeComputer';

async function runRobot (input: number[]) {
    const grid = [[]];
    let position = [0, 0];
    let direction = 'N';
    let i = 0;
    const nonDupes: Set<string> = new Set();
    function inputFn () {
        if (!grid[position[0]]) {
            grid[position[0]] = [];
        }
        return grid[position[0]][position[1]] || 0;
    }

    function outputFn (output) {
        if (i === 0 || i % 2 === 0) {
            nonDupes.add(`${position[0]} ${position[1]}`);
            grid[position[0]][position[1]] = output;
        } else {
            if (output === 0) {
                if (direction === 'N') {
                    direction = 'W';
                    position = [position[0] - 1, position[1]];
                } else if (direction === 'S') {
                    direction = 'E';
                    position = [position[0] + 1, position[1]];
                } else if (direction === 'W') {
                    direction = 'S';
                    position = [position[0], position[1] + 1];
                } else if (direction === 'E') {
                    direction = 'N';
                    position = [position[0], position[1] - 1];
                }
            } else if (output === 1) {
                if (direction === 'N') {
                    direction = 'E';
                    position = [position[0] + 1, position[1]];
                } else if (direction === 'S') {
                    direction = 'W';
                    position = [position[0] - 1, position[1]];
                } else if (direction === 'W') {
                    direction = 'N';
                    position = [position[0], position[1] - 1];
                } else if (direction === 'E') {
                    direction = 'S';
                    position = [position[0], position[1] + 1];
                }
            }
        }
        i++;
    }
    await intcodeComputer(input, inputFn, outputFn);
    return nonDupes.size;
}

async function run () {
    console.log(await runRobot(input));
}

run();