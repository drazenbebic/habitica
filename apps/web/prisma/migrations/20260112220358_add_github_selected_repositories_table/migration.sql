-- AlterTable
ALTER TABLE "github_installations" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "github_installations" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "github_installations" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "github_users" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "github_users" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "github_users" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "habitica_users" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "habitica_users" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "habitica_users" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "webhook_logs" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "webhook_logs" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "github_selected_repositories" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "installation_id" BIGINT NOT NULL,
    "github_repository_id" INTEGER NOT NULL,
    "node_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "github_selected_repositories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_selected_repositories_uuid_key" ON "github_selected_repositories"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "github_selected_repositories_installation_id_github_reposit_key" ON "github_selected_repositories"("installation_id", "github_repository_id");

-- AddForeignKey
ALTER TABLE "github_selected_repositories" ADD CONSTRAINT "github_selected_repositories_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "github_installations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
