import {MigrationInterface, QueryRunner} from "typeorm";

export class createAccountStructure1640820542787 implements MigrationInterface {
    name = 'createAccountStructure1640820542787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "bankId" uuid, CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favored_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "accountType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "agencyId" uuid, "ownerId" uuid, CONSTRAINT "PK_b677ef42b990c06eb77a47ed21d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agency" ADD CONSTRAINT "FK_a79a91ab952b54018f5639d4fa3" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favored_account" ADD CONSTRAINT "FK_65240d4177ae32bd7f17d80e231" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favored_account" ADD CONSTRAINT "FK_46a4f6482a0f633309b7ca7281f" FOREIGN KEY ("ownerId") REFERENCES "favored"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favored_account" DROP CONSTRAINT "FK_46a4f6482a0f633309b7ca7281f"`);
        await queryRunner.query(`ALTER TABLE "favored_account" DROP CONSTRAINT "FK_65240d4177ae32bd7f17d80e231"`);
        await queryRunner.query(`ALTER TABLE "agency" DROP CONSTRAINT "FK_a79a91ab952b54018f5639d4fa3"`);
        await queryRunner.query(`DROP TABLE "favored_account"`);
        await queryRunner.query(`DROP TABLE "agency"`);
        await queryRunner.query(`DROP TABLE "bank"`);
    }

}
