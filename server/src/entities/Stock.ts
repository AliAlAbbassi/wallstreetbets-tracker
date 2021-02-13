import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Stock extends BaseEntity {
  @OneToOne(() => Stock, (stock) => stock.id)
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  symbol!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  exchange!: string

  @Field()
  @Column()
  is_etf!: boolean
}
