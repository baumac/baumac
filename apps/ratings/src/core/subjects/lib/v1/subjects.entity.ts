import {
  BaseEntity,
  Check,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Rating } from '@core/ratings/lib/v1'
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  SubjectKind,
  SubjectMetadata,
} from '@core/subjects/lib/v1'

export const SUBJECTS_ENTITY_NAME = 'subjects'

export const SUBJECT_NAME_INDEX = 'index_subject_name'
export const SUBJECT_KIND_INDEX = 'index_subject_kind'

export const SUBJECT_NAME_LENGTH_CHECK = 'check_subject_name_length'

@Index(SUBJECT_NAME_INDEX, { synchronize: false })
@Index(SUBJECT_KIND_INDEX, { synchronize: false })
@Check(
  SUBJECT_NAME_LENGTH_CHECK,
  `char_length(name) BETWEEN ${MIN_NAME_LENGTH} AND ${MAX_NAME_LENGTH}`
)
@Entity(SUBJECTS_ENTITY_NAME)
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'enum', enum: SubjectKind })
  readonly kind: SubjectKind

  @Column({ type: 'jsonb' })
  readonly metadata: SubjectMetadata

  @OneToMany(() => Rating, (rating) => rating.subject)
  ratings: Rating[]
}
