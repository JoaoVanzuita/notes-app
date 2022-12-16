import { app } from './app'
import { AppDataSource } from './data-source'

const PORT = process.env.PORT

AppDataSource.initialize()
  .then(() => app.listen(PORT, () => console.log(`server online - running on port ${PORT}`)))
  .catch(err => console.error('Error during Data Source initialization', err))
