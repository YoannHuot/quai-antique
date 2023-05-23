<?php 
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

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
                
                $stmt = $db->prepare("DELETE FROM Formules WHERE id = :cardId");
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
    $titre = $data["payload"]["title"];
    $formuleId = $data["payload"]["id"];

    if($isAdmin) { 
        modifyFormules($db, "Formules", $formuleId, $description, $prix, $titre);
    } else { 
        echo "Vous ne disposez pas des droits d'utilisateur nécessaires";
    }
   
 }
}