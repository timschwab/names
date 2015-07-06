#include "readLine.h"

/*
	Returns the next line of the file, or NULL on EOF
*/
char *readLine(FILE *f)
{
	char *buf = NULL;
	size_t n = 0;
	int bytesRead;

	if ((bytesRead = getline(&buf, &n, f)) == -1)
		return NULL;

	buf[bytesRead-1] = '\0'; /* Eliminate newline */
	return buf;
}
