
// =========================================
//       IMPORTS
// --------------------------------------

const path = require('path')


// =========================================
//       CONSTANTS
// --------------------------------------

const CURRENT_PATH = path.resolve(path.dirname(__filename))
const ROOT_PATH = path.resolve(path.join(CURRENT_PATH, '..'))
const FIXTURES_PATH = path.resolve(path.join(CURRENT_PATH, '__fixtures__'))


// =========================================
//       FUNCTIONS
// --------------------------------------

function rootPath (fixtureKey) {
    return ROOT_PATH
}

function fixturePath (fixtureKey) {
    return path.resolve(path.join(FIXTURES_PATH, fixtureKey))
}


// =========================================
//       EXPORTS
// --------------------------------------

module.exports = {
    rootPath,
    fixturePath,
}
