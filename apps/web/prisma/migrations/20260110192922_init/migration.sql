-- CreateTable
CREATE TABLE "github_installations" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "code" VARCHAR(20),
    "installation_id" INTEGER NOT NULL,
    "suspended" BOOLEAN DEFAULT false,

    CONSTRAINT "github_installations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_users" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "installation_id" BIGINT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "node_id" VARCHAR(20) NOT NULL,
    "avatar_url" VARCHAR(255),
    "gravatar_id" VARCHAR(255),
    "html_url" VARCHAR(255),
    "type" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "company" VARCHAR(255),
    "blog" VARCHAR(255),
    "location" VARCHAR(255),
    "email" VARCHAR(255),
    "access_token" VARCHAR(255),
    "expires_in" INTEGER,
    "refresh_token" VARCHAR(255),
    "refresh_token_expires_in" INTEGER,
    "scope" VARCHAR(255),
    "token_type" VARCHAR(20),

    CONSTRAINT "github_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habitica_users" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "github_user_id" BIGINT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "api_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "habitica_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "id" BIGSERIAL NOT NULL,
    "uuid" VARCHAR(36) NOT NULL,
    "delivery_uuid" VARCHAR(36) NOT NULL,
    "event" VARCHAR(255) NOT NULL,
    "signature" VARCHAR(255) NOT NULL,
    "hook_id" VARCHAR(255) NOT NULL,
    "github_user_id" BIGINT,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_installations_uuid_key" ON "github_installations"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "github_installations_installation_id_key" ON "github_installations"("installation_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_users_uuid_key" ON "github_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "github_users_installation_id_key" ON "github_users"("installation_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_users_github_id_key" ON "github_users"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_users_login_key" ON "github_users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "habitica_users_uuid_key" ON "habitica_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "habitica_users_github_user_id_key" ON "habitica_users"("github_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "habitica_users_user_id_key" ON "habitica_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_logs_uuid_key" ON "webhook_logs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_logs_delivery_uuid_key" ON "webhook_logs"("delivery_uuid");

-- AddForeignKey
ALTER TABLE "github_users" ADD CONSTRAINT "github_users_installation_id_fkey" FOREIGN KEY ("installation_id") REFERENCES "github_installations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitica_users" ADD CONSTRAINT "habitica_users_github_user_id_fkey" FOREIGN KEY ("github_user_id") REFERENCES "github_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_github_user_id_fkey" FOREIGN KEY ("github_user_id") REFERENCES "github_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
