start:
	npm run start
publish:
	npm run prepublishOnly
	npm publish --dry-run
prepublishOnly:
	make build
	npm run prepublishOnly
build:
	rm -rf dist
	rm -rf /home/danylo/page/*
	npm run build
test:
	npm test
test-watch:
	npx jest --watch
test-covegare:
	npx jest --coverage
lint:
	npx eslint .
