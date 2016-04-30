# @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
# @Date:   2016-04-30T19:31:45+08:00
# @Email:  detailyang@gmail.com
# @Last modified by:   detailyang
# @Last modified time: 2016-04-30T20:47:21+08:00
# @License: The MIT License (MIT)


TESTS = test/babel.index.js
TIMEOUT = 5000
.PHONY: test

test:
		@NODE_ENV=test node \
			./node_modules/.bin/istanbul cover \
			./node_modules/.bin/_mocha \
			--report lcovonly \
			-- -u exports \
			-t $(TIMEOUT) \
			$(REQUIRED) \
			$(TESTS) \
			--bail
pre-test:
		@NODE_ENV=test node scripts/init_table.js
		@NODE_ENV=test node scripts/create_user.js --id 1 --username admin --admin
