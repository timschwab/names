#ifndef WORDS_H
#define WORDS_H


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include "readLine.h"
#include "settings.h"
#include "list.h"


void *getDatum(list_t *list, int datum);
void *getRandomDatum(list_t *list);
list_t *loadWordFile(FILE *f);
FILE *locateFile(settings_t settings, char *fileName);
list_t *loadWords(settings_t settings);


#endif
