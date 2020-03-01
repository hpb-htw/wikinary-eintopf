MAIN=lib/index.js
SRC_TS=$(wildcard src/*.ts)
TEST_TS=$(wildcard src/tests/*.ts)

.PHONY:all
all: main test

.PHONY:main
main: $(MAIN)

$(MAIN): $(SRC_TS)
	tsc -p ./

.PHONY:test
test: $(SRC_TS) $(TEST_TS)
	npx jest --config jest.config.js

.PHONY:clean
clean:
	rm -rf lib

.PHONY: refresh
refresh:
	rm -rf ./node_modules ./package-lock.json
	npm install
