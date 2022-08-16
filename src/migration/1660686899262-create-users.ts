import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1660686899262 implements MigrationInterface {
  name = 'createUsers1660686899262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying(100) NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "CHK_18c4b2d48ddb86a98516d6ba2d" CHECK ("role" in ('user', 'admin', 'manager')), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
