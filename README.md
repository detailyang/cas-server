# CAS: center authorization server


CAS (pronounced *case*) is an **authorization server**.
Its goal is to make application authorization as easy as possible.It provides a restful api and ldap support (cas-ldap is be used to support ldap protocol over restful api [RFC 4511](https://tools.ietf.org/html/rfc4511)). CAS can be used to integrate with software which on support restful api or support ldap, and it have used to integrate gitlab、jira、confluence、jenkins、gerrit, vpn device, phabricator.

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![MIT licensed][shield-license]](#)


Table of Contents
-----------------

  * [Requirements](#requirements)
  * [Development](#Development)
  * [Production](#production)
  * [Contributing](#contributing)
  * [License](#license)


Requirements
------------

CAS requires the following to run:

  * [Node.js][node] 0.1-5, (personally recommand latest release version)
  * [Npm][npm] (normally comes with Node.js)
  * [Redis][redis] >2.8 (use redis as session store and message queue)
  * [Mysql][mysql] (persisted database)


Development
-----------
look at config.js, setting the redis and mysql option
```sh
npm install # to install nodejs dependencies
NODE_ENV=dev node scripts/init_table.js # init mysql table
NODE_ENV=dev node scripts/create_user.js --username admin --admin # create first user
NODE_ENV=dev node webpack-dev-server.js # to start up webpack server for develop
NODE_ENV=dev node babel.index.js # to use koa2
```
Then you can open the http://127.0.0.1:3000 to login


Production
-----------
```sh
npm install --production
NODE_ENV=production node scripts/init_table.js # init mysql table
NODE_ENV=production node scripts/create_user.js --username admin --admin # create first user
NODE_ENV=production node babel.index.js # to use koa2
```



Contributing
------------

To contribute to Cas, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code before opening a pull-request


License
-------

CAS is licensed under the [MIT](#) license.  
Copyright &copy; 2016



[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[mysql]: https://www.mysql.com/
[redis]: http://redis.io/
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–5-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v3.2.0-blue.svg
