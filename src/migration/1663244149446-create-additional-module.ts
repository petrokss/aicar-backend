import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdditionalModule1663244149446 implements MigrationInterface {
  name = 'createAdditionalModule1663244149446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "additional_module" ("id" BIGSERIAL NOT NULL, "ipAddress" character varying(100) NOT NULL, "port" integer NOT NULL, "type" character varying(100) NOT NULL, "status" character varying(100), "description" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a975e4b934dbbbda88b5c6d7e8b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "additional_module"`);
  }
}
