import { input } from './input';

function getPasswordOptions (range: string): number {
    const [min, max] = range.split('-').map((str) => parseInt(str, 10));
    let numberOfPasswords = 0;
    for (let i = min; i <= max; i++) {
        const split = i.toString().split('');
        const onlyTwoAdjacentSameDigits = split.some((num, idx) => {
            if (idx === 0) {
                return num === split[idx + 1] && num !== split[idx + 2];
            } else if (idx === split.length - 1) {
                return num !== split[idx - 2] && num === split[idx - 1];
            } else {
                return (num === split[idx + 1] && num !== split[idx + 2] && num !== split[idx - 1]) ||
                    (num === split[idx - 1] && num !== split[idx - 2] && num !== split[idx + 1]);
            }
        });
        const neverDecrease = split.every((num, idx) => {
            if (idx === split.length - 1) {
                return true;
            } else {
                return parseInt(num, 10) <= parseInt(split[idx + 1]);
            }
        });
        if (onlyTwoAdjacentSameDigits && neverDecrease) {
            numberOfPasswords++;
        }
    }
    return numberOfPasswords;
}

console.log(getPasswordOptions(input));
