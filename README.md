# Bienvenue sur le Repo Back du projet Manga-Sama 🍣

## 🌿 Last branch standing : Setup Manga API + Database

### Connexion à l'utilisateur postgres en mode superutilisateur

```bash
sudo -i -u postgres psql
```

### Connexion à la base de données locale

```bash
psql -d nom_de_ta_base_de_donnees -U ton_utilisateur_postgres -h localhost
```

### Sauvegarde de la base de données locale avec pg_dump

```bash
pg_dump -h localhost -U ton_utilisateur_postgres -W nom_de_ta_base_de_donnees > lenomsurledisque
```

### Sauvegarde de la base de données distante avec pg_dump

```bash
pg_dump -h adresse_du_serveur_distante -U ton_utilisateur_postgres -W nom_de_ta_base_de_donnees > lenomsurledisque
```

### Import du backup dans une base de données locale

```bash
psql -d nom_de_ta_base_de_donnees -U ton_utilisateur_postgres -h localhost < lenomsurledisque
```

### Import du backup dans une base de données distante

```bash
psql -d nom_de_ta_base_de_donnees -U ton_utilisateur_postgres -h adresse_du_serveur_distante < lenomsurledisque
```

remplacer les valeurs des variables (`nom_de_ta_base_de_donnees`, `ton_utilisateur_postgres`, `lenomsurledisque`, `adresse_du_serveur_distante`) par les valeurs appropriées.

```postgres
postgres=# CREATE USER "admin" WITH password 'manga';
CREATE ROLE
postgres=# CREATE DATABASE mangadb WITH OWNER admin;
CREATE DATABASE
```

```bash
psql -U admin -d mangadb -f data/create_tables.sql
psql -U admin -d mangadb -f populate_tables.sql -h localhost
```
