##### CONFIGURATION ####
JEST        = npx jest
JEST_OPT    = --maxWorkers=4 --no-colors --no-cache --no-watchman

#### Target ####
MAIN=lib/index.js
SRC_TS=$(wildcard src/*.ts)
TEST_TS=$(wildcard src/tests/*.ts)
PROFILES_FILE=wikinary.cpuprofile
JS_PROFILES_FILE=wikinary-js.cpuprofile

# executable binary
BIN_DIR         =bin

EXECUTE_DIR     :=$(BIN_DIR)/
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
	EXECUTE_DIR +=Linux-x86_64
endif
ifeq ($(UNAME_S),Darwin)
	EXECUTE_DIR +=Darwin-x86_64
endif
UNAME_P := $(shell uname -p)
ifeq ($(UNAME_P),x86_64)
	#Not support EXECUTE_DIR +=x86_64
endif
ifneq ($(filter %86,$(UNAME_P)),)
	#Not suported
endif
ifneq ($(filter arm%,$(UNAME_P)),)
	#Not suported
endif
space :=
space +=
DXTIONARY_DB    :=$(subst $(space),,$(strip $(EXECUTE_DIR)/dxtionary-db))
IMPORT_RAW_DICT :=$(subst $(space),,$(strip $(EXECUTE_DIR)/import-raw-dict))


# test data
DATA_DIR           = test-data
SMALL_CSV_GZ       = $(DATA_DIR)/dewiktionary.csv.gz
SMALL_DICT_SQLITE  = $(DATA_DIR)/dict.sqlite


.PHONY:all
all: main test coverage/lcov.info

.PHONY:main
main: $(MAIN)

$(MAIN): $(SRC_TS)
	npx tsc -p ./

.PHONY:test
test: $(SRC_TS) $(TEST_TS) $(DXTIONARY_DB) $(SMALL_DICT_SQLITE)
	$(JEST) $(JEST_OPT) --config jest.config.js


$(DXTIONARY_DB):
	make bin

$(IMPORT_RAW_DICT):
	make bin

.PHONY:bin
bin:
	@echo "+======================================================+"
	@echo "* Make sure to deploy project dxtionary-db in AppVoyer *"
	@echo "+======================================================+"
	curl -L -o Release.tar.gz https://github.com/hpb-htw/dxtionary-db/raw/bin/bin/Release.tar.gz
	@mkdir -p $(BIN_DIR)
	tar xfz Release.tar.gz -C $(BIN_DIR) --strip 1
	rm -f Release.tar.gz
	chmod +x $(DXTIONARY_DB) $(IMPORT_RAW_DICT)

$(SMALL_DICT_SQLITE): $(IMPORT_RAW_DICT) $(SMALL_CSV_GZ)
	rm -f $(SMALL_DICT_SQLITE)
	$(IMPORT_RAW_DICT) $(SMALL_DICT_SQLITE) $(SMALL_CSV_GZ)


coverage/lcov.info:
	$(JEST) $(JEST_OPT) --config jest-covery.config.js


profiling:
	node -r ts-node/register -r tsconfig-paths --cpu-prof --cpu-prof-name=$(PROFILES_FILE) ./src/wikinary.ts
	
jsprofiling:
	node --cpu-prof --cpu-prof-name=$(JS_PROFILES_FILE) ./lib/wikinary.js

.PHONY:debug
debug:
	node --inspect-brk node_modules/.bin/jest -runInBand $(JETS_OPT) --config jest.config.js

.PHONY:clean
clean:
	rm -rf lib $(BIN_DIR) $(SMALL_DICT_SQLITE) $(PROFILES_FILE)

.PHONY: refresh
refresh:
	make clean
	rm -rf ./node_modules ./package-lock.json
	npm install
