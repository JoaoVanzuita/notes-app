import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { env } from './shared/environment/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(env.port)
}
bootstrap()
