import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670888402886 implements MigrationInterface {
    name = 'default1670888402886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "createdAt" TO "created_on"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "created_on" TO "createdAt"`);
    }

}
