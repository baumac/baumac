import { DataSource } from 'typeorm'

import { ConnectionOptions } from './ormConfig'

const datasource = new DataSource(ConnectionOptions)

export default datasource
