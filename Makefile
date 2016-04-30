# @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
# @Date:   2016-04-30T19:31:45+08:00
# @Email:  detailyang@gmail.com
# @Last modified by:   detailyang
# @Last modified time: 2016-04-30T19:47:35+08:00
# @License: The MIT License (MIT)


TESTS = test/babel.index.js
.PHONY: test

test:
		@NODE_ENV=test node \
			./node_modules/.bin/_mocha \
			$(REQUIRED) \
			$(TESTS) \
			--bail
