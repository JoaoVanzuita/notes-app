import { app } from './app'
import { AppDataSource } from './data-source'

const PORT = <number><unknown>process.env.PORT

AppDataSource.initialize()
  .then(() => app.listen(PORT, () => console.log('server online')))
  .catch(err => console.error('Error during Data Source initialization', err))
