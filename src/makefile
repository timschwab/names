CC = gcc
CFLAGS = -c -Wall

OBJS = \
	names.o \
	settings.o \
	words.o \
	list.o \
	readLine.o \
	forms.o \
	listen.o

INCS = \
	names.h \
	settings.h \
	words.h \
	list.h \
	readLine.h \
	forms.h \
	listen.h


../names: ${OBJS}
	gcc -Wall -pthread -o $@ $(OBJS)

${OBJS}: ${INCS} makefile

clean:
	rm *.o ../names

test:
	../names
