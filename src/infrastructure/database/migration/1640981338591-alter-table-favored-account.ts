import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableFavoredAccount1640981338591 implements MigrationInterface {
    name = 'alterTableFavoredAccount1640981338591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favored" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "favored_account" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favored_account" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "favored" ADD "status" character varying NOT NULL`);
    }

}
