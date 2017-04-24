const fs = require("fs");

const ops = ["+", "'", "*", "/", "^", "|"];
console.time("readfile");
const possibilities = fs.readFileSync("../step2/possibilities.txt", { encoding: "utf8" }).split("\n");
console.timeEnd("readfile");

let total = possibilities.length;
let line = 0;
let numbers = [];

let operations = [0, 0, 0, 0, 0, 0, 0, 0];

const parenRegex = /\(([^()]+)\)/;
const concatRegex = /([-\d.]+)\|([-\d.]+)/;
const potentRegex = /([-\d.]+)\^([-\d.]+)/;
const multiplyDivideRegex = /([-\d.]+)(\*|\/)([-\d.]+)/;
const addSubtractRegex = /([-\d.]+)(\+|')([-\d.]+)/;
// const numRegex = /^[-\d.]+$/;

function evaluate(expression) {
	let match = null;
	let num;
	do {
		// evaluate parentheses
		match = expression.match(parenRegex);
		if (match) {
			num = evaluate(match[1]);
			expression = expression.replace(match[0], num);
		}
	} while (match);

	do {
		// evaluate concatination
		match = expression.match(concatRegex);
		if (match) {
			num = "" + match[1] + match[2];
			expression = expression.replace(match[0], num);
		}
	} while (match);

	do {
		// evaluate potentiation
		match = expression.match(potentRegex);
		if (match) {
			num = Math.pow(+match[1], +match[2]);
			expression = expression.replace(match[0], num);
		}
	} while (match);

	do {
		// evaluate multiplication and division
		match = expression.match(multiplyDivideRegex);
		if (match) {
			if (match[2] === "*") {
				num = +match[1] * +match[3];
			} else {
				num = +match[1] / +match[3];
			}
			expression = expression.replace(match[0], num);
		}
	} while (match);

	do {
		// evaluate addition and subtraction
		match = expression.match(addSubtractRegex);
		if (match) {
			if (match[2] === "+") {
				num = +match[1] + +match[3];
			} else {
				num = +match[1] - +match[3];
			}
			expression = expression.replace(match[0], num);
		}
	} while (match);

	return expression;
}

function toString(combination) {
	for (let i = operations.length - 1; i >= 0; i--) {
		combination = combination.replace("_", ops[operations[i]]);
	}

	return combination;
}

function incrementOne() {
	for (let i = operations.length - 1; i >= 0; i--) {
		operations[i]++;
		if (operations[i] > 5) {
			if (i === 0) {
				operations.fill(0);
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
	let expression;
	do {
		expression = toString(combination);
		num = evaluate(expression);
		if (!/\D/.test(num)) {
			numbers.push(expression + " = " + num);
			if (+num === 10958) {
				console.log(expression + " = " + num);
			}
		}
	}
	while (incrementOne());
	console.timeEnd(combination);
	if (numbers.length > 0) {
		fs.appendFileSync("./numbers.txt", "\n" + numbers.join("\n"));
		console.log(numbers.length);
		numbers = [];
	}

	if (++line < total) {
		setTimeout(start, 0);
	}
}
start();
