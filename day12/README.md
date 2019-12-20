# Day 12

# Part 1

    yarn ts-node part1.ts

# Part 2

    yarn ts-node part2.ts
    
I didn't find Part 1 too challenging. After fixing a couple of bugs in the math, things worked! For Part 2, I'll have to find a more optimal way of running my code, since it seems like this could run forever.

For Part 2, I figured out *the trick* to it all after talking with my coworkers at CCRi. They pointed out that each dimension (x, y, z) moves independent of the others, so what you should do is calculate the number of steps it takes for each dimension to reach its initial state, then find the lowest common multiple for the steps for each dimension.