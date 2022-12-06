import createClient, { Client } from 'edgedb'
import { config } from 'src/utils/config'

export const edgedbClient = createClient(config.database)

export type EdgeDBClient = Client
