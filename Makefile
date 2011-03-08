SOURCE=jquery.imgareaselect.dev.js
BASIC=$(SOURCE:.dev.js=.js)
MINIFIED=$(BASIC:.js=.min.js)
PACKED=$(BASIC:.js=.pack.js)

VERSION=$(shell head $(SOURCE) | perl -ne '/version ([0-9.]+)/?{print $$1}:0')
RELEASE=$(BASIC:.js=-$(VERSION))

all: $(BASIC) $(MINIFIED) $(PACKED)

$(BASIC): $(SOURCE)
	../../tools/strip-comments-simple.pl $< > $@

$(MINIFIED): $(BASIC)
	cat $< | perl -I ../../tools/packer2.perl -- \
		../../tools/packer2.perl/jsPacker.michal.pl -q -e0 > $@

$(PACKED): $(BASIC)
	java -cp ../../tools -jar ../../tools/shrinksafe.jar $< \
		| perl -I ../../tools/packer2.perl -- \
		../../tools/packer2.perl/jsPacker.michal.pl -q -e62 > $@

dist: $(BASIC) $(MINIFIED) $(PACKED)
	rm -rf "dist/$(RELEASE)" "dist/$(RELEASE).zip"
	mkdir -p "dist/$(RELEASE)"
	cp -r distfiles/* "dist/$(RELEASE)"
	mkdir -p "dist/$(RELEASE)/scripts"
	cp "$(BASIC)" "$(MINIFIED)" "$(PACKED)" "dist/$(RELEASE)/scripts"
	cd dist && \
		zip -r "$(RELEASE).zip" "$(RELEASE)" && \
		cd -

clean:
	rm "$(BASIC)" "$(MINIFIED)" "$(PACKED)"
