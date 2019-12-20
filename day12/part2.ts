import cloneDeep from 'lodash/cloneDeep';
import { lcm } from 'mathjs';
import { input, testInput, testInput2 } from './input';

interface GravityAndVelocity {
    position: {
        x: number,
        y: number,
        z: number
    },
    velocity: {
        x: number,
        y: number,
        z: number
    }
}

function simulateGravityAndVelocity (input: Array<{x: number, y: number, z: number}>): number {
    let positionAndVelocity: Array<GravityAndVelocity> = [
        {
            position: input[0],
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        {
            position: input[1],
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        {
            position: input[2],
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        {
            position: input[3],
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    ];
    const initial: Array<GravityAndVelocity> = cloneDeep(positionAndVelocity);
    const lcmValues: Array<GravityAndVelocity> = [
        {
            position: {
                x: null,
                y: null,
                z: null
            },
            velocity: {
                x: null,
                y: null,
                z: null
            },
        },
        {
            position: {
                x: null,
                y: null,
                z: null
            },
            velocity: {
                x: null,
                y: null,
                z: null
            }
        },
        {
            position: {
                x: null,
                y: null,
                z: null
            },
            velocity: {
                x: null,
                y: null,
                z: null
            },
        },
        {
            position: {
                x: null,
                y: null,
                z: null
            },
            velocity: {
                x: null,
                y: null,
                z: null
            },
        }
    ];
    let gcdFound = false;
    let i = 0;
    while (!gcdFound) {
        const newPositionAndVelocity: Array<GravityAndVelocity> = [];
        positionAndVelocity.forEach((currPosAndVel, idx: number) => {
            const velocity = {
                x: currPosAndVel.velocity.x + (positionAndVelocity.map((v) => v.position.x)
                    .filter((v) => v > currPosAndVel.position.x).length - positionAndVelocity.map((v) => v.position.x)
                    .filter((v) => v < currPosAndVel.position.x).length),
                y: currPosAndVel.velocity.y + (positionAndVelocity.map((v) => v.position.y)
                    .filter((v) => v > currPosAndVel.position.y).length - positionAndVelocity.map((v) => v.position.y)
                    .filter((v) => v < currPosAndVel.position.y).length),
                z: currPosAndVel.velocity.z + (positionAndVelocity.map((v) => v.position.z)
                    .filter((v) => v > currPosAndVel.position.z).length - positionAndVelocity.map((v) => v.position.z)
                    .filter((v) => v < currPosAndVel.position.z).length)
            };
            const newValue: GravityAndVelocity = {
                position: {
                    x: currPosAndVel.position.x + velocity.x,
                    y: currPosAndVel.position.y + velocity.y,
                    z: currPosAndVel.position.z + velocity.z,
                },
                velocity: velocity
            };
            newPositionAndVelocity.push(newValue);
        });
        i++;
        if (i !== 0) {
            ['x', 'y', 'z'].forEach((dimension) => {
                if (lcmValues.every((gAndV, idx) => {
                    return newPositionAndVelocity[idx].velocity[dimension] === initial[idx].velocity[dimension] &&
                        newPositionAndVelocity[idx].position[dimension] === initial[idx].position[dimension];
                }) && lcmValues[0].position[dimension] === null) {
                    lcmValues.forEach((gAndV, idx) => {
                        lcmValues[idx].position[dimension] = i;
                        lcmValues[idx].velocity[dimension] = i;
                    });
                }
            });
            gcdFound = lcmValues.every((gAndV) => gAndV.velocity.x !== null && gAndV.velocity.y !== null && gAndV.velocity.z !== null && gAndV.position.x !== null && gAndV.position.y !== null && gAndV.position.z !== null);
        }
        positionAndVelocity = newPositionAndVelocity;
    }
    const set: Set<number> = new Set();
    lcmValues.forEach((gAndV) => {
        set.add(gAndV.position.x);
        set.add(gAndV.position.y);
        set.add(gAndV.position.z);
        set.add(gAndV.velocity.x);
        set.add(gAndV.velocity.y);
        set.add(gAndV.velocity.z);
    });
    console.log(set);
    return lcm(...Array.from(set.values()));
}

console.log(simulateGravityAndVelocity(testInput));
console.log(simulateGravityAndVelocity(testInput2));
console.log(simulateGravityAndVelocity(input));