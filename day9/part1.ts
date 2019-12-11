import { input, testInput } from './input';
import minBy from 'lodash/minBy';

function imageDataToLayers (input: string, width: number, height: number): number {
    const splitOutArray = input.split('').reduce((layers: Array<Array<string>>, item: string, idx: number) => {
        const layerIdx = Math.floor(idx / (width * height));
        if (!layers[layerIdx]) {
            layers[layerIdx] = [];
        }
        layers[layerIdx].push(item);
        return layers;
    }, []);
    const minNumberOf0s = minBy(splitOutArray, (layer: Array<string>) => layer.filter((str) => str === '0').length);
    return minNumberOf0s.filter((str) => str === '1').length * minNumberOf0s.filter((str) => str === '2').length;
}
// Test
console.log(imageDataToLayers(testInput, 3, 2));
// Challenge
console.log(imageDataToLayers(input, 25, 6));