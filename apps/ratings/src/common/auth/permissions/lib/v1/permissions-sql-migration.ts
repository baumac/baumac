import { QueryRunner } from 'typeorm'

import { Action, PERMISSIONS_ENTITY_NAME } from '@common/auth'

export class PermissionsSqlMigration {
  public static async up(queryRunner: QueryRunner, entity: object): Promise<void> {
    for (const key in Action) {
      await queryRunner.query(`
        INSERT INTO "${PERMISSIONS_ENTITY_NAME}" (id, action, entity, created_at, updated_at)
        VALUES (
          DEFAULT,
          ${Action[key]},
          ${entity.constructor.name},
          DEFAULT,
          DEFAULT
        )
        ON CONFLICT (resource) DO NOTHING
      `)
    }
  }

  public static async down(queryRunner: QueryRunner, entity: object): Promise<void> {
    for (const key in Action) {
      await queryRunner.query(`
        DELETE FROM "${PERMISSIONS_ENTITY_NAME}" 
        WHERE "action" = "${Action[key]}" AND entity = "${entity.constructor.name}}"
      `)
    }
  }
}
