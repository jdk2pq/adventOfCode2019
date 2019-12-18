import { testInput, testInput2, testInput3, testInput4, testInput5, input } from './input';

function detectAsteroids (input: string) {
    const asteroidGrid = input.split('\n').map((row: string) => row.split(''));
    const asteroidLocations = asteroidGrid.flatMap((row: Array<string>, y: number) => {
        const ret = [];
        row.forEach((str: string, x: number) => {
            if (str === '#') {
                ret.push([x, y]);
            }
        });
        return ret;
    });
    // console.log(asteroidLocations);

    const asteroidLocationsAndDetectedAsteroids = asteroidLocations.map((asteroidLocation) => {
        const asteroidAngles = new Set();
        asteroidLocations.forEach((asteroidLocation2) => {
            if (!(asteroidLocation[0] === asteroidLocation2[0] && asteroidLocation[1] === asteroidLocation2[1])) {
                asteroidAngles.add(
                    Math.atan2(
                        asteroidLocation2[1] - asteroidLocation[1],
                        asteroidLocation2[0] - asteroidLocation[0])
                );
            }
        });
        return [asteroidLocation, asteroidAngles.size];
    });
    // console.log(asteroidLocationsAndDetectedAsteroids);
    return Math.max(...asteroidLocationsAndDetectedAsteroids.map((aLAndDA) => aLAndDA[1]));
}

console.log(detectAsteroids(testInput));
console.log(detectAsteroids(testInput2));
console.log(detectAsteroids(testInput3));
console.log(detectAsteroids(testInput4));
console.log(detectAsteroids(testInput5));
console.log(detectAsteroids(input));