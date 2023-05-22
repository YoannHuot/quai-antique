<?php 
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';
require_once '../functions-opening.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    $currentUser = $payload["id"];
    $currentUserMail = $payload["mail"];

    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);

   if($isAdmin) { 
        if($payload) {
            $echo("on attend la card à delete");
        } else { 
            echo json_encode(['success' => false, 'message' => 'Token non valide']);
            exit();
        }
    } else { 
        echo json_encode(['success' => false, 'message' => "L'utilisateur n'est pas administrateur"]);
        exit();
    } 
   
    // try {
     


    //     $userID = $payload->id; // Supposons que l'ID de l'utilisateur est stocké dans le payload du token

    //     $stmt = $db->prepare("DELETE FROM Reservations WHERE userID = :userID");
    //     $stmt->execute([':userID' => $currentUser]);

    //     if($stmt->rowCount() > 0) {
    //         echo json_encode(['success' => true, 'message' => 'Réservation annulée avec succès']);
    //     } else {
    //         echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'annulation de la réservation']);
    //     }

    // } catch (PDOException $e) {
    //     echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    // }
}
