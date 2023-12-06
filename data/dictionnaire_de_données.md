
**Table "utilisateur":**

| Code_utilisateur | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_utilisateur | INTEGER       | PRIMARY KEY, GENERATED ALWAYS   | Code utilisateur unique.                     |
| nom              | VARCHAR(30)   |                                | Nom de famille de l'utilisateur.              |
| prenom           | VARCHAR(30)   |                                | Prénom de l'utilisateur.                      |
| pseudo           | VARCHAR(30)   | UNIQUE, NOT NULL               | Pseudo unique de l'utilisateur.               |
| date_naissance   | birthdate_domain | CHECK                        | Date de naissance de l'utilisateur.           |
| adresse          | TEXT          |                                | Adresse de l'utilisateur.                     |
| code_postal      | TEXT          |                                | Code postal de l'utilisateur.                 |
| ville            | TEXT          |                                | Ville de l'utilisateur.                       |
| numero_telephone | VARCHAR(15)   |                                | Numéro de téléphone de l'utilisateur.        |
| courriel         | email_domain  | UNIQUE, NOT NULL, CHECK        | Adresse e-mail unique de l'utilisateur.      |
| mot_de_passe     | VARCHAR(255)  | NOT NULL                       | Mot de passe de l'utilisateur.                |
| code_role        | INTEGER       | NOT NULL, DEFAULT 1            | Clé étrangère liée à la table "role".         |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "role":**

| Code_role        | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_role        | INTEGER       | PRIMARY KEY, GENERATED ALWAYS   | Code du rôle unique.                          |
| nom_role         | VARCHAR(30)   | NOT NULL                       | Nom du rôle.                                  |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "manga":**

| Code_ISBN        | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_isbn        | VARCHAR(30)   | PRIMARY KEY                    | Code ISBN unique du manga.                    |
| titre            | VARCHAR(255)  | NOT NULL                       | Titre du manga.                              |
| volume           | INTEGER       | NOT NULL                       | Volume du manga.                             |
| annee_publication| INTEGER       | NOT NULL                       | Année de publication du manga.               |
| auteur           | VARCHAR(30)   | NOT NULL                       | Auteur du manga.                             |
| description      | TEXT          | NOT NULL                       | Description du manga.                        |
| cover_url        | TEXT          |                                | URL de la couverture du manga.               |
| code_categorie   | INTEGER       | NOT NULL                       | Clé étrangère liée à la table "category".    |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "categorie":**

| Code_categorie   | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_categorie   | INTEGER       | PRIMARY KEY, GENERATED ALWAYS   | Code de la catégorie unique.                 |
| nom_categorie    | VARCHAR(30)   | NOT NULL                       | Nom de la catégorie.                          |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "article":**

| Code_article     | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_article     | INTEGER       | PRIMARY KEY, GENERATED ALWAYS   | Code de l'article unique.                     |
| titre            | VARCHAR(255)  | NOT NULL                       | Titre de l'article.                           |
| description      | TEXT          | NOT NULL                       | Description de l'article.                     |
| prix             | INT           |                                | Prix de l'article.                           |
| code_transaction | VARCHAR(36)   |                                | Code unique de la transaction.                |
| date_transaction | DATE          |                                | Date de la transaction.                      |
| etat_achèvement  | VARCHAR(30)   |                                | État d'achèvement de l'article.               |
| image_url        | VARCHAR(255)  |                                | URL de l'image de l'article.                  |
| code_condition   | INTEGER       | NOT NULL                       | Clé étrangère liée à la table "condition".   |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "condition":**

| Code_condition   | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_condition   | INTEGER       | PRIMARY KEY, GENERATED ALWAYS   | Code de la condition unique.                  |
| nom_condition    | VARCHAR(30)   | NOT NULL                       | Nom de la condition.                         |
| cree_le          | TIMESTAMPTZ   | NOT NULL, DEFAULT now()        | Date de création de l'enregistrement.         |
| mis_a_jour_le     | TIMESTAMPTZ   |                                | Date de la dernière mise à jour.              |

**Table "utilisateur_a_article":**

| Code_utilisateur | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_utilisateur | INTEGER       | REFERENCES "utilisateur" ("code_utilisateur") | Clé étrangère liée à la table "utilisateur".  |
| code_article     | INTEGER       | REFERENCES "article" ("code_article") | Clé étrangère liée à la table "article".      |
| PRIMARY KEY      | (code_utilisateur, code_article) |                         | Clé primaire composée des clés étrangères.    |

**Table "manga_a

_article":**

| Code_ISBN        | Type          | Spécificités                   | Description                                   |
|------------------|---------------|--------------------------------|-----------------------------------------------|
| code_isbn        | VARCHAR(16)   | REFERENCES "manga" ("code_isbn") | Clé étrangère liée à la table "manga".        |
| code_article     | INTEGER       | REFERENCES "article" ("code_article") | Clé étrangère liée à la table "article".      |
| PRIMARY KEY      | (code_isbn, code_article) |                              | Clé primaire composée des clés étrangères.    |