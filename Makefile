prerequisites:
	npm install -g complexity-report
	npm install -g jshint
	npm install -g plato

test:
	npm test

jshint:
	jshint index.js lib/*

complexity:
	cr -c 10 -m 65 \
	index.js \
	lib/scrapinode.js lib/scraper.js lib/router.js lib/route.js lib/browser.js \
	lib/utils/index.js \
	lib/error/scrapinode-error.js \
	lib/defaults/index.js

report:
	rm -rf report
	mkdir report
	plato -r -d report index.js lib/*.js lib/defaults/*.js lib/error/*.js lib/utils/index.js

coverage:
	jscoverage lib lib-cov
	SCRAPINODE_COV=1 ./node_modules/.bin/_mocha --reporter html-cov test/*-test.js > coverage.html
	rm -rf lib-cov

ready: jshint complexity test

.PHONY: test report