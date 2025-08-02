// eslint-disable-next-line @typescript-eslint/no-require-imports
const base = require('./jest.config.base')

module.exports = {
  ...base,
  coverageDirectory: './coverage/component',
  testRegex: ['.component.spec.ts$'],
  workerIdleMemoryLimit: '1024MB',
}
