export function intcodeComputer (arr: Array<number>, input: number, secondInput: number): Array<number> {
    const ret = [];
    let usedFirstInput = false;
    for (let i = 0; i < arr.length;) {
        const split = arr[i].toString().split('');
        const opCode = parseInt(split[split.length - 2] ? split[split.length - 2] + split[split.length - 1] : split[split.length - 1]);
        const param1Mode = split[split.length - 3] ? parseInt(split[split.length - 3]) : 0;
        const param2Mode = split[split.length - 4] ? parseInt(split[split.length - 4]) : 0;
        if (opCode === 99) {
            break;
        } else if (opCode === 1) {
            arr[arr[i + 3]] = (param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) + (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            i += 4;
        } else if (opCode === 2) {
            arr[arr[i + 3]] = (param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) * (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            i += 4;
        } else if (opCode === 3) {
            if (!usedFirstInput) {
                arr[arr[i + 1]] = input;
                usedFirstInput = true;
            } else {
                arr[arr[i + 1]] = secondInput;
            }
            i += 2;
        } else if (opCode === 4) {
            // console.log(param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]);
            ret.push(param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]);
            i += 2;
        } else if (opCode === 5) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) !== 0) {
                i = (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            } else {
                i += 3;
            }
        } else if (opCode === 6) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) === 0) {
                i = (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            } else {
                i += 3;
            }
        } else if (opCode === 7) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) < (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2])) {
                arr[arr[i + 3]] = 1;
            } else {
                arr[arr[i + 3]] = 0;
            }
            i += 4;
        } else if (opCode === 8) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) === (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2])) {
                arr[arr[i + 3]] = 1;
            } else {
                arr[arr[i + 3]] = 0;

            }
            i += 4;
        }
    }
    return ret;
}

export function amplifier (program: Array<number>, phaseSetting: number, input: number): number {
    const output = intcodeComputer(program, phaseSetting, input);
    // console.log(`phase setting: ${phaseSetting} input ${input} output ${output}`);
    return output[0];
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