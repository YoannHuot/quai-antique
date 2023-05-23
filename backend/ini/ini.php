<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'functions.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// header("Access-Control-Allow-Headers: *");

// constantes d'environnement 
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "quai_antique_mdp");
define("DBNAME", "quai_antique");


function isAlreadyFilled($db)
{
    // Regarde si il y a déjà des produits
    $hasProductsQuery = $db->prepare("SELECT COUNT(*) as count from Products;");
    $hasProductsQuery->execute();
    $hasProductsQueryCount = $hasProductsQuery->rowCount();

    return $hasProductsQueryCount > 0;
}

$flagFile = 'dbinit.lock';
$dbInit = false;

// Fonction qui permet de n'appeler qu'une seule fois l'insertion des données initiales, autre que celles rentrées par l'admin.
if (!file_exists($flagFile)) {
    $dbInit = true;
}

// DSN de connexion 
$dsn = "mysql:dbname=" . DBNAME . ";host=" . DBHOST;
const SECRET = '0hLa83lleBroue11e';

try {
    $db = new PDO($dsn, DBUSER, DBPASS);
} catch (PDOException $e) {
    echo "An error occurred while accessing the database";
    die($e->getMessage());
}


if (!$dbInit) {
    createDatabase($db);

    if (!isAlreadyFilled($db)) {
        insertConstants($db);
        insertProducts($db);
        insertMenus($db);
        initializeOpeningHours($db);
        insertProductsPhare($db);
    }

    file_put_contents($flagFile, '');
}