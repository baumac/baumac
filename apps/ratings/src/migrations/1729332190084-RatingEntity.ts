import { MigrationInterface, QueryRunner } from 'typeorm'

export class RatingEntity1729332190084 implements MigrationInterface {
  name = 'RatingEntity1729332190084'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "ratings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "score" smallint NOT NULL,
                "scorecard" jsonb NOT NULL,
                "notes" text NOT NULL,
                "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                "subjectId" uuid,
                "createdById" uuid,
                CONSTRAINT "chk_rating_score_value" CHECK (
                    score BETWEEN 1 AND 5
                ),
                CONSTRAINT "chk_rating_notes_length" CHECK (char_length(notes) <= 50000),
                CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "ratings"
            ADD CONSTRAINT "FK_cc630d23b244c9ec81bb6e9bd3c" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "ratings"
            ADD CONSTRAINT "FK_1eaccfad120ad7eea6cafa4866e" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)

    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_rating_score" on "ratings" USING BTREE("score")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX IF EXISTS "public"."idx_rating_score"
        `)

    await queryRunner.query(`
            ALTER TABLE IF EXISTS "ratings" DROP CONSTRAINT "FK_1eaccfad120ad7eea6cafa4866e"
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "ratings" DROP CONSTRAINT "FK_cc630d23b244c9ec81bb6e9bd3c"
        `)
    await queryRunner.query(`
            DROP TABLE IF EXISTS "ratings"
        `)
  }
}
