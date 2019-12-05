import { input, testInput, testInput2, testInput3 } from './input';
import max from 'lodash/max';
import min from 'lodash/min';

function manhattan (coords1: number[], coords2: number[]): number {
    // console.log(coords1);
    // console.log(coords2);
    return Math.abs(coords2[0] - coords1[0]) + Math.abs(coords2[1] - coords1[1]);
}

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

    const drawGrid = () => {
        const beginningY = min(grid.map((row) => {
            return row.indexOf(row.filter((val) => val !== undefined)[0]);
        }));
        const endY = max(grid.map((row) => {
            const nonEmpty = row.filter((val) => val !== undefined);
            const lastEl = nonEmpty[nonEmpty.length - 1];
            return row.lastIndexOf(lastEl);
        }));
        const beginningX = min(grid.map((row, idx) => {
            if (row.filter((val) => val !== undefined).length > 0) {
                return idx;
            } else {
                return Infinity;
            }
        }));
        const endX = max(grid.map((row, idx) => {
            if (row.filter((val) => val !== undefined).length > 0) {
                return idx;
            } else {
                return -Infinity;
            }
        }));
        for (let i = beginningY; i <= endY; i++) {
            let row = '';
            for (let j = beginningX; j <= endX; j++) {
                if (grid[j] && grid[j][i]) {
                    row += grid[j][i];
                } else {
                    row += '.';
                }
            }
            console.log(row);
        }
    };

    // drawGrid();

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
    const manhattanDistances = cross.map((coords) => manhattan(coords, [startX, startY]));
    // console.log(manhattanDistances);
    return min(manhattanDistances);
}

// Tests
// console.log(crossWires(testInput) === 6);
// console.log(crossWires(testInput2) === 159);
// console.log(crossWires(testInput3) === 135);

// Challenge
console.log(crossWires(input));