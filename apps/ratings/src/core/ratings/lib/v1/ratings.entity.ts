import { Check, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { CreatedAtColumn, UpdatedAtColumn } from '@common/database'
import {
  MAX_NOTES_LENGTH,
  MAX_SCORE_VALUE,
  MIN_SCORE_VALUE,
} from '@core/ratings/lib/v1/ratings.constants'
import { Scorecard } from '@core/ratings/lib/v1/ratings.interfaces'
import { Subject } from '@core/subjects/lib/v1'
import { User } from '@core/users/lib/v1/users.entity'

@Check('chk_rating_notes_length', `char_length(notes) <= ${MAX_NOTES_LENGTH}`)
@Check('chk_rating_score_value', `score BETWEEN ${MIN_SCORE_VALUE} AND ${MAX_SCORE_VALUE}`)
@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'smallint' })
  @Index('idx_rating_score', { synchronize: false })
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
