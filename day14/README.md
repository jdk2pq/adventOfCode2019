# Day 1

# Part 1

    yarn ts-node part1.ts

# Part 2

    yarn ts-node part2.ts
    
Got tripped up in both of these problems. First, I didn't initially build the idea of surplus input chemicals into my program, so I kept getting the maximum amount of ore needed instead of the minimum. Once I figured that out, through help on the subreddit of course, I was able to get the right solution.

For Part 2, I really just didn't understand why I couldn't divide 1 trillion ore / solution from part 1. I had to read the question a number of times and check the subreddit to really understand what was happening. A lot of people suggested doing a binary search to find the solution. I knew doing it iteratively, one after the other, wasn't the best way, and after seeing a couple of solutions, I thought my naiive approach of just starting with a large amount of ore and adding to it, without going over 1 trillion (and if I did, subtracting from it and adding a lower amount of ore), would work out. I wasn't alone in my thinking either, after seeing other solutions in the subreddit.