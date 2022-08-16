import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUserRoleType1660687592647 implements MigrationInterface {
  name = 'changeUserRoleType1660687592647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "CHK_18c4b2d48ddb86a98516d6ba2d"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "CHK_18c4b2d48ddb86a98516d6ba2d" CHECK ("role" in ('user', 'admin', 'manager'))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "CHK_18c4b2d48ddb86a98516d6ba2d"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "CHK_18c4b2d48ddb86a98516d6ba2d" CHECK (((role)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying, 'manager'::character varying])::text[])))`
    );
  }
}
