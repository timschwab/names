#include "settings.h"


/*
	Makes a new assignment from the left and right values
*/
assignment_t *makeAssign(void *left, void *right)
{
	assignment_t *assign = malloc(sizeof(assignment_t));
	assign->left = left;
	assign->right = right;

	return assign;
}

/*
	Load the folders into settings
*/
void loadFolders(FILE *f, settings_t *settings)
{
	settings->folders = createList();
	char *buf = readLine(f);

	while (buf != NULL)
	{
		addDatum(settings->folders, buf);

		buf = readLine(f);
		if (strcmp(buf, "") == 0)
			buf = NULL;
	}
}

/*
	Load the sentence file into settings
*/
void loadFormFile(FILE *f, settings_t *settings)
{
	char *buf = readLine(f);

	if (buf == NULL)
	{
		fprintf(stderr, "loadForms_error: Premature end of file\n");
		exit(-1);
	}

	settings->formFile = buf;
	buf = readLine(f);

	if (strcmp(buf, "") != 0)
	{
		fprintf(stderr, "loadForms_error: Unexpected string: %s\n", buf);
		exit(-1);
	}
}

/*
	Load the word files into settings
*/
void loadWordFiles(FILE *f, settings_t *settings)
{
	settings->wordFiles = createList();
	char *buf = readLine(f);
	char *equal;
	assignment_t *assign;

	while (buf != NULL)
	{
		if (strcmp(buf, "") != 0)
		{
			if ((equal = strchr(buf, '=')) != NULL)
			{
				*equal = '\0'; /* Split the string at the = */
				assign = makeAssign(buf, equal+1);
				addDatum(settings->wordFiles, assign);
			}
			else
			{
				fprintf(stderr, "loadWords_error: Assignment did not have an equals sign: %s\n", buf);
				exit(-1);
			}

			buf = readLine(f);
		}
	}
}

/*
	Load the settings file
*/
void loadSettings(char *fileName, settings_t *settings)
{
	FILE *f;
	char *buf;
	int sectionCheck;

	if ((f = fopen(fileName, "r")) == NULL)
	{
		fprintf(stderr, "loadSettings_error: Could not open %s.\n", fileName);
		exit(-1);
	}

	sectionCheck = 0;
	while ((buf = readLine(f)) != NULL)
	{
		if (buf[0] == '#')
		{
			/* Ignore the comment */
		}
		else if (strcmp(buf, "[folders]") == 0)
		{
			loadFolders(f, settings);
			sectionCheck = sectionCheck | 1;
			printf("Loaded folder names.\n");
		}
		else if (strcmp(buf, "[formFile]") == 0)
		{
			loadFormFile(f, settings);
			sectionCheck = sectionCheck | 2;
			printf("Loaded form file name.\n");
		}
		else if (strcmp(buf, "[wordFiles]") == 0)
		{
			loadWordFiles(f, settings);
			sectionCheck = sectionCheck | 4;
			printf("Loaded word file names.\n");
		}
		else
		{
			fprintf(stderr, "loadSettings_error: Unexpected string: %s\n", buf);
			exit(-1);
		}
	}

	if (sectionCheck != 7)
	{
		if (!(sectionCheck & 1))
			fprintf(stderr, "loadSettings_error: Missing folders section\n");
		if (!(sectionCheck & 2))
			fprintf(stderr, "loadSettings_error: Missing forms section\n");
		if (!(sectionCheck & 4))
			fprintf(stderr, "loadSettings_error: Missing words section\n");

		exit(-1);
	}

	printf("Loaded settings.\n\n");
	fclose(f);
}
