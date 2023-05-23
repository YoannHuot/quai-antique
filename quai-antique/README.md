This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Description
Bienvenue sur le répertoire du projet Restaurant Le Quai Antique ! Cette application web a été créée en utilisant Next.js pour le front-end, PHP pour le back-end, et MySQL pour la base de données.

## Prérequis
Node.js et npm/yarn
PHP 8.1.2
MySQL

## Installation
1. Clonez le répertoire  : 

```bash
git clone https://github.com/YoannHuot/quai-antique
```

1. Installez les dépendances du projet : 

```bash
cd quai-antique
npm install
```

ou

```bash
yarn install
```

3.Configurez la base de données

Assurez-vous d'avoir une base de données MySQL en cours d'exécution. Créez une base de données nommée quai_antique et configurez votre environnement avec les identifiants de la base de données.

```bash
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "votre_mot_de_passe");
define("DBNAME", "quai_antique");
```

4.Démarrez le serveur
Vous pouvez maintenant démarrer le serveur PHP en utilisant la commande suivante dans le répertoire de votre serveur :

```bash
cd backend
php -S localhost:8000
```

5.Lancez l'application
Ouvrez un autre terminal, naviguez jusqu'au répertoire du projet et lancez l'application avec npm ou yarn 

```bash
npm run dev
```

ou 

```bash
yarn dev
```

Votre application devrait maintenant être en cours d'exécution sur http://localhost:3000 !

6. 

## 

- Installer php
- Faire tourner un vhost php
- créer la database
- faire des .env pour changer tous les localhost:8000 par des trucs dynamiques

admin-quai-antique@gmail.com2M