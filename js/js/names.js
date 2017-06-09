/*
	Global vars

	productions: a list of key-value pairs, where the key is the
	symbol, and the value of a list of replacements
*/
var tokens = new Array();


/*
	Main function
*/

function generateInsult() {
	var insult = "<Insult>";
	var allTerminals = false;
	while (!allTerminals) {
		allTerminals = true
		tokens.forEach((token) => {
			if (insult.includes(token.key)) {
				allTerminals = false;
				insult = insult.replace(token.key, token.resolve());
			}
		});
	}

	return insult;
}

function randomElement(list) {
	var n = Math.floor(Math.random() * list.length);
	return list[n];
}


/*
	Nonterminals
*/

function Token(key, values) {
	this.key = key;
	this.values = values;
	this.resolve = () => {
		return randomElement(this.values);
	}
}

tokens.push(new Token(
	"<Insult>",
	["<Insult> <Insult>", "A", "B"]));







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


