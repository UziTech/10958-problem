const fs = require("fs");

// const ops = ["+", "-", "*", "/", "^", "."];
// ((((((((1 (((((((2) ((((((3)) (((((4))) ((((5)))) (((6))))) ((7)))))) (8))))))) 9))))))))
const possibleParens = [8, 0, 7, 1, 6, 2, 5, 3, 4, 4, 3, 5, 2, 6, 1, 7, 0, 8];
let graph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
try {
	const file = fs.readFileSync("graph.json", { encoding: "utf8" });
	const lastLine = file.substring(file.lastIndexOf("\n") + 1);
	graph = JSON.parse(lastLine);
} catch (ex) {}

console.log("starting graph", graph);

let possibilities = [];

function toString(graph) {
	let n = 1;
	let s = "";
	for (let i = graph.length - 1; i >= 0; i--) {

		if (i % 2 === 1) {
			s += "(".repeat(graph[i]) + n++;
		} else {
			s += ")".repeat(graph[i]);
			if (i > 0) {
				s += " ";
			}
		}
	}
	return s;
}

function isValid(graph) {
	let hasOpen = false;
	let lastOpen = 0;
	let opens = 0;
	for (let i = graph.length - 1; i >= 0; i--) {
		if (i % 2 === 1) {
			opens += graph[i];
			if (graph[i] > 0) {
				lastOpen = graph[i];
				hasOpen = true;
			} else {
				hasOpen = false;
			}
		} else {
			if (lastOpen > 1 && lastOpen >= graph[i]) {
				return false;
			}
			if (hasOpen && graph[i] > 0) {
				return false;
			}
			opens -= graph[i];
			if (opens < 0) {
				return false;
			}
		}
	}
	return opens === 0;
}

function incrementOne(graph) {
	for (let i = graph.length - 1; i >= 0; i--) {
		graph[i]++;
		if (graph[i] > possibleParens[i]) {
			if (i === 0) {
				return false;
			}
			graph[i] = 0;
		} else {
			break;
		}
	}
	return true;
}

function start() {
	const timer = "[" + graph.toString() + "]";
	console.time(timer);
	let count = 100000000;
	let notDone = true;
	do {
		if (isValid(graph)) {
			possibilities.push(toString(graph));
		}
		notDone = incrementOne(graph);
	} while (--count && notDone);

	console.timeEnd(timer);
	if (possibilities.length > 0) {
		fs.appendFile('possibilities.txt', "\n" + possibilities.join("\n"));
	}
	fs.appendFile('graph.json', "\n[" + graph.toString() + "]");
	if (notDone) {
		setTimeout(start, 0);
	}
}
start();
