// eslint-disable-next-line @typescript-eslint/no-require-imports
const base = require('./jest.config.base')

module.exports = {
  ...base,
  coverageDirectory: './coverage/unit',
  testRegex: ['.unit.spec.ts$'],
  workerIdleMemoryLimit: '1024MB',
}
