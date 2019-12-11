export function testIntcodeComputer (arr: Array<number>, input: number, considerPast5: boolean): void {
    for (let i = 0; i < arr.length; i++) {
        const split = arr[i].toString().split('');
        const opCode = parseInt(split[split.length - 2] ? split[split.length - 2] + split[split.length - 1] : split[split.length - 1]);
        // console.log(split);
        const param1Mode = split[split.length - 3] ? parseInt(split[split.length - 3]) : 0;
        const param2Mode = split[split.length - 4] ? parseInt(split[split.length - 4]) : 0;
        if (opCode === 99) {
            break;
        } else if (opCode === 1) {
            arr[arr[i + 3]] = (param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) + (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            i += 3;
        } else if (opCode === 2) {
            arr[arr[i + 3]] = (param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) * (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]);
            i += 3;
        } else if (opCode === 3) {
            arr[arr[i + 1]] = input;
            i += 1;
        } else if (opCode === 4) {
            // console.log(`${i} ${arr[i + 1]}`);
            console.log(param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]);
            i += 1;
        } else if (opCode === 5 && considerPast5) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) !== 0) {
                i = (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]) - 1;
            } else {
                i += 2;
            }
        } else if (opCode === 6 && considerPast5) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) === 0) {
                i = (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2]) - 1;
            } else {
                i += 2;
            }
        } else if (opCode === 7 && considerPast5) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) < (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2])) {
                arr[arr[i + 3]] = 1;
            } else {
                arr[arr[i + 3]] = 0;
            }
            i += 3;
        } else if (opCode === 8 && considerPast5) {
            if ((param1Mode === 0 ? arr[arr[i + 1]] : arr[i + 1]) === (param2Mode === 0 ? arr[arr[i + 2]] : arr[i + 2])) {
                arr[arr[i + 3]] = 1;
            } else {
                arr[arr[i + 3]] = 0;

            }
            i += 3;
        }
    }
}