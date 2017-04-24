const fs = require("fs");

const ops = ["+", "-", "*", "/", "^", "|"];
console.time("readfile");
const possibilities = fs.readFileSync("../step2/possibilities.txt", { encoding: "utf8" }).split("\n");
console.timeEnd("readfile");

let total = possibilities.length;
let line = 0;
let numbers = [];

let operations = [0, 0, 0, 0, 0, 0, 0, 0];

function evaluate() {
	// TODO:
}

function incrementOne(operations) {
	for (let i = operations.length - 1; i >= 0; i--) {
		operations[i]++;
		if (operations[i] > 5) {
			if (i === 0) {
				return false;
			}
			operations[i] = 0;
		} else {
			break;
		}
	}
	return true;
}

function start() {
	const combination = possibilities[line];
	console.time(combination);
	let num;
	do {
		num = evaluate(combination);
		if (num) {
			numbers.push(num + " = " + combination);
	}
}
while (incrementOne(operations));

console.timeEnd(combination);
if (numbers.length > 0) {
	fs.appendFile("numbers.txt", "\n" + numbers.join("\n"));
}

if (++line < total) {
	//setTimeout(start, 0);
}
}
start();
