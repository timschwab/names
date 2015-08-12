#include "listen.h"


/*
	Waits for a return and terminates the program when one is found. Is built
	to be executed as a separate thread.
*/
void *listen(void *arg)
{
	getchar();
	exit(0);

	return NULL; /* For the compiler */
}
