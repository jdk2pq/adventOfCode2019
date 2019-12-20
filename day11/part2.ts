import { input } from './input';
import { intcodeComputer } from '../shared/intcodeComputer';

async function runRobot (input: number[]) {
    const grid = [[]];
    grid[0] = [1];
    let position = [0, 0];
    let direction = 'N';
    let i = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
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
        if (position[0] < minX) {
            minX = position[0];
        }
        if (position[0] > maxX) {
            maxX = position[0];
        }
        if (position[1] < minY) {
            minY = position[1];
        }
        if (position[1] > maxY) {
            maxY = position[1];
        }

        i++;
    }
    await intcodeComputer(input, inputFn, outputFn);
    console.log(`minX: ${minX}`);
    console.log(`maxX: ${maxX}`);
    console.log(`minY: ${minY}`);
    console.log(`maxY: ${maxY}`);
    for (let i = minX; i <= maxX; i++) {
        let row = '';
        for (let j = minY; j <= maxY; j++) {
            if (grid[i][j] === 1) {
                row += '|||';
            } else {
                row += '   ';
            }
        }
        console.log(row);
    }
}

async function run () {
    console.log(await runRobot(input));
}

run();