import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserDetails1582815389685 implements MigrationInterface {
    name = 'fixUserDetails1582815389685'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "detailsId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a8687924ae4d52f05db87f3352f" UNIQUE ("detailsId")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "users_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8687924ae4d52f05db87f3352f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a8687924ae4d52f05db87f3352f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "detailsId"`, undefined);
    }

}
