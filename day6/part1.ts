import { input, testInput } from './input';

const orbitsMap = new Map<string, string[]>();
export function orbits (input: string): void {
    const split = input.split(' ');
    console.log(split.length);
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

// orbits(testInput);
orbits(input);
//
let vertices = Array.from(orbitsMap.keys());
//
// vertices.forEach((vertex) => {
//    console.log(`${vertex} - ${orbitsMap.get(vertex)}`);
// });
let count = 0;
vertices.forEach((vertex) => {
    let currVertex = vertex;
    while (currVertex !== 'COM') {
        currVertex = vertices.find((v) => orbitsMap.get(v).includes(currVertex));
        count += 1;
    }
});

console.log(count);