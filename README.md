****************************************
CAS: center authorization server
****************************************

CAS (pronounced *case*) is a **authorization server**.
Its goal is to make application authorization as easy as possible.It provides a restful api and ldap support (cas-ldap is be used to support ldap protocol over restful api [RFC 4511](https://tools.ietf.org/html/rfc4511)). CAS can be used to integrate with software which on support restful api or support ldap, and we have used to integrate gitlab、jira、confluence、jenkins、gerrit, vpn device, phabricator and some application developed by ourself.

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![Build status][shield-build]](#)
[![Code coverage][shield-coverage]](#)
[![Dependencies][shield-dependencies]](#)
[![MIT licensed][shield-license]](#)

```js
paddington.pad('foo', 5, '_');   // _foo_
paddington.left('foo', 5, '_');  // __foo
paddington.right('foo', 5, '_'); // foo__
```


Table of Contents
-----------------

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Support and Migration](#support-and-migration)
  * [License](#license)


Requirements
------------
CAS requires the following to run:
  * [Node.js][node] 0.1-5, (personally recommand latest release version)
  * [Npm][npm] (normally comes with Node.js)
  * [Redis][redis] 2.8 (use redis as session store and queue)
  * [Mysql][mysql] (persisted database)

Usage
-----

development:
```sh
npm install
NODE_ENV=dev node webpack-dev-server.js # to start up webpack server for develop
NODE_ENV=dev node babel.index.js # to use koa2
```

Then you can load the module into your code with a `require` call:

```js
var paddington = require('paddington');
```

The `paddington` object has the following methods.

### `paddington.pad( string, length [, character = ' '] )`

Pad a string, distributing the padding equally on the left and right.

`string` is the string we want to pad (_String_).  
`length` is the length we want to pad it to (_Number_).  
`character` is an optional character to pad with (_String_, defaults to `" "`).  
`return` is the padded string (_String_).

```js
// Example
paddington.pad('foo', 5); // returns " foo "
paddington.pad('foo', 5, '_'); // returns "_foo_"
```

### paddington.left( string, length [, character = ' '] )

Pad a string on the left hand side. This method has the same signature as `paddington.pad`.

```js
// Example
paddington.left('foo', 5); // returns " foo"
paddington.left('foo', 5, '_'); // returns "__foo"
```

### paddington.right( string, length [, character = ' '] )

Pad a string on the right hand side. This method has the same signature as `paddington.pad`.

```js
// Example
paddington.right('foo', 5); // returns "foo  "
paddington.right('foo', 5, '_'); // returns "foo__"
```

### Longer strings

When a string is longer than the specified pad length, it will not be trimmed. In this case the string will be returned as-is:

```js
paddington.pad('foobar', 5); // returns "foobar"
```

### Error handling

All of the methods documented above will throw a `TypeError` if an argument is not of the expected type.


Contributing
------------

To contribute to Paddington, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code, and run the linter before opening a pull-request:

```sh
make test  # run all unit tests
make lint  # run the linter
```

You can find more detail in our [contributing guide](#). Participation in this open source project is subject to a [Code of Conduct](#).


Support and Migration
---------------------

Paddington major versions are normally supported for 6 months after their last minor release. This means that patch-level changes will be added and bugs will be fixed. The table below outlines the end-of-support dates for major versions, and the last minor release for that version.

We also maintain a [migration guide](#) to help you migrate.

| :grey_question: | Major Version | Last Minor Release | Support End Date |
| :-------------- | :------------ | :----------------- | :--------------- |
| :heart:         | 3             | N/A                | N/A              |
| :hourglass:     | 2             | 2.1                | 2016-07-04       |
| :no_entry_sign: | 1             | 1.4                | 2015-01-26       |

If you're opening issues related to these, please mention the version that the issue relates to.


License
-------

Paddington is licensed under the [MIT](#) license.  
Copyright &copy; 2016, Rowan Manning



[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[shield-coverage]: https://img.shields.io/badge/coverage-100%25-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–5-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v3.2.0-blue.svg
[shield-build]: https://img.shields.io/badge/build-passing-brightgreen.svg
