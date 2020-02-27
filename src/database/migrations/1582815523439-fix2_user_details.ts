import {MigrationInterface, QueryRunner} from "typeorm";

export class fix2UserDetails1582815523439 implements MigrationInterface {
    name = 'fix2UserDetails1582815523439'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8687924ae4d52f05db87f3352f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "detailsId" TO "detail_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_a8687924ae4d52f05db87f3352f" TO "UQ_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "users_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" TO "UQ_a8687924ae4d52f05db87f3352f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "detail_id" TO "detailsId"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "users_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
