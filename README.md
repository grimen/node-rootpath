
# `node-rootpath` [![NPM version](https://badge.fury.io/js/%40grimen%2Frootpath.svg)](https://badge.fury.io/js/%40grimen%2Frootpath) [![Build Status](https://travis-ci.com/grimen/node-rootpath.svg?token=sspjPRWbecBSpceU8Jyn&branch=master)](https://travis-ci.com/grimen/node-rootpath) [![Coverage Status](https://codecov.io/gh/grimen/node-rootpath/branch/master/graph/badge.svg)](https://codecov.io/gh/grimen/node-rootpath)

*Node.js project/package root path detection.*

![Screenshot](https://dvfr2lc5dhzsq.cloudfront.net/items/1x2l3v3p3f1o3R1b203H/Screen%20Shot%202019-03-07%20at%2004.07.33.png?X-CloudApp-Visitor-Id=c6ecab27bd8bc8eb8c40bf7dc50cef57)


## Introduction

Auto-magic project/package root path detection - from a child module file for Node.js libraries/projects.

It does this by detecting typical package/project root files/folders (e.g. `.git`, `package.json`, etc.), but it can also be overriden easily if needed.


## Install

Install using **npm**:

```bash
$ npm install @grimen/rootpath
```

Install using **yarn**:

```bash
$ yarn add @grimen/rootpath
```


# Use

Detect a project/package root path:

**1.** Assuming we have a **Node.js** library/application project...

```
/home/me/projects
    └── node-foo
            └── foo
                └── utils
                    └── __init__.js
                    └── baz.js
                    └── say.js
                └── __init__.js
                └── bar.js
            README.md
            package.json
            setup.js
```

`foo/bar.js` - top level package module

```javascript
const assert = require('assert')

const rootpath = require('@grimen/rootpath')

async function bar () {
    const path = await rootpath.detect()

    assert(path === '/home/me/projects/node-foo')

    console.log('---')
    console.log('FILE:', __filename)
    console.log('ROOT:', path)
    console.log('---')
}

if (require.main === module) {
    bar()
}
```

`foo/utils/baz.js` - nested level package module (dependency)

```javascript
const assert = require('assert')

const rootpath = require('@grimen/rootpath')

async function baz () {
    const path = await rootpath.detect()

    assert(path === '/home/me/projects/node-foo')

    console.log('---')
    console.log('FILE:', __filename)
    console.log('ROOT:', path)
    console.log('---')
}

if (require.main === module) {
    baz()
}
```

`foo/utils/say.js` - nested level package module (dependency)

```javascript
const assert = require('assert')

const rootpath = require('@grimen/rootpath')

async function say () {
    const path = rootpath.detect()

    console.log('---')
    console.log(`SAY: ${path}`)
    console.log('---')
}

if (require.main === module) {
    say()
}
```

**2.** Let's run the files individually - they should both with successful assertions and output accurately detected root paths...

```sh
$ cd /home/me/projects/node-foo

$ node ./foo/bar.js

---
FILE: /home/me/projects/node-foo/foo/bar.js
ROOT: /home/me/projects/node-foo
---

$ node ./foo/utils/baz.js

---
FILE: /home/me/projects/node-foo/foo/utils/baz.js
ROOT: /home/me/projects/node-foo
---

$ node ./foo/utils/say.js

---
SAY: /home/me/projects/node-foo
---

```


## Test

Clone down source code:

```sh
$ make install
```

Run **colorful tests** using **jest**:

```sh
$ make test
```


## Related

- [**`python-rootpath`**](https://github.com/grimen/python-rootpath) - *"Python project/package root path detection."*


## About

This project was mainly initiated - in lack of solid existing alternatives - to be used at our work at **[Markable.ai](https://markable.ai)** to have common code conventions between various programming environments where **Node.js** (for I/O heavy operations) is heavily used.


## License

Released under the MIT license.
