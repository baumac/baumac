import { Check, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '@common/auth/users/lib/v1/users.entity'
import { CreatedAtColumn, UpdatedAtColumn } from '@common/database'
import {
  MAX_NOTES_LENGTH,
  MAX_SCORE_VALUE,
  MIN_SCORE_VALUE,
} from '@core/ratings/lib/v1/ratings.constants'
import { Scorecard } from '@core/ratings/lib/v1/ratings.interfaces'
import { Subject } from '@core/subjects/lib/v1'

export const RATINGS_ENTITY_NAME = 'ratings'

export const RATING_SCORE_INDEX = 'index_rating_score'

export const RATING_NOTES_LENGTH_CHECK = 'check_rating_notes_length'
export const RATING_SCORE_VALUE_CHECK = 'check_rating_score_value'

@Check(RATING_NOTES_LENGTH_CHECK, `char_length(notes) <= ${MAX_NOTES_LENGTH}`)
@Check(RATING_SCORE_VALUE_CHECK, `score BETWEEN ${MIN_SCORE_VALUE} AND ${MAX_SCORE_VALUE}`)
@Index(RATING_SCORE_INDEX, { synchronize: false })
@Entity(RATINGS_ENTITY_NAME)
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'smallint' })
  score: number

  @Column({ type: 'jsonb' })
  scorecard: Scorecard

  @Column({ type: 'text' })
  notes: string

  @ManyToOne(() => Subject, (subject) => subject.ratings, { onDelete: 'CASCADE' })
  subject: Subject

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  created_by: User

  @CreatedAtColumn({ type: 'timestamptz' })
  readonly created_at: Date

  @UpdatedAtColumn({ type: 'timestamptz' })
  readonly updated_at: Date
}
