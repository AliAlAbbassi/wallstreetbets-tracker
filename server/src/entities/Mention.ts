import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Stock } from './Stock'

@ObjectType()
@Entity()
export class Mention extends BaseEntity {
  @OneToOne(() => Stock)
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  stock_id!: number

  @Field()
  @Column()
  message!: string

  @Field()
  @Column()
  source!: string

  @Field()
  @Column()
  url!: string

  @Field(() => String)
  @Column()
  dt: Date

  @Field()
  @Column()
  symbol!: string

  @Field()
  @Column()
  num_mentions!: string
}
