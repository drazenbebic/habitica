-- DropIndex
DROP INDEX "webhook_logs_delivery_uuid_key";

-- AlterTable
ALTER TABLE "webhook_logs" DROP COLUMN "payload";
