# Day 3

# Part 1

    yarn ts-node part1.ts

# Part 2

    yarn ts-node part2.ts
    
This one was definitely challenging for me, probably because my immediate go-to was to try to replicate the grid-drawing code rather than thinking through how the steps through the grid were best represented. I didn't want to give up and rewrite my initial idea with a better solution, but it became much more complicated than was probably necessary.

I borrowed my Manhattan Distance code from [last year's Advent of Code](https://github.com/jdk2pq/adventOfCode2018). I also remember having a tough time with the problems that used the Manhattan Distance last year too, so maybe grids and two-d arrays are just something I need to work on more.

I got very tripped up on part2 and couldn't figure out why I couldn't get the right answer. I ended up looking up using [someone else's solution](https://repl.it/@jranon/Advent-of-Code-2019-Day-3) found on the [Day 3 thread](https://www.reddit.com/r/adventofcode/comments/e5bz2w/2019_day_3_solutions/) on the r/adventofcode subreddit to get the answer I needed and then tried to fix my solution to return that answer. 

My issue was the start position I chose. Originally, I wanted to get the max X and Y values from the instructions, assuming that I would stay in the positive region of the grid if I had those values. However, the way I chose to get the max X and Y values was flawed. I got max X from the first instruction and max Y from the second instruction, which gave me somewhat large values and worked well enough for part1, funny enough, but I didn't actually take the X (right/left) or Y (up/down) directions into account. Dumb mistake on my part. Once I realized this, and since I knew I just had to stay in the positive region of the grid so that I could still use `Array.forEach()` over the grid (JavaScript won't iterate over values at a negative index), I gave the `startX` and `startY` positions a value of 10000, and then part2 worked! It takes a little longer than is probably necessary, but I'm just happy to get the right answer.