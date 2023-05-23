<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// constantes d'environnement 
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", "quai_antique_mdp");
define("DBNAME", "quai_antique");

function createDatabase($db)
{
    try {
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
            titre VARCHAR(50)
        )");


        $db->exec("
        CREATE TABLE IF NOT EXISTS Formules (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(50),
            description TEXT,
            prix DECIMAL(5,2),
            menu_id INT,
            FOREIGN KEY (menu_id) REFERENCES Menus(id)
        )");


        $db->exec("
        CREATE TABLE IF NOT EXISTS ProductsPhare (
                id INT AUTO_INCREMENT PRIMARY KEY,
                productId INT,
                photo VARCHAR(255),
                FOREIGN KEY (productId) REFERENCES Products(id)
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
                closingTime TIME,
                UNIQUE KEY(dayOfWeek, shift)
            )
        ");

        $db->exec("
        CREATE TABLE IF NOT EXISTS Reservations (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userID INT UNSIGNED,
            dateTime DATETIME NOT NULL,
            guests INT,
            FOREIGN KEY (userID) REFERENCES User(id)
        )");

        $db->exec("
        CREATE TABLE IF NOT EXISTS Constants (
            id VARCHAR(50) PRIMARY KEY,
            value VARCHAR(255)
        )");

    } catch (PDOException $e) {
        echo "An error occurred while creating the tables";
        die($e->getMessage());
    }
}

function insertMenus($db)
{
    $menus = [
        [
            'titre' => 'Menu du Jour',
            'formules' => [
                [
                    'titre' => 'Formule Déjeuner',
                    'description' => 'Un déjeuner délicieux et équilibré pour bien commencer la journée.',
                    'prix' => 20.00
                ],
                [
                    'titre' => 'Formule Dîner',
                    'description' => 'Un dîner riche et savoureux pour terminer la journée en beauté.',
                    'prix' => 30.00
                ],
            ],
        ],
        [
            'titre' => 'Menu Gourmet',
            'formules' => [
                [
                    'titre' => 'Formule Déjeuner Gourmet',
                    'description' => 'Un déjeuner gourmet pour les amateurs de bonne cuisine.',
                    'prix' => 40.00
                ],
                [
                    'titre' => 'Formule Dîner Gourmet',
                    'description' => 'Un dîner gourmet pour une expérience culinaire inoubliable.',
                    'prix' => 50.00
                ],
            ],
        ],
        [
            'titre' => 'Menu Découverte',
            'formules' => [
                [
                    'titre' => 'Formule Déjeuner Découverte',
                    'description' => 'Découvrez de nouvelles saveurs avec notre formule déjeuner.',
                    'prix' => 25.00
                ],
                [
                    'titre' => 'Formule Dîner Découverte',
                    'description' => 'Explorez le monde à travers notre formule dîner.',
                    'prix' => 35.00
                ],
            ],
        ],
    ];

    try {
        $db->beginTransaction();

        foreach ($menus as $menu) {
            $stmt = $db->prepare("INSERT INTO Menus (titre) VALUES (:titre)");
            $stmt->bindParam(':titre', $menu['titre']);
            $stmt->execute();
            $menuId = $db->lastInsertId();

            foreach ($menu['formules'] as $formule) {
                $stmt = $db->prepare("INSERT INTO Formules (titre, description, prix, menu_id) VALUES (:titre, :description, :prix, :menu_id)");
                $stmt->bindParam(':titre', $formule['titre']);
                $stmt->bindParam(':description', $formule['description']);
                $stmt->bindParam(':prix', $formule['prix']);
                $stmt->bindParam(':menu_id', $menuId);
                $stmt->execute();
            }
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
    }
}

function initializeOpeningHours($db)
{
    $openingHours = [
       
        ['dayOfWeek' => 1, 'shift' => 'CLOSED', 'openingTime' => NULL, 'closingTime' => NULL],

        ['dayOfWeek' => 2, 'shift' => 'AM', 'openingTime' => '10:00:00', 'closingTime' => '15:00:00'],
        ['dayOfWeek' => 2, 'shift' => 'PM', 'openingTime' => '18:00:00', 'closingTime' => '23:00:00'],

        ['dayOfWeek' => 3, 'shift' => 'AM', 'openingTime' => '10:00:00', 'closingTime' => '15:00:00'],
        ['dayOfWeek' => 3, 'shift' => 'PM', 'openingTime' => '18:00:00', 'closingTime' => '23:00:00'],

        ['dayOfWeek' => 4, 'shift' => 'AM', 'openingTime' => '10:00:00', 'closingTime' => '15:00:00'],
        ['dayOfWeek' => 4, 'shift' => 'PM', 'openingTime' => '18:00:00', 'closingTime' => '23:00:00'],

        ['dayOfWeek' => 5, 'shift' => 'FULL', 'openingTime' => '10:00:00', 'closingTime' => '20:00:00'],

        ['dayOfWeek' => 6, 'shift' => 'FULL', 'openingTime' => '10:00:00', 'closingTime' => '23:00:00'],

        ['dayOfWeek' => 7, 'shift' => 'CLOSED', 'openingTime' => NULL, 'closingTime' => NULL],
    ];

    try {
        $db->beginTransaction();

        foreach ($openingHours as $hours) {
            if ($hours['shift'] == 'CLOSED') {
                $hours['openingTime'] = NULL;
                $hours['closingTime'] = NULL;
            }

            $stmt = $db->prepare("INSERT INTO OpeningHours (dayOfWeek, shift, openingTime, closingTime) VALUES (:dayOfWeek, :shift, :openingTime, :closingTime)");

            $stmt->bindParam(':dayOfWeek', $hours['dayOfWeek']);
            $stmt->bindParam(':shift', $hours['shift']);
            $stmt->bindParam(':openingTime', $hours['openingTime']);
            $stmt->bindParam(':closingTime', $hours['closingTime']);

            $stmt->execute();
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
    }
}


function insertProducts($db)
{
    $products = [
        [
            'type' => 'entree',
            'title' => 'Tartiflette',
            'description' => 'Plat traditionnel savoyard à base de pommes de terre, de lardons, d\'oignons et de reblochon fondu',
            'prix' => 10.50,
        ],
        [
            'type' => 'entree',
            'title' => 'Salade Savoyarde',
            'description' => 'Salade fraîche avec des morceaux de Tomme de Savoie, des croûtons de pain et une vinaigrette maison',
            'prix' => 8.95,
        ],
        [
            'type' => 'entree',
            'title' => 'Croûte aux Champignons',
            'description' => 'Délicieuse croûte garnie de champignons frais, de crème et de fromage gratiné',
            'prix' => 9.75,
        ],
        [
            'type' => 'entree',
            'title' => 'Croûte aux Morilles',
            'description' => 'Délicieuse croûte garnie de morilles sautées avec une sauce crémeuse à la crème fraîche',
            'prix' => 12.95,
        ],
        [
            'type' => 'entree',
            'title' => 'Escargots de Bourgogne',
            'description' => 'Escargots de Bourgogne cuits dans du beurre à l\'ail et servis avec une persillade',
            'prix' => 9.50,
        ],
        [
            'type' => 'plat',
            'title' => 'Diots de Savoie',
            'description' => 'Saucisses savoyardes grillées accompagnées de polenta crémeuse et de choucroute',
            'prix' => 14.50,
        ],
        [
            'type' => 'plat',
            'title' => 'Raclette Savoyarde',
            'description' => 'Assortiment de fromages à raclette fondus accompagnés de pommes de terre, de cornichons et de charcuterie',
            'prix' => 16.95,
        ],
        [
            'type' => 'plat',
            'title' => 'Farçon Savoyard',
            'description' => 'Pain de pommes de terre râpées, de lardons, d\'oignons et de persil, cuit au four jusqu\'à obtenir une croûte dorée',
            'prix' => 12.75,
        ],
        [
            'type' => 'plat',
            'title' => 'Gratin de Crozets',
            'description' => 'Gratin de crozets, petites pâtes savoyardes, avec du jambon, des oignons et du fromage fondu',
            'prix' => 13.50,
        ],
        [
            'type' => 'plat',
            'title' => 'Poulet aux Diots',
            'description' => 'Poulet fermier mijoté avec des diots savoyards, des légumes et une sauce au vin blanc',
            'prix' => 15.95,
        ],
        [
            'type' => 'dessert',
            'title' => 'Tarte aux Myrtilles',
            'description' => 'Délicieuse tarte aux myrtilles fraîches avec une croûte croustillante et une garniture sucrée',
            'prix' => 6.95,
        ],
        [
            'type' => 'dessert',
            'title' => 'Fondant au Chocolat Blanc',
            'description' => 'Moelleux au chocolat blanc fondant à l\'intérieur, accompagné d\'une sauce au chocolat noir',
            'prix' => 7.50,
        ],
        [
            'type' => 'dessert',
            'title' => 'Crème Brûlée à la Chartreuse',
            'description' => 'Crème onctueuse parfumée à la liqueur de Chartreuse, avec une fine couche de caramel croquant',
            'prix' => 8.25,
        ],
        [
            'type' => 'dessert',
            'title' => 'Fondue au Chocolat',
            'description' => 'Fondue au chocolat noir avec des fruits frais, des guimauves et des morceaux de gâteau',
            'prix' => 8.95,
        ],
        [
            'type' => 'dessert',
            'title' => 'Beignet de Savoie',
            'description' => 'Beignet traditionnel de Savoie frit et saupoudré de sucre glace',
            'prix' => 5.50,
        ],
    ];

    try {
        $db->beginTransaction();

        foreach ($products as $product) {
            $stmt = $db->prepare("INSERT INTO Products (type, titre, description, prix) VALUES (:type, :titre, :description, :prix)");

            $stmt->bindParam(':type', $product['type']);
            $stmt->bindParam(':titre', $product['title']);
            $stmt->bindParam(':description', $product['description']);
            $stmt->bindParam(':prix', $product['prix']);

            $stmt->execute();
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
    }
}


function insertProductsPhare($db)
{
    $firstsProductsIdsQuery = $db->prepare("SELECT id FROM Products WHERE type = 'entree' LIMIT 5");
    $firstsProductsIdsQuery->execute();

    $firstsProductsIds = $firstsProductsIdsQuery->fetchAll(PDO::FETCH_ASSOC);
    $firstsProductsIds = array_column($firstsProductsIds, 'id');

    $productsPhare = [
        [
            'productId' => $firstsProductsIds[0],
            'photo' => 'chicken.jpg'
        ],
        [
            'productId' => $firstsProductsIds[1],
            'photo' => 'quiche.jpg'
        ],
        [
            'productId' => $firstsProductsIds[2],
            'photo' => 'stew.jpg'
        ],
        [
            'productId' => $firstsProductsIds[3],
            'photo' => 'truite.jpg'
        ],
        [
            'productId' => $firstsProductsIds[4],
            'photo' => 'cheese.jpg'
        ]
    ];

    try {
        $db->beginTransaction();

        foreach ($productsPhare as $productPhare) {
            $stmt = $db->prepare("INSERT INTO ProductsPhare (productId, photo) VALUES (:productId, :photo)");

            $stmt->bindParam(':productId', $productPhare['productId']);
            $stmt->bindParam(':photo', $productPhare['photo']);

            $stmt->execute();
        }

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
    } catch (Exception $e) {
        echo $e->getMessage();
        $db->rollBack();
    }
}

function insertConstants($db)
{
    try {
        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO Constants (id, value) VALUES (:id, :value)");

        $id = 'PLACES_RESERVATION';
        $value = 60;

        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt->bindParam(':value', $value, PDO::PARAM_INT);

        $stmt->execute();

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
    }
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

createDatabase($db);

insertConstants($db);
insertProducts($db);
insertMenus($db);
initializeOpeningHours($db);
insertProductsPhare($db);