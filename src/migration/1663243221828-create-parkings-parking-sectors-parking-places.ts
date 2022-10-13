import { MigrationInterface, QueryRunner } from 'typeorm';

export class createParkingsParkingSectorsParkingPlaces1663243221828
  implements MigrationInterface
{
  name = 'createParkingsParkingSectorsParkingPlaces1663243221828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parking" ("id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "loc_lat" numeric NOT NULL, "loc_long" numeric NOT NULL, "description" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_d611d86b1d39963d048b05976aa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "parking_sector" ("id" BIGSERIAL NOT NULL, "number_of_places" integer NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100), "parking_id" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_0b01ccad299d762bb89da36421a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "parking_place" ("id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "x1" numeric NOT NULL, "y1" numeric NOT NULL, "x2" numeric NOT NULL, "y2" numeric NOT NULL, "x3" numeric NOT NULL, "y3" numeric NOT NULL, "x4" numeric NOT NULL, "y4" numeric NOT NULL, "is_primary" boolean NOT NULL, "type" character varying(100) NOT NULL DEFAULT 'STANDARD', "description" character varying(100), "parking_sector_id" bigint, "camera_id" bigint, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_ca572767db8199d4434cc7c0936" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "parking_sector" ADD CONSTRAINT "FK_c4bf0f04df7e9f4c59831cbabb9" FOREIGN KEY ("parking_id") REFERENCES "parking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "parking_place" ADD CONSTRAINT "FK_31c87bac17ddb8b10564ead25c0" FOREIGN KEY ("parking_sector_id") REFERENCES "parking_sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "parking_place" ADD CONSTRAINT "FK_bb044eb41f7cb45dd0b8dd5a352" FOREIGN KEY ("camera_id") REFERENCES "camera"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "parking" ADD CONSTRAINT "UQ_7ad8315d65819030db24024f2dc" UNIQUE ("loc_lat")`
    );
    await queryRunner.query(
      `ALTER TABLE "parking" ADD CONSTRAINT "UQ_75ea4836c55f98ded924a82909a" UNIQUE ("loc_long")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parking_place" DROP CONSTRAINT "FK_bb044eb41f7cb45dd0b8dd5a352"`
    );
    await queryRunner.query(
      `ALTER TABLE "parking_place" DROP CONSTRAINT "FK_31c87bac17ddb8b10564ead25c0"`
    );
    await queryRunner.query(
      `ALTER TABLE "parking_sector" DROP CONSTRAINT "FK_c4bf0f04df7e9f4c59831cbabb9"`
    );
    await queryRunner.query(
      `ALTER TABLE "parking" DROP CONSTRAINT "UQ_75ea4836c55f98ded924a82909a"`
    );
    await queryRunner.query(
      `ALTER TABLE "parking" DROP CONSTRAINT "UQ_7ad8315d65819030db24024f2dc"`
    );
    await queryRunner.query(`DROP TABLE "parking_place"`);
    await queryRunner.query(`DROP TABLE "parking_sector"`);
    await queryRunner.query(`DROP TABLE "parking"`);
  }
}
