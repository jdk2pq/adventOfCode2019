# Day 6

# Part 1

    yarn ts-node part1.ts

# Part 2

    yarn ts-node part2.ts
    
Got a bit tripped up in these problems because ts-node would error out due to the length of the string for the input. I had to replace the line breaks with spaces instead, and things worked after that. 

I also tried making a `Node` type first with a `left` and `right` property, but I figured it was simpler and easier to just use a map of arrays to manage the graph instead.