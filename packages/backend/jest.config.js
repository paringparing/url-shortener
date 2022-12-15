const { readFileSync } = require('fs')
const path = require('path')

const swcrc = JSON.parse(readFileSync(path.join(__dirname, '.swcrc'), 'utf8'))

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['@swc/jest', swcrc],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '(.*)\\.edgeql$': '$1.edgeql.ts',
  },
}
