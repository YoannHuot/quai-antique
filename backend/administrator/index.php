<?php 
require_once '../config/config.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


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



function insertProducts($products, $db) {
    foreach ($products as $product) {
        $stmt = $db->prepare("SELECT COUNT(*) FROM Products WHERE LOWER(titre) = LOWER(:titre)");
        $stmt->bindParam(':titre', $product['title']);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            $stmt = $db->prepare("INSERT INTO Products (type, titre, description, prix) VALUES (:type, :titre, :description, :prix)");
            $stmt->bindParam(':type', $product['type']);
            $stmt->bindParam(':titre', $product['title']);
            $stmt->bindParam(':description', $product['description']);
            $stmt->bindParam(':prix', $product['prix']);
            $stmt->execute();
        }
    }
}

function insertMenus($menus, $db) {
    foreach ($menus as $menu) {
        $stmt = $db->prepare("SELECT COUNT(*) FROM Menus WHERE LOWER(titre) = LOWER(:titre)");
        $stmt->bindParam(':titre', $menu['titre']);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            $stmt = $db->prepare("INSERT INTO Menus (titre) VALUES (:titre)");
            $stmt->bindParam(':titre', $menu['titre']);
            $stmt->execute();

            $menu_id = $db->lastInsertId();
            foreach ($menu['formules'] as $formule) {
                $stmt = $db->prepare("INSERT INTO Formules (titre, description, prix, menu_id) VALUES (:titre, :description, :prix, :menu_id)");
                $stmt->bindParam(':titre', $formule['titre']);
                $stmt->bindParam(':description', $formule['description']);
                $stmt->bindParam(':prix', $formule['prix']);
                $stmt->bindParam(':menu_id', $menu_id);
                $stmt->execute();
            }
        }
    }
}





if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    insertProducts($products, $db);
    insertMenus($menus, $db);

    function getMenus($db) {
        $query = $db->prepare("SELECT * FROM Menus");
        $query->execute();
        $menus = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($menus as &$menu) {
            $query = $db->prepare("SELECT * FROM Formules WHERE menu_id = :menu_id");
            $query->bindParam(':menu_id', $menu['id']);
            $query->execute();
            $formules = $query->fetchAll(PDO::FETCH_ASSOC);
            $menu['formules'] = $formules;
        }

        return $menus;
    }

    function getProducts($db) {
        $query = $db->prepare("SELECT * FROM Products");
        $query->execute();
        $products = $query->fetchAll(PDO::FETCH_ASSOC);
        return $products;
    }

    $menus = getMenus($db);
    $products = getProducts($db);

    echo json_encode(['menus' => $menus, 'products' => $products]);
}
