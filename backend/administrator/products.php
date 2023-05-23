<?php 
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 
    $token = $_GET['token'];
    $cardId = $_GET['cardId'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    $currentUser = $payload["id"];
    $currentUserMail = $payload["mail"];

    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);

    try {
        if($isAdmin) { 
            if($payload) {

                $stmt = $db->prepare("DELETE FROM Products WHERE id = :cardId");
                $stmt->execute([':cardId' => $cardId]);
                

            if($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Produit supprimé avec succès']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de la suppression du produit']);
            }

            } else { 
                echo json_encode(['success' => false, 'message' => 'Token non valide']);
                exit();
            }
        } 
        else { 
            echo json_encode(['success' => false, 'message' => "L'utilisateur n'est pas administrateur"]);
            exit();
        } 

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

if($payloadJwt && $token && $currentUser ) {
    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);

    $description = $data["payload"]["description"];
    $prix = $data["payload"]["price"];
    $type = $data["payload"]["type"];
    $titre = $data["payload"]["title"];

    if($isAdmin) { 
        insertProduct($db, "Products", $description, $prix, $type, $titre);
    } else { 
        echo "Vous ne disposez pas des droits d'utilisateur nécessaires";
    }
   
 }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

if($payloadJwt && $token && $currentUser ) {
    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);

    $description = $data["payload"]["description"];
    $prix = $data["payload"]["price"];
    $type = $data["payload"]["type"];
    $titre = $data["payload"]["title"];
    $productId = $data["payload"]["id"];

    if($isAdmin) { 
        modifyProduct($db, "Products", $productId, $description, $prix, $type, $titre);

    } else { 
        echo "Vous ne disposez pas des droits d'utilisateur nécessaires";
    }
   
 }
}
