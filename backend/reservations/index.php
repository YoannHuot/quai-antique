<?php
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);

    $date = $data['formattedDate'];
    $guests = $data['guests'];
    $hours = $data['selectedHours'];

    $currentUser = $payload["id"];

if($payload && $token && $currentUser && $date && $hours && $guests ) {

    $hasReservation =  checkUpcomingReservation($db, $currentUser); 
    $restaurantIsFull =  checkAvailableSeats($db, $date, $hours);

    if($hasReservation === true) { 
        echo  "Vous avez déjà une réservation à venir. Veuillez annuler votre réservation actuelle avant d'en faire une nouvelle.";
    } else if($hasReservation === false) { 
        addReservation($db, $currentUser, $date, $hours, $guests);
    }

    if($restaurantIsFull === true) { 
        echo "Le restaurant est complet à ce créneau horaire. Veuillez choisir un autre horaire.";
    } elseif ($restaurantIsFull === false) { 
        echo "Il y a encore des places disponibles à ce créneau horaire.";
    }
  
 }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    $currentUser = $payload["id"];

    if($currentUser && $token && $validToken) { 
        $hasReservation =  getUpcomingReservation($db, $currentUser); 
        echo(json_encode($hasReservation));
    }
}
    

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    $currentUser = $payload["id"];

    try {
     
        if(!$payload) {
            echo json_encode(['success' => false, 'message' => 'Token non valide']);
            exit();
        }

        $userID = $payload->id; 

        $stmt = $db->prepare("DELETE FROM Reservations WHERE userID = :userID");
        $stmt->execute([':userID' => $currentUser]);

        if($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Réservation annulée avec succès']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'annulation de la réservation']);
        }

    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}