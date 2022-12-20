import { app } from './app'
import { AppDataSource } from './data-source'

const PORT = <number><unknown>process.env.PORT
const HOST = <string>process.env.HOST

AppDataSource.initialize()
  .then(() => app.listen(PORT, HOST, () => console.log(`server online - running on port ${PORT}`)))
  .catch(err => console.error('Error during Data Source initialization', err))
