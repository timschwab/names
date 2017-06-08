var temp = true;

/* Entry point */
function generateInsult() {
	var terminals = runProductions([new Insult()]);
	var insult = resolveTerminals(terminals);

	return insult;
}

function runProductions(list) {
	var newList = new Array();
	var allTerminals = true;

	list.forEach((symbol) => {
		if (symbol.terminal) {
			newList.push(symbol);
		} else {
			allTerminals = false;
			newList = newList.concat(symbol.resolve());
		}
	});

	if (allTerminals)
		return newList;
	else
		return runProductions(newList);
}

function resolveTerminals(list) {
	var result = "";
	list.forEach((terminal) => {
		result += terminal.resolve();
	});

	return result;
}



/*
	PRODUCTIONS
*/

function Insult() {
	this.terminal = false;
	this.resolve = () => {
		var n = Math.random();
		if (n < 0.333)
			return [new A()];
		else if (n < 0.667)
			return [new B()];
		else
			return [new Insult(), new Space(), new Insult()];
	};
}

function Space() {
	this.terminal = true;
	this.resolve = () => {
		return " ";
	};
}

function A() {
	this.terminal = true;
	this.resolve = () => {
		return "AAAAA";
	};
}

function B() {
	this.terminal = true;
	this.resolve = () => {
		return "BBBBB";
	};
}


