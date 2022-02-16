SRC_DIR=src
TEMPLATE_DIR=template

$(SRC_DIR)/%:
	mkdir -p $@

login:
	clasp login --no-localhost

create-%: $(SRC_DIR)/%
	clasp create --type sheets --rootDir $^ --title $(patsubst create-%,%,$@)
	cp $(TEMPLATE_DIR)/main.ts $^/

import-%: $(SRC_DIR)/%
	clasp clone $(SCRIPTID) --rootDir $^
	rm $^/*.js

delete-%: $(SRC_DIR)/%
	rm -r $^

env-%: $(SRC_DIR)/%
	cp $^/.clasp.json ./

push-%: $(SRC_DIR)/% env-%
	clasp push

export-%: push-% url-%
	:

url-%: $(SRC_DIR)/% env-%
	cat .clasp.json | jq .scriptId | xargs -I{} echo "https://script.google.com/d/{}/edit"
	cat .clasp.json | jq .parentId[0] | xargs -I{} echo "https://docs.google.com/spreadsheets/d/{}/edit"