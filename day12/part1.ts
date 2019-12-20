import { input, testInput, testInput2 } from './input';

function simulateGravityAndVelocity (input: Array<{x: number, y: number, z: number}>, steps: number) {
    let positionAndVelocity = [
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
    console.log('step 0');
    console.log(positionAndVelocity);
    for (let i = 0; i < steps; i++) {
        const newPositionAndVelocity = [];
        positionAndVelocity.forEach((currPosAndVel) => {
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
            newPositionAndVelocity.push({
                position: {
                    x: currPosAndVel.position.x + velocity.x,
                    y: currPosAndVel.position.y + velocity.y,
                    z: currPosAndVel.position.z + velocity.z,
                },
                velocity: velocity
            });
        });
        positionAndVelocity = newPositionAndVelocity;
        console.log(`step ${i + 1}`);
        console.log(positionAndVelocity);
        console.log(positionAndVelocity.reduce(
            (acc, pav) => acc + ((Math.abs(pav.velocity.x) + Math.abs(pav.velocity.y) + Math.abs(pav.velocity.z)) *
                (Math.abs(pav.position.x) + Math.abs(pav.position.y) + Math.abs(pav.position.z))), 0)
        );
    }
}

// console.log(simulateGravityAndVelocity(testInput, 10));
console.log(simulateGravityAndVelocity(testInput, 13104));

// console.log(simulateGravityAndVelocity(testInput2, 100));

// console.log(simulateGravityAndVelocity(input, 1000));