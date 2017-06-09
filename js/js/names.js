/*
	Global vars

	productions: a list of key-value pairs, where the key is the
	symbol, and the value of a list of replacements
*/
var tokens = new Array();

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
	["<SubjectPhrase> <VerbPhrase>."]));

tokens.push(new Token(
	"<SubjectPhrase>",
	["<Name>", "The <AdjectivePhrase> <Name>", "<Name>, <PrepositionalPhrase>, "]));

tokens.push(new Token(
	"<AdjectivePhrase>",
	["<Adjective>", "<Adverb> <Adjective>"]));

tokens.push(new Token(
	"<PrepositionalPhrase>",
	["<Preposition> the <NounPhrase>"]));

tokens.push(new Token(
	"<NounPhrase>",
	["<Noun>", "<AdjectivePhrase> <Noun>"]));

tokens.push(new Token(
	"<VerbPhrase>",
	["<SimpleVerbPhrase>", "<DirectObjectVerbPhrase>"]));

tokens.push(new Token(
	"<SimpleVerbPhrase>",
	["<Verb>", "<Adverb> <Verb>"]));

tokens.push(new Token(
	"<DirectObjectVerbPhrase>",
	["<DirectObjectVerb> the <NounPhrase>", "<Adverb> <DirectObjectVerb> the <NounPhrase>"]));



/*
	Terminals
*/

tokens.push(new Token(
	"<Name>",
	["Tim", "Ben", "Andrew", "Will", "Dorothy"]));

tokens.push(new Token(
	"<Noun>",
	["octopus", "distraction", "philosopher", "advantage", "wallpaper"]));

tokens.push(new Token(
	"<Verb>",
	["laughs", "complains", "tumbles", "explodes", "leaves the area"]));

tokens.push(new Token(
	"<DirectObjectVerb>",
	["avoids", "does not like", "laughs at", "is perplexed by"]));

tokens.push(new Token(
	"<Adjective>",
	["indescribable", "upside-down", "uncomfortable", "silly", "nauseating", "miniscule"]));

tokens.push(new Token(
	"<Adverb>",
	["tremendously", "awkwardly", "occasionally", "preposterously", "dejectedly"]));

tokens.push(new Token(
	"<Preposition>",
	["with", "amongst", "by means of", "despite", "underneath"]));


