<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// header("Access-Control-Allow-Headers: *");


// constantes d'environnement 
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "1223Yoann!");
define("DBNAME", "quai_antique");

// DSN de connexion 
$dsn = "mysql:dbname=" . DBNAME . ";host=" . DBHOST;

try {
    // instancier PDO : Créer une instance de PDO et connexion à la base
    $db = new PDO($dsn, DBUSER, DBPASS);

    // On s'assure d'envoyer les données en UTF-8 
    $db->exec("SET NAMES utf8");

    // définir le mode de rendu des FETCH
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $db->exec("
    CREATE TABLE IF NOT EXISTS User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profil ENUM('administrateur', 'utilisateur'),
        nom VARCHAR(50),
        email VARCHAR(50),
        prenom VARCHAR(50),
        ville VARCHAR(50),
        mdp VARCHAR(255),
        allergies VARCHAR(255)
    )");


    $db->exec("
    CREATE TABLE IF NOT EXISTS Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('plat', 'entree', 'dessert'),
        titre VARCHAR(50),
        description TEXT,
        prix DECIMAL(5,2)
    )");

    $db->exec("
        CREATE TABLE IF NOT EXISTS Menus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            entree1 INT,
            entree2 INT,
            plat1 INT,
            plat2 INT,
            dessert1 INT,
            dessert2 INT,
            prix DECIMAL(5,2)
        )");

    
    $db->exec("
        CREATE TABLE IF NOT EXISTS ProductsPhare (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(50),
            photo VARCHAR(255)
        )");

    
    $db->exec("
        CREATE TABLE IF NOT EXISTS Horaires (
            id INT AUTO_INCREMENT PRIMARY KEY,
            jour ENUM('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'),
            heure_ouverture TIME,
            heure_fermeture TIME
        )");

    
    $db->exec("
    CREATE TABLE IF NOT EXISTS Tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nb_couvert INT,
        disponibilite ENUM('disponible', 'non disponible'),
        horaire_id INT,
        FOREIGN KEY (horaire_id) REFERENCES Horaires(id)
    )");


    echo "Success : ";

    // On est maintenant connecté
} catch (PDOException $e) {
    echo "An error occurred while creating the tables";
    die($e->getMessage());
}
