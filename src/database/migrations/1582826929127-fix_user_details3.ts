import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserDetails31582826929127 implements MigrationInterface {
    name = 'fixUserDetails31582826929127'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "status" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "update_at" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "update_at" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "status" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
