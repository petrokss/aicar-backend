import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCameras1663167276839 implements MigrationInterface {
  name = 'createCameras1663167276839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "camera" ("id" BIGSERIAL NOT NULL, "url" character varying(500) NOT NULL, "username" character varying(200), "password" character varying(200), "name" character varying(100) NOT NULL, "description" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_3e6992bc5e67b9f9a6f95a5fe6f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "camera"`);
  }
}
