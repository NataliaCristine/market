import {MigrationInterface, QueryRunner} from "typeorm";

export class market11644350782932 implements MigrationInterface {
    name = 'market11644350782932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_1442fd7cb5e0b32ff5d0b6c13d0" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUuid" uuid, CONSTRAINT "REL_10ad03394e9f479b66e4abf6da" UNIQUE ("userUuid"), CONSTRAINT "PK_7fec7d177c5c8d93ea9916ac46d" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "recoverPass" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "buy" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUuid" uuid, CONSTRAINT "PK_bca750eb7882c36f2f51b0cb43f" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "cart_product_product" ("cartUuid" uuid NOT NULL, "productUuid" uuid NOT NULL, CONSTRAINT "PK_3aa02e5a9133db995858684a39e" PRIMARY KEY ("cartUuid", "productUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b13bb358cd99b43c57f6e8a77" ON "cart_product_product" ("cartUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_01d9396fab78bdca4c884ae27a" ON "cart_product_product" ("productUuid") `);
        await queryRunner.query(`CREATE TABLE "buy_product_product" ("buyUuid" uuid NOT NULL, "productUuid" uuid NOT NULL, CONSTRAINT "PK_01686fc13a690df34094f207e04" PRIMARY KEY ("buyUuid", "productUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a224a00af288afb3d84c4d4658" ON "buy_product_product" ("buyUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebde5c51f1284d1086590f1817" ON "buy_product_product" ("productUuid") `);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_10ad03394e9f479b66e4abf6da9" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_8a6b809affe806663e4a486c8c4" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product_product" ADD CONSTRAINT "FK_8b13bb358cd99b43c57f6e8a77b" FOREIGN KEY ("cartUuid") REFERENCES "cart"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_product_product" ADD CONSTRAINT "FK_01d9396fab78bdca4c884ae27ab" FOREIGN KEY ("productUuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buy_product_product" ADD CONSTRAINT "FK_a224a00af288afb3d84c4d46582" FOREIGN KEY ("buyUuid") REFERENCES "buy"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buy_product_product" ADD CONSTRAINT "FK_ebde5c51f1284d1086590f1817f" FOREIGN KEY ("productUuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy_product_product" DROP CONSTRAINT "FK_ebde5c51f1284d1086590f1817f"`);
        await queryRunner.query(`ALTER TABLE "buy_product_product" DROP CONSTRAINT "FK_a224a00af288afb3d84c4d46582"`);
        await queryRunner.query(`ALTER TABLE "cart_product_product" DROP CONSTRAINT "FK_01d9396fab78bdca4c884ae27ab"`);
        await queryRunner.query(`ALTER TABLE "cart_product_product" DROP CONSTRAINT "FK_8b13bb358cd99b43c57f6e8a77b"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_8a6b809affe806663e4a486c8c4"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_10ad03394e9f479b66e4abf6da9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebde5c51f1284d1086590f1817"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a224a00af288afb3d84c4d4658"`);
        await queryRunner.query(`DROP TABLE "buy_product_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01d9396fab78bdca4c884ae27a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b13bb358cd99b43c57f6e8a77"`);
        await queryRunner.query(`DROP TABLE "cart_product_product"`);
        await queryRunner.query(`DROP TABLE "buy"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
