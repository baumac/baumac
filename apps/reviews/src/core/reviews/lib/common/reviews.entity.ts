import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

import { CreatedAtColumn, UpdatedAtColumn } from '@common/database'
import {
  MAX_NOTES_LENGTH,
  MAX_SCORE_VALUE,
  MIN_SCORE_VALUE,
  Scorecard,
} from '@core/reviews/lib/common'
import { Subject } from '@core/subjects/lib/common/subjects.entity'
import { User } from '@core/users/lib/common/users.entity'

@Check('chk_review_notes_length', `char_length(notes) <= ${MAX_NOTES_LENGTH}`)
@Check('chk_review_score_value', `score BETWEEN ${MIN_SCORE_VALUE} AND ${MAX_SCORE_VALUE}`)
@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'smallint' })
  @Index('idx_review_score', { synchronize: false })
  score: number

  @Column({ type: 'jsonb' })
  scorecard: Scorecard

  @Column({ type: 'text' })
  notes: string

  @JoinColumn({
    name: 'subject_id',
    foreignKeyConstraintName: 'fk_reviews_subjects_id',
  })
  @ManyToOne(() => Subject, (subject) => subject.reviews, { onDelete: 'CASCADE' })
  subject: Relation<Subject>

  @Column({ type: 'uuid' })
  readonly subject_id: string

  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_reviews_users_id',
  })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: Relation<User>

  @Column({ type: 'uuid' })
  readonly user_id: string

  @CreatedAtColumn({ type: 'timestamptz' })
  readonly created_at: Date

  @UpdatedAtColumn({ type: 'timestamptz' })
  readonly updated_at: Date
}
