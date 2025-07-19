/**
 * TypeORM CLI Wrapper for running migrations for non cluster envs.
 */

import { exec } from 'child_process'
import path from 'path'
import { promisify } from 'util'

const asyncExec = promisify(exec)

const dataSourcePath = path.resolve(
  __dirname,
  '..',
  'src',
  'migrations',
  'dataSource',
  'dataSource.ts'
)

const typeormExecutable = path.resolve(__dirname, '..', 'node_modules', '.bin', 'typeorm')
const typeormArgs = process.argv.slice(2).join(' ')

const cmdEnvVars = `POSTGRES_HOST=${process.env.POSTGRES_HOST ?? 'localhost'} POSTGRES_PORT=${process.env.POSTGRES_PORT ?? 5432} POSTGRES_USERNAME=${process.env.POSTGRES_USERNAME ?? 'postgres'} POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD ?? 'postgres'} POSTGRES_DB=${process.env.POSTGRES_DB ?? 'reviews'}`

const cmd = `${cmdEnvVars} node --require ts-node/register --require tsconfig-paths/register ${typeormExecutable} --dataSource=${dataSourcePath} ${typeormArgs}`

console.log(`Executing command: ${cmd}`)

asyncExec(cmd)
  .then((output) => console.log(output.stdout))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
