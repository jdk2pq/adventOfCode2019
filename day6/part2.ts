import { input, testInputPart2 } from './input';

const orbitsMap = new Map<string, string[]>();
export function orbits (input: string): void {
    const split = input.split(' ');
    // console.log(split.length);
    for (let i = 0; i < split.length; i++) {
        const orbit = split[i];
        const [a, b] = orbit.split(')');
        if (orbitsMap.get(a)) {
            orbitsMap.get(a).push(b);
        } else {
            orbitsMap.set(a, [b]);
        }
        if (!orbitsMap.get(b)) {
            orbitsMap.set(b, []);
        }
    }
}

// Test
// orbits(testInputPart2);

// Challenge
orbits(input);

const vertices = Array.from(orbitsMap.keys());

function getPath (start: string): Array<string> {
    const path = [];
    let currentVertex = start;
    while (currentVertex !== 'COM') {
        path.push(currentVertex);
        currentVertex = vertices.find((v) => orbitsMap.get(v).includes(currentVertex));
    }
    return path;
}

const orbitYOUPath = getPath('YOU');
const orbitSANPath = getPath('SAN');

console.log(orbitYOUPath.filter((v) => !orbitSANPath.includes(v)).length + orbitSANPath.filter((v) => !orbitYOUPath.includes(v)).length - 2);