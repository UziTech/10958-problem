const fs = require("fs");

// ((((((((1_(((((((2)_((((((3))_(((((4)))_((((5))))_(((6)))))_((7))))))_(8)))))))_9))))))))
const possibleParens = [8, 0, 7, 1, 6, 2, 5, 3, 4, 4, 3, 5, 2, 6, 1, 7, 0, 8];
let graph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
try {
	graph = JSON.parse(fs.readFileSync("graph.json"));
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
				s += "_";
			}
		}
	}
	return s;
}

function isValid(graph) {
	let hasOpen = false;
	let opens = [];
	for (let i = graph.length - 1; i >= 0; i--) {
		if (i % 2 === 1) {
			opens.push(graph[i]);
			if (graph[i] > 0) {
				hasOpen = true;
			} else {
				hasOpen = false;
			}
		} else {
			let closes = graph[i];
			if (closes > 0) {
				if (hasOpen) {
					// prevents `(1)_2...`
					return false;
				}

				for (let j = opens.length - 1; j >= 0; j--) {
					if (opens[j] > 1 && closes > 1) {
						// prevents ((1_2))_3...
						return false;
					} else if (opens[j] >= closes) {
						opens[j] -= closes;
						closes = 0;
						break;
					} else {
						if (j === 0) {
							// prevents `1)_2...`
							return false;
						}
						closes -= opens[j];
						opens[j] = 0;
					}
				}
			}
		}
	}
	return opens.every(num => num === 0);
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
		fs.appendFileSync("possibilities.txt", "\n" + possibilities.join("\n"));
		possibilities = [];
	}
	fs.writeFileSync("graph.json", "[" + graph.toString() + "]");
	if (notDone) {
		setTimeout(start, 0);
	}
}
start();
