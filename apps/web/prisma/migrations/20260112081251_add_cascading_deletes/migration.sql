/*
  Warnings:

  - Made the column `github_user_id` on table `webhook_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "github_users" DROP CONSTRAINT "github_users_installation_id_fkey";

-- DropForeignKey
ALTER TABLE "habitica_users" DROP CONSTRAINT "habitica_users_github_user_id_fkey";

-- DropForeignKey
ALTER TABLE "webhook_logs" DROP CONSTRAINT "webhook_logs_github_user_id_fkey";

-- AlterTable
ALTER TABLE "webhook_logs" ALTER COLUMN "github_user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "github_users" ADD CONSTRAINT "github_users_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "github_installations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitica_users" ADD CONSTRAINT "habitica_users_github_user_id_fkey" FOREIGN KEY ("github_user_id") REFERENCES "github_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_github_user_id_fkey" FOREIGN KEY ("github_user_id") REFERENCES "github_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
