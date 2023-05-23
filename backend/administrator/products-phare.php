<?php
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

function generateUniqueName($filename)
{
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $uniqueName = uniqid() . '.' . $extension;
    return $uniqueName;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = $db->prepare("SELECT p.id, p.type, p.titre, p.description, p.prix, pp.photo, pp.id as productStarId FROM Products p INNER JOIN ProductsPhare pp ON p.id = pp.productId");
    $query->execute();
    $products = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['products' => $products]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST;
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

    if ($payloadJwt && $token && $currentUser) {
        $isAdmin = CurrentUserIsAdmin($db, $currentUser, $currentUserMail);
        $id = $data["id"];
        $productId = $data["productId"];

        $nomImage = null;

        if ( isset($_FILES['photo']) ) {
            $absoluteUrl = $_SERVER['DOCUMENT_ROOT'] . '/static';
            $uploadedImage = $_FILES['photo'];
    
            $nomImage = generateUniqueName($uploadedImage['name']);
    
            $destination = $absoluteUrl . '/' . $nomImage;
    
            move_uploaded_file($uploadedImage['tmp_name'], $destination);
        }

        if ($isAdmin) {
            updateProductPhare($db, $id, $productId, $nomImage);
        } else {
            echo "Vous ne disposez pas des droits d'utilisateur nécessaires";
        }
    }
}