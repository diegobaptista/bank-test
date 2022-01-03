import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableAgencyNullableFields1641177165289 implements MigrationInterface {
    name = 'alterTableAgencyNullableFields1641177165289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agency" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agency" ALTER COLUMN "name" SET NOT NULL`);
    }

}
