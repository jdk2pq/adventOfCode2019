import { input, testInputPart2 } from './input';

function printImage (input: string, width: number, height: number): void {
    const layers = input.split('').reduce((layers: Array<Array<string>>, item: string, idx: number) => {
        const layerIdx = Math.floor(idx / (width * height));
        if (!layers[layerIdx]) {
            layers[layerIdx] = [];
        }
        layers[layerIdx].push(item);
        return layers;
    }, []);
    const flatFinalImage = [];
    layers.forEach((layer) => {
        layer.forEach((pixelValue, idx) => {
            if (pixelValue !== '2' && !flatFinalImage[idx]) {
                flatFinalImage[idx] = pixelValue;
            }
        })
    });
    const finalImage = flatFinalImage.reduce((layers: Array<Array<string>>, item: string, idx: number) => {
        const layerIdx = Math.floor(idx / width);
        if (!layers[layerIdx]) {
            layers[layerIdx] = [];
        }
        layers[layerIdx].push(item);
        return layers;
    }, []);
    finalImage.forEach((row) => {
        let printRow = '';
        row.forEach((pixelValue) => {
            if (pixelValue === '0') {
                printRow += '   ';
            } else {
                printRow += '|||';
            }
        });
        console.log(printRow);
    });
}
// Test
console.log(printImage(testInputPart2, 2, 2));
// Challenge
console.log(printImage(input, 25, 6));