import type * as EdgeDB from 'edgedb'

export type Config = {
  database: EdgeDB.ConnectOptions
}

export const config = require('../../../../config.json') as Config
