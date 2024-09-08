-- CreateTable
CREATE TABLE "hbtc_github_installations" (
    "uuid" VARCHAR(36) NOT NULL,
    "code" VARCHAR(20),
    "installation_id" INTEGER NOT NULL,
    "suspended" BOOLEAN DEFAULT false,

    CONSTRAINT "hbtc_github_installations_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "hbtc_github_users" (
    "uuid" VARCHAR(36) NOT NULL,
    "installation_uuid" VARCHAR(36) NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "id" INTEGER NOT NULL,
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

    CONSTRAINT "hbtc_github_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "hbtc_habitica_users" (
    "uuid" VARCHAR(36) NOT NULL,
    "github_user_uuid" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "api_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "hbtc_habitica_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_github_installations_installation_id_key" ON "hbtc_github_installations"("installation_id");

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_github_users_installation_uuid_key" ON "hbtc_github_users"("installation_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_github_users_login_key" ON "hbtc_github_users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_github_users_id_key" ON "hbtc_github_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_habitica_users_github_user_uuid_key" ON "hbtc_habitica_users"("github_user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "hbtc_habitica_users_user_id_key" ON "hbtc_habitica_users"("user_id");

-- AddForeignKey
ALTER TABLE "hbtc_github_users" ADD CONSTRAINT "hbtc_github_users_installation_uuid_fkey" FOREIGN KEY ("installation_uuid") REFERENCES "hbtc_github_installations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbtc_habitica_users" ADD CONSTRAINT "hbtc_habitica_users_github_user_uuid_fkey" FOREIGN KEY ("github_user_uuid") REFERENCES "hbtc_github_users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
