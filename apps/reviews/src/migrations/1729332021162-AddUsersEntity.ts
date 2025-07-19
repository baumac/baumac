import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsersEntity1729332021162 implements MigrationInterface {
  name = 'AddUsersEntity1729332021162'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')
        `)
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying(255) NOT NULL,
                "password_hash" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "first_name" character varying(255),
                "last_name" character varying(255),
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_name" ON "users" ("username")
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_email_name" ON "users" ("email")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX IF EXISTS "public"."idx_email_name"
        `)
    await queryRunner.query(`
            DROP INDEX IF EXISTS "public"."idx_user_name"
        `)
    await queryRunner.query(`
            DROP TABLE IF EXISTS "users"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `)
  }
}
