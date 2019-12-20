import sortBy from 'lodash/sortBy';

import { testInput, testInput2, testInput3, testInput4, testInput5, input } from './input';

interface Asteroid {
    x: number,
    y: number,
    angle: number
}

const testStation = {
    x: 11,
    y: 13,
    angle: 0
};

const inputStation = {
    x: 18,
    y: 20,
    angle: 0
};

function dstroyAsteroids (input: string, station: Asteroid): number {
    const asteroidGrid = input.split('\n').map((row: string) => row.split(''));
    const asteroids: Array<Asteroid> = sortBy(asteroidGrid.flatMap((row: Array<string>, y: number) => {
        const ret: Array<Asteroid> = [];
        row.forEach((str: string, x: number) => {
            if (str === '#' && !(x === 20 && y === 18)) {
                ret.push({
                    x,
                    y,
                    angle: Math.atan2(
                        y - station.x,
                        x - station.y
                    )
                });
            }
        });
        return ret;
    }), (asteroid: Asteroid) => asteroid.angle);
    console.log(asteroids[asteroids.length - 1]);

    // const asteroidsDestroyed = asteroids.map((asteroid) => {
    //     const asteroidAngles = new Set();
    //     asteroidLocations.forEach((asteroidLocation2) => {
    //         if (!(asteroidLocation[0] === asteroidLocation2[0] && asteroidLocation[1] === asteroidLocation2[1])) {
    //             asteroidAngles.add(
    //                 Math.atan2(
    //                     asteroidLocation2[1] - asteroidLocation[1],
    //                     asteroidLocation2[0] - asteroidLocation[0])
    //             );
    //         }
    //     });
    //     return asteroidLocation;
    // });
    // console.log(asteroidLocationsAndDetectedAsteroids);
    // return (asteroidsDestroyed[200][0] * 100) + asteroidsDestroyed[200][1];
    return 0;
}

console.log(dstroyAsteroids(testInput5, testStation));
// console.log(detectAsteroids(input));