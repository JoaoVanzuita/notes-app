import 'reflect-metadata'
import { DataSource } from 'typeorm'

const PORT = <number | undefined><unknown>process.env.DB_PORT

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 500,
  ...(process.env.NODE_ENV === 'production') && {
    ssl: {
      requestCert: false
    }
  }
})
