import { testInput } from './input';
import minBy from 'lodash/minBy';

function detectAsteroids (input: string) {
    const asteroidGrid = input.split('\n').map((row: string) => row.split(''));
    const asteroidLocations = asteroidGrid.map((row: Array<string>, y: number) => {
        const ret = [];
        row.forEach((str: string, x: number) => {
            if (str === '#') {
                ret.push([x, y]);
            }
        });
        return ret;
    });
    Math.max(
        ...asteroidLocations.map((asteroidLocation: number[]) => {
            
            return 1;
        })
    );
}

detectAsteroids(testInput);