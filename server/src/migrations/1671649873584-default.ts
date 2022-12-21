import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671649873584 implements MigrationInterface {
    name = 'default1671649873584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
