export async function intcodeComputer (program: Array<number>, input: () => number, output: Array<number> = [], amp: number = 0): Promise<Array<number>> {
    const ret = [];
    console.log(`running ${amp}`);
    let relativeBase = 0;

    for (let i = 0; i < program.length;) {
        const instructionSplit = program[i].toString().split('');

        // Get 1- or 2-digit opcode
        const opCode = parseInt(instructionSplit[instructionSplit.length - 2] ? instructionSplit[instructionSplit.length - 2] + instructionSplit[instructionSplit.length - 1] : instructionSplit[instructionSplit.length - 1]);

        function getParam (paramMode: number, idx: number): number {
            if (paramMode === 0) { // position mode
                return program[program[idx]];
            } else if (paramMode === 1) { // immediate mode
                return program[idx];
            } else if (paramMode === 2) { // relative mode
                return program[relativeBase + program[idx]];
            }
        }

        // Modes:
        // 0 = position mode
        // 1 = immediate mode
        // 2 = relative mode
        function getMode (howFarBack: number): number {
            return instructionSplit[instructionSplit.length - howFarBack] ? parseInt(instructionSplit[instructionSplit.length - howFarBack]) : 0;
        }

        const paramMode1 = getMode(3);
        const param1 = getParam(paramMode1, i + 1);
        const paramMode2 = getMode(4);
        const param2 = getParam(paramMode2, i + 2);
        const paramMode3 = getMode(5);

        if (opCode === 99) { // HALT
            return Promise.resolve(ret);
        } else if (opCode === 1) { // ADD
            program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = param1 + param2;
            i += 4;
        } else if (opCode === 2) { // MULTIPLY
            program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = param1 * param2;
            i += 4;
        } else if (opCode === 3) { // INPUT & STORE
            let x = input();
            if (x !== undefined) {
                program[paramMode1 === 2 ? relativeBase + program[i + 1] : program[i + 1]] = x;
                i += 2;
            } else {
                await new Promise((resolve) => setTimeout(() => {
                    console.log(`waiting in ${amp}...`);
                    resolve();
                }));
            }
        } else if (opCode === 4) { // OUTPUT
            // console.log(param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]);
            ret.push(param1);
            output.push(param1);
            i += 2;
        } else if (opCode === 5) { // NONZERO JUMP
            if (param1 !== 0) {
                i = param2;
            } else {
                i += 3;
            }
        } else if (opCode === 6) { // ZERO JUMP
            if (param1 === 0) {
                i = param2;
            } else {
                i += 3;
            }
        } else if (opCode === 7) { // LESS THAN
            if (param1 < param2) {
                program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = 1;
            } else {
                program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = 0;
            }
            i += 4;
        } else if (opCode === 8) { // EQUAL
            if (param1 === param2) {
                program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = 1;
            } else {
                program[paramMode3 === 2 ? relativeBase + program[i + 3] : program[i + 3]] = 0;

            }
            i += 4;
        } else if (opCode === 9) { // RELATIVE BASE ADJUST
            relativeBase += param1;
            i += 2;
        }
    }
}

export function getPermutations (array: Array<number>) {
    const ret = [];
    function permute (array: Array<number>, built: Array<number>) {
        if (array.length === 0) {
            ret.push(built);
        }
        for (let i = 0; i < array.length; i++) {
            let singleValue = array.splice(i, 1)[0];
            permute(array, built.concat(singleValue));
            array.splice(i, 0, singleValue);
        }
    }
    permute(array, []);
    return ret;
}