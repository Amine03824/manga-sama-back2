BEGIN;

-- Ajout des catégories de mangas
INSERT INTO "category" ("category_name") VALUES 
('Shōnen'), 
('Seinen'), 
('Shōjo'), 
('Josei'), 
('Kodomo'), 
('Seijin');

-- Ajout des conditions d'articles
INSERT INTO "condition" ("condition_name") VALUES 
  ('Acceptable'),
  ('Bon'),
  ('Parfait');

-- Ajout des rôles
INSERT INTO "role" ("role_name") VALUES 
  ('Admin'),
  ('User');

COMMIT;  

BEGIN;

-- Ajout d'utilisateurs
INSERT INTO "user" ("lastname", "firstname", "pseudo", "birthdate", "address", "zip_code", "city", "phone_number", "email", "password", "role_id")
VALUES 
  ('Monkey', 'D. Luffy', 'luffy', '1994-05-05', '1 Rue de la Plage', '93200', 'Saint-Denis', 111222333, 'luffy@email.com', 'hashed_password', 1),
  ('Light', 'Yagami', 'kira', '1992-12-21', '2 Rue des Ombres', '93270', 'Sevran', 444555666, 'kira@email.com', 'hashed_password', 2),
  ('Naruto', 'Uzumaki', 'naruto', '1997-10-10', '3 Rue des Hokages', '93370', 'Montfermeil', 777888999, 'naruto@email.com', 'hashed_password', 2),
  ('Sasuke', 'Uchiha', 'sasuke', '1994-07-23', '9 Rue des Vengeurs', '93370', 'Montfermeil', 666555444, 'sasuke@email.com', 'hashed_password', 2);

COMMIT;