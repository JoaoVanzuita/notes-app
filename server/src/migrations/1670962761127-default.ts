import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670962761127 implements MigrationInterface {
    name = 'default1670962761127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "created_on" TO "updated_on"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" RENAME COLUMN "updated_on" TO "created_on"`);
    }

}
