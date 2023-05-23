<?php 
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 
    $token = $_GET['token'];
    $menuId = $_GET['menuId'];
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
                // Supprimer d'abord les lignes associées dans la table Formules
                $stmt = $db->prepare("DELETE FROM Formules WHERE menu_id = :menuId");
                $stmt->execute([':menuId' => $menuId]);

                // Ensuite, supprimer la ligne correspondante dans la table Menus
                $stmt = $db->prepare("DELETE FROM Menus WHERE id = :menuId");
                $stmt->execute([':menuId' => $menuId]);
                

                if($stmt->rowCount() > 0) {
                    echo json_encode(['success' => true, 'message' => 'Menu supprimé avec succès']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Erreur lors de la suppression du menu']);
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
    echo("ok delete");
 
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = getRequestDataBody();
    $token = $data['token'];
    $titre = $data['titre'];
    $formules = $data['formules'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    $currentUser = $payload["id"];
    $currentUserMail = $payload["mail"];

    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);
	
    if($isAdmin) { 
        try {
            $db->beginTransaction();
    
            $stmt = $db->prepare("INSERT INTO Menus (titre) VALUES (:titre)");
            $stmt->bindParam(':titre', $titre);
            $stmt->execute();
            $menuId = $db->lastInsertId();
    
            foreach ($formules as $formule) {
                $stmt = $db->prepare("INSERT INTO Formules (titre, description, prix, menu_id) VALUES (:titre, :description, :prix, :menu_id)");
                $stmt->bindParam(':titre', $formule['titre']);
                $stmt->bindParam(':description', $formule['description']);
                $stmt->bindParam(':prix', $formule['prix']);
                $stmt->bindParam(':menu_id', $menuId);
                $stmt->execute();
            }
    
            $db->commit();
            echo json_encode(["status" => "success", "message" => "Menu ajouté avec succès"]);
    
        } catch (Exception $e) {
            $db->rollBack();
            echo json_encode(["status" => "error", "message" => "Une erreur est survenue lors de l'ajout du menu: " . $e->getMessage()]);
        }
    } else echo("Vous n'avez pas l'autorisation pour ajouter des menus");
    
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);
    $payload = $data["payload"];

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

    $isAdmin =  CurrentUserIsAdmin($db, $currentUser, $currentUserMail);

    if ($isAdmin) {
        if($payloadJwt) {
            try {
                $stmt = $db->prepare("UPDATE Menus SET titre = :title WHERE id = :id");
                $stmt->execute([':title' => $payload["title"], ':id' => $payload["id"]]);
                
                if($stmt->rowCount() > 0) {
                    echo json_encode(['success' => true, 'message' => 'Le titre du menu a été mis à jour avec succès']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour du titre du menu']);
                }
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
        } else { 
            echo json_encode(['success' => false, 'message' => 'Token non valide']);
        }
    } else { 
        echo json_encode(['success' => false, 'message' => "L'utilisateur n'est pas administrateur"]);
    }
}
