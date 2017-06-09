/*
	Global vars

	productions: a list of key-value pairs, where the key is the
	symbol, and the value of a list of replacements
*/
var tokens = new Array();


/*
	Initialize the list of tokens
*/
function insulterInit(){
	var words;
	$.ajax({
    type: "POST",
    url: "php/get-data.php",
    success : function(result){
    	words = JSON.parse(result);
		  for(var key in words){
		  	if(words.hasOwnProperty(key)){
		  		tokens.push(new Token(key, words[key]));
		  	}
		  }
		}
  });
}

/*
	Main function

	Begin with the top-level token, <insult>. Then iterate through all the
	tokens, to try and find tokens to repace. Does this over and over until
	no tokens are found. It is an implementation of a standard context-free
	grammar.
*/
function generateInsult() {
	var insult = "<insult>";
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

function Token(key, values) {
	this.key = key;
	this.values = values;
	this.resolve = () => {
		return randomElement(this.values);
	}
}



/*
	Sentence forms
*/

tokens.push(new Token(
	"<insult>",
	[
		"<randomSentence>",
		"<classic>",
		"<interjectionInsult>",
		"<prepositionInsult>",
		"<neverGetAlongInsult>",
		"<afraidInsult>",
		"<moreInsult>",
		"<aroundInsult>",
		"<oneWordInsult>",
		"<cannotInsult>",
		"<worthyInsult>"
	]));

tokens.push(new Token(
	"<worthyInsult>",
	["<name> is not even <adjectivePhrase> enough to be called a <noun>."]));

tokens.push(new Token(
	"<cannotInsult>",
	["<name>'s <noun> is so <adjectivePhrase>, I cannot begin to <directObjectVerbPhrase>."]));

tokens.push(new Token(
	"<oneWordInsult>",
	["<name> is such a <nounPhrase>."]));

tokens.push(new Token(
	"<aroundInsult>",
	["When the <noun> is around, <name> is a real <noun>."]));

tokens.push(new Token(
	"<moreInsult>",
	["<name> is more <adjectivePhrase> than a <nounPhrase>!"]));

tokens.push(new Token(
	"<afraidInsult>",
	["<name> is afraid of the <nounPhrase>."]));

tokens.push(new Token(
	"<neverGetAlongInsult>",
	["<name> and the <noun> never get along."]));

tokens.push(new Token(
	"<prepositionInsult>",
	["I heard that <prepositionalPhrase>, <name> always <verb>."]));

tokens.push(new Token(
	"<interjectionInsult>",
	["<interjection>! It's that <name> again."]));

tokens.push(new Token(
	"<classic>",
	["<name> is a <nounPhrase>."]));

tokens.push(new Token(
	"<randomSentence>",
	["<subjectPhrase> <verbPhrase>."]));



/*
	Nonterminals
*/

tokens.push(new Token(
	"<subjectPhrase>",
	["<name>", "The <adjectivePhrase> <name>", "<name>, <prepositionalPhrase>, "]));

tokens.push(new Token(
	"<adjectivePhrase>",
	["<adjective>", "<adverb> <adjective>"]));

tokens.push(new Token(
	"<prepositionalPhrase>",
	["<preposition> the <nounPhrase>"]));

tokens.push(new Token(
	"<nounPhrase>",
	["<noun>", "<adjectivePhrase> <noun>"]));

tokens.push(new Token(
	"<verbPhrase>",
	["<simpleVerbPhrase>", "<directObjectVerbPhrase>"]));

tokens.push(new Token(
	"<simpleVerbPhrase>",
	["<verb>", "<adverb> <verb>"]));

tokens.push(new Token(
	"<directObjectVerbPhrase>",
	["<directObjectVerb> the <nounPhrase>"]));



/*
	Terminals. These will all be moved to the database.
*/

tokens.push(new Token(
	"<name>",
	["Tim", "Ben"]));

tokens.push(new Token(
	"<noun>",
	[
		"octopus",
		"distraction",
		"philosopher",
		"road sign",
		"wallpaper"
	]));

tokens.push(new Token(
	"<verb>",
	[
		"laughs",
		"complains",
		"tumbles",
		"withers",
		"leaves the area"
	]));

tokens.push(new Token(
	"<directObjectVerb>",
	[
		"avoids",
		"does not like",
		"laughs at",
		"is perplexed by"
	]));

tokens.push(new Token(
	"<adjective>",
	[
		"indescribable",
		"upside-down",
		"uncomfortable",
		"silly",
		"nauseating",
		"tiny"
	]));

tokens.push(new Token(
	"<adverb>",
	[
		"tremendously",
		"awkwardly",
		"often",
		"preposterously",
		"dejectedly"
	]));

tokens.push(new Token(
	"<preposition>",
	[
		"with",
		"amongst",
		"by means of",
		"despite",
		"underneath"
	]));

tokens.push(new Token(
	"<interjection>",
	[
		"Great googly moogly",
		"Oh my",
		"Well, I never",
		"Would you look at that",
		"Zounds",
		"Lab rats",
		"Poppy seeds",
		"Ah",
		"Can you imagine",
		"I can't even"
	]));


