import { MigrationInterface, QueryRunner } from 'typeorm'

export class BtreeGinExtension1729332020235 implements MigrationInterface {
  name = 'BtreeGinExtension1729332020235'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS btree_gin;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP EXTENSION IF EXISTS btree_gin;
        `)
  }
}
