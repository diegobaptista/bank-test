import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFavored1640732726906 implements MigrationInterface {
    name = 'createTableFavored1640732726906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favored" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favored" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favored" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "favored" DROP COLUMN "email"`);
    }

}
