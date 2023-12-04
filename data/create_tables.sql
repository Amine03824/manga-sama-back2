BEGIN;


-- Suppression des tables si elles existaient déjà

DROP TABLE IF EXISTS "user", "role", "manga", "category", "article", "condition" CASCADE;

-- Création des tables

-- Création du domaine email afin de valider et d'améliorer la consistence de données 
CREATE DOMAIN email_domain AS VARCHAR(255);
-- -----------------------------------------------------
--             Table des utilisateurs                 --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "lastname" VARCHAR(30) NOT NULL,
  "firstname" VARCHAR(30) NOT NULL,
  "pseudo" VARCHAR(30) NOT NULL,
  "birthdate" DATE,
  "address" TEXT,
  "zip_code" TEXT,
  "city" TEXT,
  "phone_number" INT,
  -- La clause CHECK impose une contrainte sur les valeurs de la colonne email_domain
  "email" email_domain CHECK (email ~* '^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role_id" INTEGER NOT NULL,  -- on ne peut pas tout de suite indiquer que cette clé est une clé étrangère qui fait référence à la table role, puisque la table role n'existe pas encore ! (on le fera plus tard)
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--     Table des rôles associés aux utilisateurs      --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "role_name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--                  Table de mangas                   --
-- 
CREATE TABLE IF NOT EXISTS "manga" (
  "code_ISBN" VARCHAR(30) NOT NULL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "volume" INTEGER NOT NULL,
  "year_publication" INTEGER NOT NULL ,
  "author" VARCHAR(30) NOT NULL,
  "description" TEXT NOT NULL,
  "cover_url" TEXT,
  "category_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--                  Table de catégories               --
-- ----------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "category" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);


-- Création de l'extension uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
--                 Table des annonces                 --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "article" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "price" INT,
  "transaction_id" UUID DEFAULT uuid_generate_v4(),
  "date_transaction" DATE,
  "state_completion" VARCHAR(30),
  "image_url" VARCHAR(255),
  "condition_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ   
);

-- -----------------------------------------------------
--         Table d'état des mangas mis en vente       --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "condition" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
  "condition_name" VARCHAR(30) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
--               Ajout des clés étrangères            --
-- -----------------------------------------------------
-- Maintenant on peut créer la référence vers la table question pour le champ "role_id" dans la table "user" afin de réprésenter notre clé étrangère.
-- On remarquera ici la présence de l'instruction FOREIGN KEY qui dit explicitement que cette colonne sert de clé étrangère faisaint référence à la table question
-- Lors de la création d'une table ce détail est implicite.
ALTER TABLE "user"
  ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE CASCADE;

ALTER TABLE "manga"
  ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE;

ALTER TABLE "article"
  ADD FOREIGN KEY ("condition_id") REFERENCES "condition" ("id") ON DELETE CASCADE;

-- -----------------------------------------------------
--                 Tables d'association               --
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user_has_article" (
  "user_id" INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "article_id" INTEGER NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("user_id", "article_id")
);

CREATE TABLE IF NOT EXISTS "manga_has_article" (
  "manga_code_ISBN" VARCHAR(16) NOT NULL REFERENCES "manga" ("code_ISBN") ON DELETE CASCADE,
  "article_id" INTEGER NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
  PRIMARY KEY ("manga_code_ISBN", "article_id")
);


-- Pour mettre fin au bloc de transaction et l'exécuter
COMMIT;