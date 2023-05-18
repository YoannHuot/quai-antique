<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';
require_once '../functions-opening.php';


$openingHours = [
    ['dayOfWeek' => 1, 'shift' => 'AM', 'openingTime' => '10:00:00', 'closingTime' => '15:00:00'],
    ['dayOfWeek' => 1, 'shift' => 'PM', 'openingTime' => '18:00:00', 'closingTime' => '23:00:00'],  

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


initializeOpeningHours($db, $openingHours);



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    function getOpeningHours($db) {
        $query = $db->prepare("SELECT * FROM opening_hours");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    // $openingHours = getOpeningHours($db);
    // echo($openingHours);
    echo json_encode($openingHours);

};