-- Ajout de mangas
INSERT INTO "manga" ("code_isbn", "title", "volume", "year_publication", "author", "description", "cover_url", "category_id")
VALUES 
('1111111111111', 'Manga 1', 1, 2022, 'Auteur 1', 'Description manga 1', 'url_image_manga_1', 1),
('2222222222222', 'Manga 2', 2, 2022, 'Auteur 2', 'Description manga 2', 'url_image_manga_2', 2),
('3333333333333', 'Manga 3', 3, 2022, 'Auteur 3', 'Description manga 3', 'url_image_manga_3', 1),
('4444444444444', 'Manga 4', 4, 2022, 'Auteur 4', 'Description manga 4', 'url_image_manga_4', 2),
('5555555555555', 'Manga 5', 5, 2022, 'Auteur 5', 'Description manga 5', 'url_image_manga_5', 1),
('6666666666666', 'Manga 6', 6, 2022, 'Auteur 6', 'Description manga 6', 'url_image_manga_6', 2),
('7777777777777', 'Manga 7', 7, 2022, 'Auteur 7', 'Description manga 7', 'url_image_manga_7', 1),
('8888888888888', 'Manga 8', 8, 2022, 'Auteur 8', 'Description manga 8', 'url_image_manga_8', 2);

-- Ajout d'articles associés aux mangas
INSERT INTO "article" ("title", "description", "price", "condition_id")
VALUES 
('Article 1', 'Description article 1', 10, 1),
('Article 2', 'Description article 2', 15, 2),
('Article 3', 'Description article 3', 20, 1),
('Article 4', 'Description article 4', 25, 2),
('Article 5', 'Description article 5', 30, 1),
('Article 6', 'Description article 6', 35, 2),
('Article 7', 'Description article 7', 40, 1),
('Article 8', 'Description article 8', 45, 2);

-- Associer des mangas à des articles
INSERT INTO "manga_has_article" ("manga_code_isbn", "article_id")
VALUES 
('1111111111111', 1),
('2222222222222', 2),
('3333333333333', 3),
('4444444444444', 4),
('5555555555555', 5),
('6666666666666', 6),
('7777777777777', 7),
('8888888888888', 8);

-- Ajout d'utilisateurs
INSERT INTO "user" ("username", "email", "password")
VALUES 
('user1', 'user1@email.com', 'password1'),
('user2', 'user2@email.com', 'password2'),
('user3', 'user3@email.com', 'password3'),
('user4', 'user4@email.com', 'password4');

-- Associer des utilisateurs à des articles
INSERT INTO "user_has_article" ("user_id", "article_id")
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(1, 5),
(2, 6),
(3, 7),
(4, 8);
