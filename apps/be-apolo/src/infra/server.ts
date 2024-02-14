import { NewsController } from '@/application/controllers/news/index.controller'
import { UserController } from '@/application/controllers/users/index.controller'
import { NewsCreateUseCase } from '@/application/use-cases/news/create/index.use-case'
import { NewsFindAllUseCase } from '@/application/use-cases/news/find-all/index.use-case'
import { NewsFindByIdUseCase } from '@/application/use-cases/news/find-id/index.use-case'
import { NewsRemoveByIdUseCase } from '@/application/use-cases/news/remove/index.use-case'
import { NewsUpdateByIdUseCase } from '@/application/use-cases/news/update/index.use-case'
import { UserCreateUseCase } from '@/application/use-cases/users/create/index.use-case'
import { UserFindAllUseCase } from '@/application/use-cases/users/find-all/index.use-case'
import { UserFindByIdUseCase } from '@/application/use-cases/users/find-id/index.use-case'
import { UserRemoveByIdUseCase } from '@/application/use-cases/users/remove/index.use-case'
import { UserUpdateByIdUseCase } from '@/application/use-cases/users/update/index.use-case'
import { InjectorFactory } from '@olympus/lib-hera'
import Fastify, {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import 'reflect-metadata'
import { dataSource } from './database/typeorm/data-source'
import { NewsRepositoryMock } from './repositories/news/mock.repository'
import { UserRepositoryTypeORM } from './repositories/user/typeorm.repository'

const port = +(process.env.PORT ?? 3001)

// BOOTSTRAP FASTIFY
const app: FastifyInstance = Fastify({ logger: false })

// INJECTING ROUTER
InjectorFactory.instance.set('PluginRouter', app)

// INJECTING NEWS MODULE
{
  {
    // USE_CASE NEWS
    InjectorFactory.resolve(NewsFindAllUseCase)
    InjectorFactory.resolve(NewsCreateUseCase)
    InjectorFactory.resolve(NewsFindByIdUseCase)
    InjectorFactory.resolve(NewsUpdateByIdUseCase)
    InjectorFactory.resolve(NewsRemoveByIdUseCase)
    
    // USE_CASE USER
    InjectorFactory.resolve(UserCreateUseCase)
    InjectorFactory.resolve(UserFindByIdUseCase)
    InjectorFactory.resolve(UserFindAllUseCase)
    InjectorFactory.resolve(UserRemoveByIdUseCase)
    InjectorFactory.resolve(UserUpdateByIdUseCase)
  }
  {
    // INJECTING NEWS REPOSITORY
    InjectorFactory.resolve(NewsRepositoryMock)
    InjectorFactory.resolve(UserRepositoryTypeORM)
  }
  // INJECTING NEWS CONTROLLER
  InjectorFactory.resolve(NewsController)
  InjectorFactory.resolve(UserController)
}

// ERROR HANDLER
app.setErrorHandler(function (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log('app/setErrorHandler()', error)
  return reply.send(error)
})

// START SERVER
app.listen(
  {
    port,
  },
  async (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    try {
      await dataSource.initialize()
      console.log('data base running')
      await dataSource.runMigrations()
      console.log('migrations finished')
    } catch (err) {
      console.error(err)
    } finally{
      console.log(`Server listening at ${address} 🚀🚀`)
    }
  },
)
