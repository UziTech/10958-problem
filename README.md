# Overview

Create a program that programmatically calculates all solutions to `1_2_3_4_5_6_7_8_9` where `_` can be one of the mathematical operations
`+`,`-`,`*`,`/`,`^`,`||`.

(`||` is [concatenation](https://en.wikipedia.org/wiki/Concatenation_%28mathematics%29#Calculation) (i.e. 1||2 === 12) however to keep all operations a single character for simplicity I will be using `|`)

In addition to the mathematical operations, parentheses can be used.

You can watch [this Numberphile video](https://www.youtube.com/watch?v=-ruC5A9EzzE) for more details.

# Process

## Step 1. Figure out how to figure this out:

`(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))`

This seems to be all possible combinations.

There should never be a beginning parenthesis immediately before an operation. (i.e. `1(_2...` doesn't make sense) And same with ending
parentheses immediately after an operation.

Also the maximum number of parentheses on each side of a number is the number of numbers that can have a matching parenthesis. (e.g. 3 could have up to 3
	ending parentheses immediately after it `(1_(2_(3)))...`)

Brute forcing this would mean the parentheses could be on or off and `_` can be one of 6 operations

```
(((((((((1)_((((((((2))_(((((((3)))_((((((4))))_(((((5)))))_((((6))))))_(((7)))))))_((8))))))))_(9)))))))))
22222222212622222222122622222221222622222212222622222122222622221222222622212222222622122222222621222222222
2^90*6^8 = 2.0792639e+33
```

Most of these combinations will be invalid (i.e. `1)_2_3_4_5_6_7_8_9`) so we want to figure out a smaller list of *valid* combinations.

## Step 2. Reduce parenthesis placement

I want to try to find the minimum number of combinations, so finding valid parenthesis placement seems to be the best way to reduce the number
of possible combinations.

A few requirements to be *valid*:

1.  There can be no ending parenthesis without a matching beginning parenthesis before it. (i.e. `1)_2...`)
2.  There can be no beginning parenthesis without a matching ending parenthesis after it. (i.e. `...8_(9`)
3.  There can be no beginning and ending parenthesis around a single number. (i.e. `(1)_2...` is the same as `1_2...`)
4.  There can not be multiple beginning parentheses with multiple ending parentheses around the same numbers. (i.e. `((1_2))_3...` is the same
    as `(1_2)_3...`) (i.e. `(((1_2)_3))...` is the same as `((1_2)_3)`) (i.e. `((1_(2_3)))...` is the same as `(1_(2_3))`)

Numbers 1 and 2 are to prevent invalid combinations and 3 and 4 are to prevent duplicate valid combinations.

To start I will use an `isValid` function that takes the number of parentheses before and after each number and determines if it matches the
requirements.

I used brute force starting from `1_2_3_4_5_6_7_8_9` or `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]` and ending with
`((((((((1_(((((((2)_((((((3))_(((((4)))_((((5))))_(((6)))))_((7))))))_(8)))))))_9))))))))` or
`[8, 0, 7, 1, 6, 2, 5, 3, 4, 4, 3, 5, 2, 6, 1, 7, 0, 8]`

I removed one parenthesis from each side of each number from the final combination because we are not considering `(1)_2...` a valid combination.

You can check out the code at [step2/step2.js](./step2/step2.js)

This code took about 8 hours to run on my computer so I decided to save the results along with the state in a file occasionally so I could
catch errors easier and restart at the last state if something went wrong.

(I initially wrote this code in PHP since I had an easy way to script and run code in PHP, but it would have taken 10 seconds to run 1,000,000
iterations where the same amount took 182 milliseconds in node.)

You can see the final result in [step2/possibilities.txt](./step2/possibilities.txt)

## Step 3. Evaluate the combinations

Now that I have all valid combinations I can start plugging in the operations and evaluating the expressions.

To evaluate the expressions I will need to take a string (i.e. `(1*2-3)+4|((5/6)*7^8)-9`) and evaluate it in the following order of precedence:

1.  Parentheses
2.  Concatenation
3.  Potentiation
4.  Multiplication and Division
5.  Addition and Subtraction

You can check out the code at [step3/step3.js](./step3/step3.js)

A couple notes:

-   Since we are doing [floating-point arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html) there will be some approximations that could end up wrong. So if any part of the expression evaluates to Infinity or -Infinity we just throw it out.
-   Because JavaScript sometimes uses scientific notation (i.e. `5.123456e+7`) we can not use `+` or `-` in our string so in the code I substitute them with `#` and `~` when evaluating.
