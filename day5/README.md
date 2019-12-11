# Day 1

# Part 1

    yarn ts-node part1.ts

# Part 2

    yarn ts-node part2.ts
    
This one took some time, mostly because of how poorly and quickly I wrote the TEST intcode computer (I know, I know, it's really bad and needs fixing), and I made some dumb mistakes that were relatively tough to notice along the way (forgot to allow for parameter modes in intcode `4` and forgot to account for _not_ increasing the instruction pointer if there was a `JUMP` opcode -- the issue there was a `for` loop doing `i++` with every loop). But I still enjoy the intcode problems a lot, and I hear that's a good thing for the future problems (haven't done day 7 or day 9 as of this writing, but they're intcode problems from what I've seen in the subreddit).