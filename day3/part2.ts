import { input } from './input';
import min from 'lodash/min';

function crossWires (instructions: Array<string>): number {
    // pick arbitrarily large number to avoid going into negatives for foreach loop later on (since JavaScript won't
    // consider values at negative indices)
    const startX = 10000;
    const startY = 10000;
    const grid = [[]];

    if (!grid[startX]) {
        grid[startX] = [];
    }

    grid[startX][startY] = 'o';

    let currX = startX;
    let currY = startY;
    const addToGrid = (movement: string, directionLetter: string, pathStr: string, xAdj: number, yAdj: number, addCross: boolean) => {
        const numberOfSteps = parseInt(movement.split(directionLetter)[1], 10);
        if (!(currX === startX && currY === startY) && grid[currX][currY] !== 'X') {
            grid[currX][currY] = '+';
        }

        for (let i = 0; i < numberOfSteps; i++) {
            currX += xAdj;
            currY += yAdj;

            if (!grid[currX]) {
                grid[currX] = [];
            }
            if (!grid[currX][currY]) {
                grid[currX][currY] = pathStr;
            } else if (addCross) {
                grid[currX][currY] = 'X'
            }
        }
    };
    instructions.forEach((instruction, instructionIdx) => {
        currX = startX;
        currY = startY;
        instruction.split(',').forEach((movement) => {
            if (movement.startsWith('U')) {
                addToGrid(movement, 'U', '|', 0, -1, instructionIdx === 1);
            } else if (movement.startsWith('D')) {
                addToGrid(movement, 'D', '|', 0, 1, instructionIdx === 1);
            } else if (movement.startsWith('R')) {
                addToGrid(movement, 'R', '-', 1, 0, instructionIdx === 1);
            } else if (movement.startsWith('L')) {
                addToGrid(movement, 'L', '-', -1, 0, instructionIdx === 1);
            }
        });
    });

    let cross = [];

    grid.forEach((row, rowIdx) => {
        const found = [];
        row.forEach((val, idx) => {
            if (val === 'X') {
                found.push(idx);
            }
        });
        if (found) {
            found.forEach((idx) => cross.push([rowIdx, idx]));
        }
    });

    // console.log(cross);

    const stepsArr = cross.map((crossedCoordinates: [number, number]) => {
        let steps = 0;
        instructions.forEach((instruction) => {
            currX = startX;
            currY = startY;
            const directions = instruction.split(',');
            let continueOn = true;
            for (let i = 0; i < directions.length; i++) {
                const movement = directions[i];
                let numberOfSteps = 0;
                let xAdj;
                let yAdj;
                if (movement.startsWith('U')) {
                    numberOfSteps = parseInt(movement.split('U')[1], 10);
                    yAdj = -1;
                    xAdj = 0;
                } else if (movement.startsWith('D')) {
                    numberOfSteps = parseInt(movement.split('D')[1], 10);
                    yAdj = 1;
                    xAdj = 0;
                } else if (movement.startsWith('R')) {
                    numberOfSteps = parseInt(movement.split('R')[1], 10);
                    xAdj = 1;
                    yAdj = 0;
                } else if (movement.startsWith('L')) {
                    numberOfSteps = parseInt(movement.split('L')[1], 10);
                    xAdj = -1;
                    yAdj = 0;
                }
                for (let j = 0; j < numberOfSteps; j++) {
                    currX += xAdj;
                    currY += yAdj;
                    steps += 1;
                    if (currX === crossedCoordinates[0] && currY === crossedCoordinates[1]) {
                        // console.log(steps);
                        continueOn = false;
                        break;
                    }
                }
                if (!continueOn) {
                    break;
                }
            }
        });
        return steps;
    });

    // console.log(stepsArr);

    return min(stepsArr);
}


// Tests
// console.log(crossWires(testInput) === 30);
// console.log(crossWires(testInput2) === 610);
// console.log(crossWires(testInput3) === 410);

// Challenge
console.log(crossWires(input));