MAIN=lib/index.js
SRC_TS=$(wildcard src/*.ts)
TEST_TS=$(wildcard src/tests/*.ts)

# executable binary
BIN_DIR         =bin
DXTIONARY_DB    =bin/Linux-x86_64/dxtionary-db
IMPORT_RAW_DICT =bin/Linux-x86_64/import-raw-dict

# test data
DATA_DIR           = test-data
SMALL_CSV_GZ       = $(DATA_DIR)/dewiktionary.csv.gz
SMALL_DICT_SQLITE  = $(DATA_DIR)/dict.sqlite


.PHONY:all
all: main test

.PHONY:main
main: $(MAIN)

$(MAIN): $(SRC_TS)
	npx tsc -p ./

.PHONY:test
test: $(SRC_TS) $(TEST_TS) $(DXTIONARY_DB) $(SMALL_DICT_SQLITE)
	npx jest --config jest.config.js


$(DXTIONARY_DB):
	make bin

$(IMPORT_RAW_DICT):
	make bin

.PHONY:bin
bin:
	@echo "+======================================================+"
	@echo "* Make sure to deploy project dxtionary-db in AppVoyer *"
	@echo "+======================================================+"
	curl -L -o /tmp/Release.tar.gz https://github.com/hpb-htw/dxtionary-db/raw/bin/bin/Release.tar.gz
	@mkdir -p $(BIN_DIR)
	tar xfz /tmp/Release.tar.gz -C $(BIN_DIR) --strip 1
	rm -f /tmp/Release.tar.gz
	chmod +x $(DXTIONARY_DB) $(IMPORT_RAW_DICT)

$(SMALL_DICT_SQLITE): $(IMPORT_RAW_DICT) $(SMALL_CSV_GZ)
	rm -f $(SMALL_DICT_SQLITE)
	$(IMPORT_RAW_DICT) $(SMALL_DICT_SQLITE) $(SMALL_CSV_GZ)

.PHONY:clean
clean:
	rm -rf lib

.PHONY: refresh
refresh:
	rm -rf ./node_modules ./package-lock.json
	npm install
