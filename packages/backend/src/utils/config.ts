import type * as EdgeDB from 'edgedb'

export type Config = {
  database: EdgeDB.ConnectOptions
  auth: AuthConfig
}

export type AuthConfig = {
  discord: {
    clientId: string
    clientSecret: string
    redirectUri: string
  }

  secret: string
}

export const config = require('../../../../config.json') as Config
