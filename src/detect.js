
/* =========================================
      IMPORTS
-------------------------------------- */

const path = require('path')
const fs = require('fs').promises


/* =========================================
      CONSTANTS
-------------------------------------- */

const DEFAULT_PATH = '.'
const DEFAULT_ROOT_FILENAME_MATCH_PATTERN = '.git|package.json'


/* =========================================
      FUNCTIONS
-------------------------------------- */

async function detect (entryPath = undefined, rootFileNamePattern = undefined) {
    entryPath = entryPath || process.cwd()
    entryPath = path.resolve(entryPath)

    rootFileNamePattern = rootFileNamePattern || DEFAULT_ROOT_FILENAME_MATCH_PATTERN

    let fileStat

    try {
        fileStat = await fs.lstat(entryPath)
    } catch (error) {}

    const isDirectory = Boolean(fileStat && fileStat.isDirectory())

    if (!isDirectory) {
        entryPath = path.dirname(entryPath)
    }

    const findRootPath = async (entryPath, rootFileNamePattern = undefined) => {
        if (typeof rootFileNamePattern === 'string') {
            rootFileNamePattern = new RegExp(rootFileNamePattern)
        }

        let currentPath = entryPath

        let detecting = true

        let foundMoreFiles
        let foundRoot
        let foundSystemRoot

        let fileNames
        let rootFileNames

        while (detecting) {
            fileNames = await fs.readdir(currentPath)

            foundMoreFiles = Boolean(fileNames.length > 0)

            if (!foundMoreFiles) {
                detecting = false

                return null
            }

            rootFileNames = fileNames.filter((fileName) => {
                return rootFileNamePattern.test(fileName)
            })

            foundRoot = Boolean(rootFileNames.length > 0)

            if (foundRoot) {
                detecting = false

                return currentPath
            }

            foundSystemRoot = Boolean(currentPath === path.sep)

            if (foundSystemRoot) {
                return null
            }

            currentPath = path.resolve(path.join(currentPath, '..'))
        }
    }

    return findRootPath(entryPath, rootFileNamePattern)
}


/* =========================================
      EXPORTS
-------------------------------------- */

module.exports = detect
