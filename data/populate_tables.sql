BEGIN;

-- Ajout des conditions d'articles
INSERT INTO "condition" ("condition_name") VALUES 
  ('Acceptable'),
  ('Bon'),
  ('Parfait');

-- Ajout de catégories de mangas
INSERT INTO "category" ("name") VALUES 
  ('Shonen'),
  ('Shojo'),  
  ('Seinen');

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
  ('Nami', 'Zukara', 'nami', '1992-07-03', '4 Rue des Navigateurs', '93200', 'Saint-Denis', 123456789, 'nami@email.com', 'hashed_password', 2),
  ('Sakura', 'Haruno', 'sakura', '1995-03-28', '6 Rue des Fleurs', '93370', 'Montfermeil', 555666777, 'sakura@email.com', 'hashed_password', 2),
  ('Zoro', 'Roron', 'zoro', '1993-11-11', '7 Rue des Épéistes', '93200', 'Saint-Denis', 999888777, 'zoro@email.com', 'hashed_password', 2),
  ('Ryuk', 'Abdoulaye', 'ryuk', '1979-12-11', '8 Rue des Shinigamis', '93270', 'Sevran', 333222111, 'ryuk@email.com', 'hashed_password', 2),
  ('Sasuke', 'Uchiha', 'sasuke', '1994-07-23', '9 Rue des Vengeurs', '93370', 'Montfermeil', 666555444, 'sasuke@email.com', 'hashed_password', 2);

-- Ajout de mangas
INSERT INTO "manga" ("code_ISBN", "title", "volume", "year_publication", "author", "description", "cover_url", "category_id")
VALUES 
  ('9782723488525', 'One Piece - A l''aube d''une grande aventure', 1, 1997, 'Eiichiro Oda', 'Aventure de Monkey D. Luffy et son équipage de pirates', 'one_piece_cover.jpg', 1),
  ('9782505000327', 'Death Note - Premier contact', 1, 2003, 'Tsugumi Ohba', 'Un cahier qui tue quiconque a son nom écrit dedans', 'death_note_cover.jpg', 3),
  ('5678901234567', 'Naruto - Le ninja débutant', 1, 1999, 'Masashi Kishimoto', 'Naruto Uzumaki cherche à devenir le plus grand ninja', 'naruto_cover.jpg', 1),
  ('3456789012345', 'My Hero Academia - Origines', 1, 2014, 'Kohei Horikoshi', 'Izuku Midoriya tente de devenir un héros malgré l''absence de super-pouvoirs', 'my_hero_academia_cover.jpg', 1),
  ('9782811611699', 'Attack on Titan - Tome 1', 1, 2009, 'Hajime Isayama', 'L''humanité lutte pour survivre contre des titans géants', 'attack_on_titan_cover.jpg', 3),
  ('9782368522257', 'One-Punch Man - 1 - Un poing c''est tout !', 1, 2009, 'ONE', 'Saitama, un héros qui peut vaincre n''importe quel ennemi en un seul coup', 'one_punch_man_cover.jpg', 1),
  ('9782809482317', 'Demon Slayer T01', 1, 2016, 'Koyoharu Gotouge', 'Tanjiro Kamado et ses amis luttent contre des démons pour sauver sa sœur', 'demon_slayer_cover.jpg', 2),
  ('9782351420171', 'Fullmetal Alchemist - Tome 1', 1, 2001, 'Hiromu Arakawa', 'Edward et Alphonse Elric cherchent la Pierre Philosophale', 'fullmetal_alchemist_cover.jpg', 2),
  ('9782871292661', 'Hunter x Hunter - A la poursuite du rêve', 1, 1998, 'Yoshihiro Togashi', 'Gon Freecss cherche son père et veut devenir un hunter', 'hunter_x_hunter_cover.jpg', 1),
  ('9782723495615', 'Tokyo Ghoul - Chasseur de goules', 1, 2011, 'Sui Ishida', 'Ken Kaneki devient un goule après une rencontre inattendue', 'tokyo_ghoul_cover.jpg', 3),
  ('9782820325006', 'Black Clover - Le grimoire noir', 1, 2015, 'Yūki Tabata', 'Asta veut devenir le Sorcier Empereur malgré son absence de magie', 'black_clover_cover.jpg', 1),
  ('9782820316585', 'Haikyuu!! - Montée vers les sommets', 1, 2012, 'Haruichi Furudate', 'L''équipe de volley-ball de Karasuno vise la victoire nationale', 'haikyuu_cover.jpg', 3),
  ('9791032705544', 'Jujutsu Kaisen - Tome 1', 1, 2018, 'Gege Akutami', 'Yuji Itadori affronte des malédictions et explore le monde des sorciers', 'jujutsu_kaisen_cover.jpg', 3);

-- Ajout d'articles
INSERT INTO "article" ("title", "description", "price", "condition_id")
VALUES 
  ('Article 1', 'Description de l''article 1', 10, 1),
  ('Article 2', 'Description de l''article 2', 25, 2),
  ('Article 3', 'Description de l''article 3', 50, 3);

-- Association d'utilisateurs avec des articles
INSERT INTO "user_has_article" ("user_id", "article_id") VALUES 
  (1, 1),
  (2, 2),
  (3, 3);

-- Association de mangas avec des articles
INSERT INTO "manga_has_article" ("manga_code_ISBN", "article_id") VALUES 
  ('9782723488525', 1),
  ('9782505000327', 2),
  ('5678901234567', 3);

COMMIT;