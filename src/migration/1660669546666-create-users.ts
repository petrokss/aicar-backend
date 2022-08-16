import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1660669546666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'role',
            type: 'varchar(100)',
            default: 'user',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar(200)'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
