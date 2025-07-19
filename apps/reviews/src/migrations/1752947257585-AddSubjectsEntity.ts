import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSubjectsEntity1752947257585 implements MigrationInterface {
  name = 'AddSubjectsEntity1752947257585'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."subjects_kind_enum" AS ENUM('restaurant')
        `)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "subjects" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "kind" "public"."subjects_kind_enum" NOT NULL,
                "metadata" jsonb NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "subjects"
            ADD CONSTRAINT "fk_subjects_users_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)

    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_subject_name" on "subjects" USING GIN("name")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "subjects" DROP CONSTRAINT "fk_subjects_users_id"
        `)

    await queryRunner.query(`
          DROP INDEX IF EXISTS "public"."idx_subject_name"
      `)

    await queryRunner.query(`
            DROP TABLE IF EXISTS "subjects"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."subjects_kind_enum"
        `)
  }
}
