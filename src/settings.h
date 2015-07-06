#ifndef SETTINGS_H
#define SETTINGS_H


#include <stdio.h>
#include <string.h>
#include "readLine.h"
#include "list.h"


/*
	left - the left side of the =
	right - the right side
*/
typedef struct assignment_type
{
	void *left;
	void *right;
} assignment_t;

/*
	folders - the (char *) list of folders that contain data
	formFile - the file that has the sentence forms
	words - the (assignment_t *) list of what each symbol represents
*/
typedef struct setting_type
{
	list_t *folders;
	char *formFile;
	list_t *wordFiles;
} settings_t;


assignment_t* makeAssign(void *left, void *right);
void loadSettings(char *fileName, settings_t *settings);


#endif
