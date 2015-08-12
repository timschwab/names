#ifndef FORMS_H
#define FORMS_H


#include <stdio.h>
#include <stdlib.h>
#include "list.h"
#include "words.h"


list_t *loadForms(settings_t settings);
char *generateSentence(list_t *formList, list_t *wordList);


#endif
