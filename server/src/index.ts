import 'dotenv-safe/config'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { MyContext } from './types'
import { HelloResolver } from './resolvers/HelloResolver'
import { StockResolver } from './resolvers/stock'
import { MentionResolver } from './resolvers/mention'

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    database: 'etfdb',
    logging: true,
    synchronize: true,
  })

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, StockResolver, MentionResolver],
      validate: false,
    }),
    context: ({ res, req }): MyContext => ({
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({ app })

  app.listen(process.env.PORT, () => {
    console.log(`Server running on localhost:${process.env.PORT}`)
  })
}

main()
