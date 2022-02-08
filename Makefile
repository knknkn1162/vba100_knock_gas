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

export-%: $(SRC_DIR)/%
	cp $^/.clasp.json ./
	clasp push
	clasp open
