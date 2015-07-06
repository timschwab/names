#include "words.h"


/*
	Load a file full of words into a list_t
*/
list_t *loadWordFile(FILE *f)
{
	list_t *list = createList();
	char *datum;

	while ((datum = readLine(f)) != NULL)
		addDatum(list, datum);

	return list;
}

/*
	Locate and open fileName among the folders in settings
*/
FILE *locateFile(settings_t settings, char *fileName)
{
	node_t *dirNode = settings.folders->head;
	char *fullPath;
	FILE *f;

	while (dirNode != NULL)
	{
		fullPath = malloc(strlen(dirNode->datum) + strlen(fileName) + 1);
		strcpy(fullPath, dirNode->datum);
		strcat(fullPath, fileName);
		if ((f = fopen(fullPath, "r")) != NULL)
		{
			dirNode = NULL;
		}
		else
		{
			free(fullPath);
			dirNode = dirNode->next;
		}
	}

	if (f == NULL)
	{
		fprintf(stderr, "locateFile_error: Could not locate %s\n", fileName);
		exit(-1);
	}

	return f;
}

/*
	Create and return a list that is ready for use with the sentence forms. For
	each node in the settings.wordFiles list, create a node whose left is the
	settings left (for example, %m) and whose right is the associated word list.
*/
list_t *loadWords(settings_t settings)
{
	/* Variables used to create the list */
	list_t *wordList = createList();
	assignment_t *wordAssignment;
	list_t *wordFile;
	FILE *f;

	/* Variables from settings */
	node_t *settingNode = settings.wordFiles->head;
	assignment_t *settingAssignment;
	char *settingFile;

	/* Load every node in settings.wordFiles */
	while (settingNode != NULL)
	{
		settingAssignment = settingNode->datum;
		settingFile = settingAssignment->right;

		f = locateFile(settings, settingFile);
		wordFile = loadWordFile(f);
		fclose(f);

		wordAssignment = makeAssign(settingAssignment->left, wordFile);
		addDatum(wordList, wordAssignment);

		settingNode = settingNode->next;
		printf("Loaded %s\n", settingFile);
	}

	printf("Loaded the word files.\n\n");
	return wordList;
}
