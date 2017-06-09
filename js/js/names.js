

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
			[SubjectPhrase, Space, VerbPhrase, Punctuation]
		];
	}
}

class SubjectPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[Name],
			[CapitalThe, Space, AdjectivePhrase, Space, Name],
			[Name, Comma, Space, PrepositionalPhrase, Comma, Space]
		];
	}
}

class AdjectivePhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[Adjective],
			[Adverb, Space, Adjective]
		];
	}
}

class PrepositionalPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[Preposition, Space, The, Space, NounPhrase]
		];
	}
}

class NounPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[Noun],
			[AdjectivePhrase, Space, Noun]
		];
	}
}

class VerbPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[SimpleVerbPhrase],
			[DirectObjectVerbPhrase]
		];
	}
}

class SimpleVerbPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[Verb],
			[Adverb, Space, Verb],
			[Verb, Space, Adverb]
		];
	}
}

class DirectObjectVerbPhrase extends Nonterminal {
	constructor() {
		super();
		this.productions =
		[
			[DirectObjectVerb, Space, The, Space, NounPhrase],
			[Adverb, Space, DirectObjectVerb, Space, The, Space, NounPhrase]
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

class Punctuation extends Terminal {
	constructor() {
		super();
		this.values = ["."];
	}
}

class Comma extends Terminal {
	constructor() {
		super();
		this.values = [","];
	}
}

class The extends Terminal {
	constructor() {
		super();
		this.values = ["the"];
	}
}

class CapitalThe extends Terminal {
	constructor() {
		super();
		this.values = ["The"];
	}
}

class Name extends Terminal {
	constructor() {
		super();
		this.values = [
			"Tim",
			"Ben",
			"Andrew",
			"Will",
			"Dorothy"
		];
	}
}

class Noun extends Terminal {
	constructor() {
		super();
		this.values = [
			"octopus",
			"distraction",
			"philosopher",
			"advantage",
			"wallpaper"
		];
	}
}

class Verb extends Terminal {
	constructor() {
		super();
		this.values = [
			"laughs",
			"whines",
			"tumbles",
			"explodes",
			"leaves the area"
		];
	}
}

class DirectObjectVerb extends Terminal {
	constructor() {
		super();
		this.values = [
			"avoids",
			"does not like",
			"laughs at",
			"is perplexed by",
			"is"
		];
	}
}

class Adjective extends Terminal {
	constructor() {
		super();
		this.values = [
			"indescribable",
			"upside-down",
			"uncomfortable",
			"silly",
			"nauseating",
			"miniscule"
		];
	}
}

class Adverb extends Terminal {
	constructor() {
		super();
		this.values = [
			"tremendously",
			"awkwardly",
			"occasionally",
			"preposterously",
			"quite",
			"dejectedly"
		];
	}
}

class Preposition extends Terminal {
	constructor() {
		super();
		this.values = [
			"with",
			"amongst",
			"by means of",
			"despite",
			"underneath"
		];
	}
}


