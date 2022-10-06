import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRecognitionSettings1663244352993
  implements MigrationInterface
{
  name = 'createRecognitionSettings1663244352993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recognition_settings" ("id" BIGSERIAL NOT NULL, "process_every_n_frame" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_c7b10217abd93bcb2fb4a7ab5cd" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recognition_settings"`);
  }
}
