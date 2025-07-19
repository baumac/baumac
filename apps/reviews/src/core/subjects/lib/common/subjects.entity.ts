import { Review } from 'src/core/reviews/lib/common/reviews.entity'
import { MAX_NAME_LENGTH, SubjectKind, SubjectMetadata } from 'src/core/subjects/lib/common'
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '@core/users/lib/common/users.entity'

@Entity('subjects')
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'varchar', length: MAX_NAME_LENGTH })
  @Index('idx_subject_name', { synchronize: false })
  name: string

  @Column({ type: 'enum', enum: SubjectKind })
  readonly kind: SubjectKind

  @Column({ type: 'jsonb' })
  readonly metadata: SubjectMetadata

  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_subjects_users_id',
  })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Column({ type: 'uuid' })
  readonly user_id: string

  @OneToMany(() => Review, (review) => review.subject)
  reviews: Review[]
}
