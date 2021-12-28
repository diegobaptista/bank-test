import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFavoured1640710238497 implements MigrationInterface {
    name = 'createTableFavoured1640710238497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favored_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "document" character varying NOT NULL, "documentType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_8f0e5bc62940215810cfb29163d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favored_entity"`);
    }

}
