export function intcodeComputer (arr: Array<number>): number {
    for (let i = 0; i < arr.length / 4; i++) {
        const op = arr.slice(i * 4, i * 4 + 4);
        if (op[0] === 1) {
            arr[op[3]] = arr[op[1]] + arr[op[2]];
        } else if (op[0] === 2) {
            arr[op[3]] = arr[op[1]] * arr[op[2]];
        }
    }
    return arr[0];
}