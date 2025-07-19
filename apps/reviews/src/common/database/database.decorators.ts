import { Column, ColumnOptions, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum TimePrecision {
  Seconds = 0,
  Milliseconds = 3,
  Microseconds = 6,
}

/**
 * Decorates a timestamp column.
 *
 * Includes:
 *   - timestamptz column type
 *   - Millisecond precision to match JS runtime
 */
export const TimestampColumn = (options?: ColumnOptions): ReturnType<typeof Column> =>
  Column({
    type: 'timestamptz',
    precision: TimePrecision.Milliseconds,
    ...options,
  })

/**
 * Decorates a created_at column.
 *
 * Includes:
 *   - timestamptz column type
 *   - Millisecond precision to match JS runtime
 */
export const CreatedAtColumn = (options?: ColumnOptions): ReturnType<typeof Column> =>
  CreateDateColumn({
    type: 'timestamptz',
    precision: TimePrecision.Milliseconds,
    ...options,
  })

/**
 * Decorates an updated_at column.
 *
 * Includes:
 *   - timestamptz column type
 *   - Millisecond precision to match JS runtime
 */
export const UpdatedAtColumn = (options?: ColumnOptions): ReturnType<typeof Column> =>
  UpdateDateColumn({
    type: 'timestamptz',
    precision: TimePrecision.Milliseconds,
    ...options,
  })
