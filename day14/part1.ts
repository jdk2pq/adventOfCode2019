import { input, testInput, testInput2, testInput3, testInput4, testInput5 } from './input';

export let reactions: Map<string, Array<string>> = new Map();
export let howMuch: Map<string, number> = new Map();
export let requirements: Map<string, number> = new Map();
export let surplus: Map<string, number> = new Map();

export function getReactRequirements (productName: string, productValue: number): void {
    const produce = reactions.get(productName);
    const quantity = howMuch.get(productName);
    // console.log(`surplus: ${surplus.get(productName)}`);
    const quantityNeeded = productValue - (surplus.get(productName) || 0);
    if (produce[0].includes( 'ORE')) {
        requirements.set(productName, requirements.get(productName) ? requirements.get(productName) + quantityNeeded : quantityNeeded);
    } else {
        surplus.set(productName, quantity * Math.ceil(quantityNeeded / quantity) - quantityNeeded);
        produce.forEach((single) => {
            const [singleVal, singleName] = single.split(' ');
            getReactRequirements(singleName, Math.ceil(quantityNeeded / quantity) * parseInt(singleVal, 10));
        });
    }
}

export function getAmountOfOre (input: string, amountOfFuel: number): number {
    requirements = new Map();
    reactions = new Map();
    howMuch = new Map();
    input.split('\n').forEach((equation: string) => {
        const [produceString, product] = equation.split(' => ');
        const [productValue, productName] = product.split(' ');
        const produce = produceString.split(', ');
        howMuch.set(productName, parseInt(productValue, 10));
        reactions.set(productName, produce);
    });
    getReactRequirements('FUEL', amountOfFuel);
    // console.log(requirements);
    return Array.from(requirements).reduce((acc: number, [name, value]: [string, number]): number => {
        // console.log(Math.ceil(value / howMuch.get(name)));
        // console.log(parseInt(reactions.get(name)[0].split(' ')[0], 10));
        return acc + Math.ceil(value / howMuch.get(name)) * parseInt(reactions.get(name)[0].split(' ')[0], 10);
    }, 0);
}

// console.log(getAmountOfOre(testInput, 1));
// console.log(getAmountOfOre(testInput2, 1));
// console.log(getAmountOfOre(testInput3, 1));
// console.log(getAmountOfOre(testInput4, 1));
// console.log(getAmountOfOre(testInput5, 1));
console.log(getAmountOfOre(input, 1));
