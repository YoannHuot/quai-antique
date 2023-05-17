<?php
require_once '../config/config.php';
require_once '../functions.php';
// require_once '../config/data.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create JWT 
    // Data from app 
    $mail = $_GET['mail'];
    $password = $_GET['password'];


    $current_user = checkUserLogin($db, $mail, $password);

    // // Data fetched bdd 
    $user_id = $current_user["id"];
    $user_mail = $current_user["email"];
    $user_name = $current_user["nom"];
    $user_password = $current_user["mdp"];
    $user_firstname = $current_user["prenom"];
    $user_allergies = $current_user["allergies"];

    $payload = [
        'id' => $user_id,
        'mail' => $user_mail,
        'name' => $user_name,
        'firstname' => $user_firstname,
        'allergies' => $user_allergies
    ];

    if ($user_id) {
        $jwt = getJwtToken($payload, SECRET);
        $response = [
            'jwt' => $jwt,
            'name' => $user_name,
            'firstname' => $user_firstname,
            'allergies' => $user_allergies
        ];
        echo json_encode($response);
    }
};
