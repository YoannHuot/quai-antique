<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    $db = new PDO($dsn, DBUSER, DBPASS);
} catch (PDOException $e) {
    echo "An error occurred while accessing the database";
    die($e->getMessage());
}