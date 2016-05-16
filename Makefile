# @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
# @Date:   2016-04-30T19:31:45+08:00
# @Email:  detailyang@gmail.com
# @Last modified by:   detailyang
# @Last modified time: 2016-04-30T20:47:21+08:00
# @License: The MIT License (MIT)


TESTS = test/babel.index.js
TIMEOUT = 5000
.PHONY: test cover-test pre-test

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
cover-test:
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha \
		--report lcovonly \
		-- -R spec \
		-t $(TIMEOUT) \
		&& cat ./coverage/lcov.info \
		| ./node_modules/coveralls/bin/coveralls.js
pre-test:
	@NODE_ENV=test node scripts/init_table.js
	@NODE_ENV=test node scripts/create_user.js --id 1 --username admin --admin
	mysql -D cas -e "INSERT INTO \`oauth\` (\`id\`, \`name\`, \`secret\`, \`identify\`, \`domain\`, \`desc\`, \`callback\`, \`callback_debug\`, \`is_admin\`, \`is_received\`, \`is_delete\`, \`type\`, \`created_at\`, \`updated_at\`) VALUES (1, 'test', 'a067b5ce-48b6-4494-ae2e-9613ff3eb238', 'ea10ae8d-7b43-4e32-9c71-3f0448842147', 'test.com', 'test', 'http://test.com/callback', 'http://test.com/callbackdebug', 1, 1, 0, 0, '2016-05-01 11:46:01', '2016-05-01 11:46:01');"
