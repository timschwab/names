CC = gcc
CFLAGS = -c -Wall

OBJS = \
	src/names.o \
	src/settings.o \
	src/words.o \
	src/list.o \
	src/readLine.o \
	src/forms.o \
	src/listen.o

INCS = \
	src/names.h \
	src/settings.h \
	src/words.h \
	src/list.h \
	src/readLine.h \
	src/forms.h \
	src/listen.h


names: ${OBJS}
	gcc -Wall -pthread -o $@ $(OBJS)

${OBJS}: ${INCS} makefile

clean:
	rm src/*.o names

test:
	names
