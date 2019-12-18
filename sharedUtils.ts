
export function manhattan (coords1: number[], coords2: number[]): number {
    // console.log(coords1);
    // console.log(coords2);
    return Math.abs(coords2[0] - coords1[0]) + Math.abs(coords2[1] - coords1[1]);
}