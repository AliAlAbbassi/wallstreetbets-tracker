import { Arg, Field, Int, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Stock } from '../entities/Stock'

@ObjectType()
class Stocks {
  @Field(() => [Stock])
  stocks: Stock[]
}

@Resolver(Stock)
export class StockResolver {
  @Query(() => Stocks)
  async stocks(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<Stocks> {
    const realLimit = Math.min(50, limit) + 1

    const replacements: any[] = [realLimit + 1]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }

    const stocks = await getConnection().query(
      `
        select s.* from stock s limit $1
      `,
      replacements
    )

    console.log('stocks: ', stocks)
    return {
      stocks: stocks.slice(0, realLimit - 1),
    }
  }

  @Query(() => Stock, { nullable: true })
  stock(@Arg('id', () => Int) id: number): Promise<Stock | undefined> {
    return Stock.findOne(id)
  }
}
