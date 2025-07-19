import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddReviewsEntity1752947408379 implements MigrationInterface {
  name = 'AddReviewsEntity1752947408379'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "reviews" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "score" smallint NOT NULL,
                "scorecard" jsonb NOT NULL,
                "notes" text NOT NULL,
                "subject_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "chk_review_score_value" CHECK (
                    score BETWEEN 1 AND 5
                ),
                CONSTRAINT "chk_review_notes_length" CHECK (char_length(notes) <= 50000),
                CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "reviews"
            ADD CONSTRAINT "fk_reviews_subjects_id" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)

    await queryRunner.query(`
            ALTER TABLE IF EXISTS "reviews"
            ADD CONSTRAINT "fk_reviews_users_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `)

    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_review_score" on "reviews" USING BTREE("score")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "reviews" DROP CONSTRAINT "fk_reviews_users_id"
        `)
    await queryRunner.query(`
            ALTER TABLE IF EXISTS "reviews" DROP CONSTRAINT "fk_reviews_subjects_id"
        `)

    await queryRunner.query(`
        DROP INDEX IF EXISTS "public"."idx_review_score"
    `)

    await queryRunner.query(`
            DROP TABLE IF EXISTS "reviews"
        `)
  }
}
