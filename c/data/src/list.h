#ifndef LIST_H
#define LIST_H


#include <stdio.h>
#include <stdlib.h>


typedef struct node_type
{
	struct node_type *next;
	void *datum;
} node_t;

typedef struct list_type
{
	int count;
	node_t *head;
	node_t *tail;
} list_t;


list_t *createList();
void addDatum(list_t *list, void *datum);
void *getDatum(list_t *list, int datum);
void *getRandomDatum(list_t *list);


#endif
