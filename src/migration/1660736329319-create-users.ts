import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1660736329319 implements MigrationInterface {
  name = 'createUsers1660736329319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying(100) NOT NULL, "role" character varying NOT NULL DEFAULT 'ROLE_USER', "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
