import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Rating } from '@core/ratings/lib/v1'
import { MAX_NAME_LENGTH, SubjectKind, SubjectMetadata } from '@core/subjects/lib/v1'

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

  @OneToMany(() => Rating, (rating) => rating.subject)
  ratings: Rating[]
}
