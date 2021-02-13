import { Arg, Field, Int, ObjectType, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import { Mention } from '../entities/Mention'

@ObjectType()
class Mentions {
  @Field(() => [Mention])
  mentions: Mention[]
}

const topMentionedStocksSQL = `
        select count(*) as num_mentions, stock_id, symbol, message, source
        from mention join stock on stock.id = mention.stock_id
        group by stock_id, symbol, message, source
        order by num_mentions DESC
        limit $1;

`

@Resolver(Mention)
export class MentionResolver {
  @Query(() => Mentions)
  async mentions(@Arg('limit', () => Int) limit: number): Promise<Mentions> {
    const realLimit = Math.min(50, limit) + 1

    const replacements: any[] = [realLimit + 1]
    const mentions = await getConnection().query(
      `
        select * from mention limit $1;
      `,
      replacements
    )

    console.log('mentions: ', mentions)
    return {
      mentions: mentions.slice(0, realLimit - 1),
    }
  }

  @Query(() => Mentions)
  async numberOfMentions(
    @Arg('limit', () => Int) limit: number
  ): Promise<Mentions> {
    const realLimit = Math.min(50, limit) + 1

    const replacements: any[] = [realLimit + 1]
    const mentions = await getConnection().query(
      topMentionedStocksSQL,
      replacements
    )

    console.log('mentions: ', mentions)
    return {
      mentions: mentions.slice(0, realLimit - 1),
    }
  }

  //   @Query()
  //   stock(@Arg('id', () => Int) id: number): Promise<any | undefined> {
  //     return Stock.findOne(id)
  //   }
}
