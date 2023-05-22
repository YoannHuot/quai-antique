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
const SECRET = '0hLa83lleBroue11e';

try {
    // instancier PDO : Créer une instance de PDO et connexion à la base
    $db = new PDO($dsn, DBUSER, DBPASS);

    // On s'assure d'envoyer les données en UTF-8 
    $db->exec("SET NAMES utf8");

    // définir le mode de rendu des FETCH
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $db->exec("
    CREATE TABLE IF NOT EXISTS User (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
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
        titre VARCHAR(50),
        prix DECIMAL(5,2)
    )");
    
    $db->exec("
    CREATE TABLE IF NOT EXISTS Menu_Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_id INT,
        product_id INT,
        type ENUM('plat', 'entree', 'dessert'),
        FOREIGN KEY (menu_id) REFERENCES Menus(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
    )");
   
    $db->exec("
        CREATE TABLE IF NOT EXISTS ProductsPhare (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(50),
            photo VARCHAR(255)
        )");
 
        
    $db->exec("
        CREATE TABLE IF NOT EXISTS DaysOpen (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            dayOfWeek INT(1) UNSIGNED NOT NULL  
        )");

    
    $db->exec("
    CREATE TABLE IF NOT EXISTS OpeningHours (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        dayOfWeek INT(1) UNSIGNED NOT NULL, 
        shift ENUM('AM', 'PM', 'FULL', 'CLOSED') NOT NULL,
        openingTime TIME,
        closingTime TIME
    )");

    $db->exec("
    CREATE TABLE IF NOT EXISTS Reservations (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userID INT UNSIGNED,
        dateTime DATETIME NOT NULL,
        guests INT,
        FOREIGN KEY (userID) REFERENCES User(id)
    )");
    


} catch (PDOException $e) {
    echo "An error occurred while creating the tables";
    die($e->getMessage());
}
