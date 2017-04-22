# Overview

Create a program that programmatically calculates all solutions to `1_2_3_4_5_6_7_8_9` where `_` can be one of the mathematical operations `+`,`-`,`*`,`/`,`^`,`||`. (`||` is concatenation i.e. 1||2 === 12) In addition to the mathematical operations, parentheses can be used.

You can watch [this Numberphile video](https://www.youtube.com/watch?v=-ruC5A9EzzE) for more details.

# Process

## Step 1. Figure out how to figure this out:

`(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))`

This seems to be all possible combinations.

Brute forcing this would mean the parentheses could be on or off and `_` can be one of 6 operations

`(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))`
`22222222212622222222122622222221222622222212222622222122222622221222222622212222222622122222222621222222222`
`2^90*6^8 = 2.0792639e+33`

Most of these derivations will be invalid (i.e. `1)_2_3_4_5_6_7_8_9`) so we want to figure out a smaller list of *valid* operations.

## Step 2. Find valid parenthesis placement

I want to try to find the minimum number of derivations, so finding valid parentheses placement seems to be the best way to reduce the number of possible calculations.

A few requirements to be valid:

  1. There can be no ending parenthesis without a matching beginning parenthesis before it. (i.e. `1)_2...`)
  2. There can be no starting parenthesis without a matching ending parenthesis after it. (i.e. `...8_(9`)
  3. There can be no starting and ending parenthesis around a single number. (i.e. `(1)_2...` is the same as `1_2...`)
  4. There can not be multiple starting parentheses with multiple ending parentheses around the same numbers. (i.e. `((1_2))_3...` is the same as `(1_2)_3...`)

 Numbers 1 and 2 are to prevent invalid combinations and 3 and 4 are to prevent duplicate valid combinations.
