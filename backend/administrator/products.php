<?php 
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';
require_once '../functions-opening.php';



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
