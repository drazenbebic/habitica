-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('str', 'int', 'con', 'per');

-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('up', 'down');

-- CreateTable
CREATE TABLE "webhook_triggers" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "github_user_id" BIGINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "event" VARCHAR(255) NOT NULL,
    "task_title" VARCHAR(255) NOT NULL,
    "task_alias" VARCHAR(255),
    "task_note" VARCHAR(255),
    "task_priority" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "task_tags" JSONB,
    "task_attribute" "Attribute" NOT NULL DEFAULT 'str',
    "task_frequency" "Frequency" NOT NULL DEFAULT 'DAILY',
    "score_direction" "Direction" NOT NULL DEFAULT 'up',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_triggers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webhook_triggers_uuid_key" ON "webhook_triggers"("uuid");

-- AddForeignKey
ALTER TABLE "webhook_triggers" ADD CONSTRAINT "webhook_triggers_github_user_id_fkey" FOREIGN KEY ("github_user_id") REFERENCES "github_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
