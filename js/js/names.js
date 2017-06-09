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
	"<Insult>",
	[
		"<RandomSentence>",
		"<Classic>",
		"<InterjectionInsult>",
		"<PrepositionInsult>",
		"<NeverGetAlongInsult>",
		"<AfraidInsult>",
		"<MoreInsult>",
		"<AroundInsult>"
	]));

tokens.push(new Token(
	"<AroundInsult>",
	["When the <Noun> is around, <Name> is a real <Noun>."]));

tokens.push(new Token(
	"<MoreInsult>",
	["<Name> is more <AdjectivePhrase> than a <NounPhrase>!"]));

tokens.push(new Token(
	"<AfraidInsult>",
	["<Name> is afraid of the <NounPhrase>."]));

tokens.push(new Token(
	"<NeverGetAlongInsult>",
	["<Name> and the <Noun> never get along."]));

tokens.push(new Token(
	"<PrepositionInsult>",
	["I heard that <PrepositionalPhrase>, <Name> always <Verb>."]));

tokens.push(new Token(
	"<InterjectionInsult>",
	["<Interjection>! It's that <Name> again."]));

tokens.push(new Token(
	"<Classic>",
	["<Name> is a <NounPhrase>."]));

tokens.push(new Token(
	"<RandomSentence>",
	["<SubjectPhrase> <VerbPhrase>."]));



/*
	Nonterminals
*/

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
	[
		"Brian Seidel",
		"Eric Ward",
		"Kerry Meade",
		"Chris Bradley",
		"Bruce Brown",
		"Spencer Patrick",
		"Richard Looper",
		"Danny Mecca",
		"Doug MacMillan",
		"Liz George",
		"Gary Lamb",
		"Jack Evans",
		"Charles Tennent",
		"Sabrina Milnes",
		"Robby Flair"
	]));

tokens.push(new Token(
	"<Noun>",
	[
		"octopus",
		"distraction",
		"philosopher",
		"road sign",
		"wallpaper"
	]));

tokens.push(new Token(
	"<Verb>",
	[
		"laughs",
		"complains",
		"tumbles",
		"withers",
		"leaves the area"
	]));

tokens.push(new Token(
	"<DirectObjectVerb>",
	[
		"avoids",
		"does not like",
		"laughs at",
		"is perplexed by"
	]));

tokens.push(new Token(
	"<Adjective>",
	[
		"indescribable",
		"upside-down",
		"uncomfortable",
		"silly",
		"nauseating",
		"tiny"
	]));

tokens.push(new Token(
	"<Adverb>",
	[
		"tremendously",
		"awkwardly",
		"often",
		"preposterously",
		"dejectedly"
	]));

tokens.push(new Token(
	"<Preposition>",
	[
		"with",
		"amongst",
		"by means of",
		"despite",
		"underneath"
	]));

tokens.push(new Token(
	"<Interjection>",
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


