/* global jest describe test expect */

// =========================================
//       IMPORTS
// --------------------------------------

const {
    rootPath,
    fixturePath,
} = require('./helper')

const rootpath = require('../src')


// =========================================
//       TESTS
// --------------------------------------

describe('detect', () => {

    const fooRootPath = fixturePath('projects/node-foo')
    const barRootPath = fixturePath('projects/node-foo/vendor/node-bar')

    test('import', () => {
        expect(rootpath.detect).toBeInstanceOf(Function)
    })

    test('detect', async () => {
        let result

        result = await rootpath.detect()

        expect(result).toEqual(rootPath())

        result = await rootpath.detect(fixturePath('projects/null'))

        expect(result).toEqual(rootPath())
    })

    test('detect (entryPath)', async () => {
        let result

        result = await rootpath.detect(fixturePath('projects/node-foo'))

        expect(result).toEqual(fooRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/'))

        expect(result).toEqual(fooRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo'))

        expect(result).toEqual(fooRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/'))

        expect(result).toEqual(fooRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/utils'))

        expect(result).toEqual(fooRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/utils/'))

        expect(result).toEqual(fooRootPath)
    })

    test('detect (entryPath, pattern)', async () => {
        let result

        result = await rootpath.detect(fixturePath('projects/node-foo'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/utils'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/foo/utils/'), 'not_a_file')

        expect(result).toEqual(null)
    })

    test('detect (nestedEntryPath)', async () => {
        let result

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar'))

        expect(result).toEqual(barRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/'))

        expect(result).toEqual(barRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src'))

        expect(result).toEqual(barRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/'))

        expect(result).toEqual(barRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/utils'))

        expect(result).toEqual(barRootPath)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/utils/'))

        expect(result).toEqual(barRootPath)
    })

    test('detect (nestedEntryPath, pattern)', async () => {
        let result

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/utils'), 'not_a_file')

        expect(result).toEqual(null)

        result = await rootpath.detect(fixturePath('projects/node-foo/vendor/node-bar/src/utils/'), 'not_a_file')

        expect(result).toEqual(null)
    })

})
