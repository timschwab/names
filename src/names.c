/*
	The clasic Schwab program. This version loads a settings file which links
	it to all the other required files. It loads a file containing sentence
	forms and then all the word files. Every five seconds, it outputs a random
	sentence form that is filled in appropriately. Once a keystroke is
	registered, the program terminates.
*/

#include "names.h"

int main()
{
	settings_t settings;
	list_t *wordList;
	list_t *formList;
	char *sentence;

	srand(time(NULL));

	pthread_t listener;
	if (pthread_create(&listener, NULL, listen, NULL))
	{
		printf("main_error: Could not create the listener thread\n");
		exit(-1);
	}

	loadSettings(SETTINGS_FILE, &settings);
	wordList = loadWords(settings);
	formList = loadForms(settings);

	printf("Press enter to exit.\n");
	for (;;)
	{
		sentence = generateSentence(formList, wordList);
		printf("%s\n", sentence);
		free(sentence);
		sleep(SECOND_SLEEP);
	}

	return 0;
}
