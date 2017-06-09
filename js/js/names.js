

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
		result += terminal.value();
	});

	return result;
}

function randomElement(list) {
	var n = Math.floor(Math.random() * list.length);
	return list[n];
}



/*
	Nonterminals
*/

class Nonterminal {
	constructor() {
		this.terminal = false;
		this.resolve = () => {
			var objList = [];
			var constructorList = randomElement(this.productions);
			constructorList.forEach((constructor) => {
				objList.push(new constructor);
			});
			return objList;
		};
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
		this.value = () => randomElement(this.values);
	}
}

class Space extends Terminal {
	constructor() {
		super();
		this.values = [" "];
	}
}

class A extends Terminal {
	constructor() {
		super();
		this.values = ["A"];
	}
}

class B extends Terminal {
	constructor() {
		super();
		this.values = ["B"];
	}
}

