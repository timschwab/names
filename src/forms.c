#include "forms.h"


/*
	Load the form file using functions from words.c
*/
list_t *loadForms(settings_t settings)
{
	list_t *forms;
	FILE *f;

	f = locateFile(settings, settings.formFile);
	forms = loadWordFile(f);

	printf("Loaded forms.\n\n");

	return forms;
}

/*
	Replace the symbol found in original with word. Note that it allocates
	memory for the string which must be deallocated later.
*/
char *replaceSymbol(char *original, char *symbol, char *word)
{
	int origLen = strlen(original);
	int symLen = strlen(symbol);
	int wordLen = strlen(word);
	char *result = malloc(origLen - symLen + wordLen + 1);
	char *index = strstr(original, symbol);

	strncpy(result, original, index-original);
	*(result + (index-original)) = '\0'; /* Append a null character for strcat() */
	strcat(result, word);
	strcat(result, index+symLen);

	return result;
}

/*
	Generate a random sentence from the loaded form file and word files. Note
	that it allocates memory for the string which must be deallocated later.
*/
char *generateSentence(list_t *formList, list_t *wordList)
{
	char *sentence;
	char *symbol;
	char *word;
	node_t *wordNode;
	assignment_t *wordAssign;

	sentence = getRandomDatum(formList);
	wordNode = wordList->head;
	while (wordNode != NULL)
	{
		wordAssign = wordNode->datum;
		symbol = wordAssign->left;
		if (strstr(sentence, symbol) != NULL)
		{
			word = getRandomDatum(wordAssign->right);
			sentence = replaceSymbol(sentence, symbol, word);
		}
		else
		{
			wordNode = wordNode->next;
		}
	}

	return sentence;
}
