<?php
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // OpeningHours
    $queryOpeningHours = $db->prepare("SELECT * FROM OpeningHours");
    $queryOpeningHours->execute();
    $openingHours = $queryOpeningHours->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($openingHours);
};

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

    if ($payloadJwt && $token && $currentUser) {
        $isAdmin = CurrentUserIsAdmin($db, $currentUser, $currentUserMail);
        $schedule = $data["payload"];

        foreach ($schedule as $day => &$shifts) {
            foreach ($shifts as &$shift) {
                if ($shift[0] === "Fermé") {
                    $shift[0] = null;
                }
                if ($shift[1] === "Fermé") {
                    $shift[1] = null;
                }
            }
        }
        unset($shift);
        unset($shifts);

        $dayOfWeekMap = [
            'Lundi' => 1,
            'Mardi' => 2,
            'Mercredi' => 3,
            'Jeudi' => 4,
            'Vendredi' => 5,
            'Samedi' => 6,
            'Dimanche' => 7,
        ];

        foreach ($schedule as $dayOfWeek => $shifts) {
            $numericDayOfWeek = $dayOfWeekMap[$dayOfWeek];
          
            
            $openingTime1 = $shifts[0][0];
            $closingTime1 = $shifts[0][1];
            $openingTime2 = $shifts[1][0];
            $closingTime2 = $shifts[1][1];
        
        
            if ($openingTime1 == NULL && $closingTime1 == NULL && $openingTime2 == NULL && $closingTime2 == NULL) {
                $stmt = $db->prepare("
                    UPDATE OpeningHours 
                    SET shift = 'CLOSED', openingTime = NULL, closingTime = NULL
                    WHERE dayOfWeek = :numericDayOfWeek
                ");
                $stmt->bindParam(':numericDayOfWeek', $numericDayOfWeek);
                $stmt->execute();
                echo "Rows affected (CLOSED): " . $stmt->rowCount() . "\n";
            } else {
                $stmt = $db->prepare("
                    UPDATE OpeningHours 
                    SET openingTime = :openingTime1, closingTime = :closingTime1 
                    WHERE dayOfWeek = :numericDayOfWeek AND shift = 'AM'
                ");
                $stmt->bindParam(':openingTime1', $openingTime1);
                $stmt->bindParam(':closingTime1', $closingTime1);
                $stmt->bindParam(':numericDayOfWeek', $numericDayOfWeek);
                $stmt->execute();
        
                $stmt = $db->prepare("
                    UPDATE OpeningHours 
                    SET openingTime = :openingTime2, closingTime = :closingTime2 
                    WHERE dayOfWeek = :numericDayOfWeek AND shift = 'PM'
                ");
                $stmt->bindParam(':openingTime2', $openingTime2);
                $stmt->bindParam(':closingTime2', $closingTime2);
                $stmt->bindParam(':numericDayOfWeek', $numericDayOfWeek);
                $stmt->execute();
            }
        }
    }
}
