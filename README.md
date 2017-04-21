# Overview

Create a program that programmatically calculates all solutions to `1_2_3_4_5_6_7_8_9` where `_` can be one of the mathematical opperations `+`,`-`,`*`,`/`,`^`,`||`. (`||` is concatination i.e. 1||2 === 12) In addition to the mathematical opperations, parentheses can be used.

You can watch [this Numberphile video](https://www.youtube.com/watch?v=-ruC5A9EzzE) for more details.

# Process

Step 1. Figure out how to figure this out:
  
`(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))`
 
This seems to be all possible opperations.

Brute forcing this would mean the parentheses could be on or off and `_` can be one of 6 opperations

`(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))`
`22222222212622222222122622222221222622222212222622222122222622221222222622212222222622122222222621222222222`

or

`2^90*6^8 = 2.0792639e+33`

Most of these derivations will be invalid (i.e. `1)_2_3_4_5_6_7_8_9`) so we want to figure out a smaller list of *valid* operations.
