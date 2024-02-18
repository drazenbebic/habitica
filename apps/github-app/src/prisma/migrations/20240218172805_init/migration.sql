-- CreateTable
CREATE TABLE "github_installations" (
    "uuid" VARCHAR(36) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "installation_id" VARCHAR(8) NOT NULL,

    CONSTRAINT "github_installations_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "habitica_users" (
    "uuid" VARCHAR(36) NOT NULL,
    "github_installation_uuid" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "api_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "habitica_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "habitica_users_github_installation_uuid_key" ON "habitica_users"("github_installation_uuid");

-- AddForeignKey
ALTER TABLE "habitica_users" ADD CONSTRAINT "habitica_users_github_installation_uuid_fkey" FOREIGN KEY ("github_installation_uuid") REFERENCES "github_installations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
