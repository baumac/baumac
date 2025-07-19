import { CreatedAtColumn, UpdatedAtColumn } from '@common/database/database.decorators'

export abstract class BaseEntity {
  @CreatedAtColumn({ type: 'timestamptz' })
  readonly created_at: Date

  @UpdatedAtColumn({ type: 'timestamptz' })
  readonly updated_at: Date
}
