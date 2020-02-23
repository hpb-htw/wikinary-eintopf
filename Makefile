MAIN=lib/index.js
SRC_TS=$(wildcard src/*.ts)

.PHONY:all
all: main

.PHONY:main
main: $(MAIN)

$(MAIN): $(SRC_TS)
	tsc -p ./


.PHONY:clean
clean:
	rm -rf lib

.PHONY: refresh
refresh:
	rm -rf ./node_modules ./package-lock.json
	npm install
