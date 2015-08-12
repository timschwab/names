#include "list.h"


/*
	Create a new list
*/
list_t *createList()
{
	list_t *newList;

	newList = malloc(sizeof(list_t));
	newList->count = 0;
	newList->head = NULL;
	newList->tail = NULL;

	return newList;
}

/*
	Add a node to the end of the list
*/
void addDatum(list_t *list, void *datum)
{
	node_t *newNode;

	newNode = malloc(sizeof(node_t));
	newNode->datum = datum;
	newNode->next = NULL;

	if (list->count == 0)
		list->head = newNode;
	else
		list->tail->next = newNode;

	list->tail = newNode;
	list->count++;
}

/*
	Retrievies a pointer to the specified word from the list. Warning: does not
	check for datum > list->count.
*/
void *getDatum(list_t *list, int datum)
{
	int i;
	node_t *node = list->head;

	for (i = 0 ; i < datum ; i++)
		node = node->next;

	return node->datum;
}

/*
	Retrieves a pointer to a random datum from the list
*/
void *getRandomDatum(list_t *list)
{
	int i = rand() % list->count;
	return getDatum(list, i);
}
