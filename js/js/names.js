

/*
	Entry point
*/

function generateInsult() {
	var terminals = runProductions([new Insult]);
	var insult = resolveTerminals(terminals);

	return insult;
}



/*
	Logic
*/

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
		result += terminal.value;
	});

	return result;
}

function selectProduction(productions) {
	var n = Math.floor(Math.random() * productions.length);
	var constructorList = productions[n];
	var objList = [];
	constructorList.forEach((constructor) => {
		objList.push(new constructor);
	});
	return objList;
}



/*
	Nonterminals
*/

class Nonterminal {
	constructor() {
		this.terminal = false;
		this.resolve = () => selectProduction(this.productions);
	}
}

class Insult extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[A],
			[B],
			[Insult, Space, Insult]
		];
	}
}



/*
	Terminals
*/

class Terminal {
	constructor() {
		this.terminal = true;
	}
}

class Space extends Terminal {
	constructor() {
		super();
		this.value = " ";
	}
}

class A extends Terminal {
	constructor() {
		super();
		this.value = "A";
	}
}

class B extends Terminal {
	constructor() {
		super();
		this.value = "B";
	}
}

