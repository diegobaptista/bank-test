import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableFavored1640732726906 implements MigrationInterface {
  name = "createTableFavored1640732726906";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favored" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, "documentType" character varying NOT NULL, "document" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_60d4711d5f763ccef8016c423c0" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favored"`);
  }
}
