<?php
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $body = getRequestDataBody();

    $nom = $body['payload']['nom'];
    $prenom = $body['payload']['prenom'];
    $city = $body['payload']['city'];
    $email = $body['payload']['email'];
    $password = $body['payload']['password'];
    $allergies = $body['payload']['allergies'];

    $validEmail = checkValidEmail($db, $email);

    if($validEmail === false) { 
        echo "Cette adresse mail est déjà enregistrée.";
    } else { 
        $passwordHashed =  password_hash($password, PASSWORD_BCRYPT);
        $isAdminSignIn = registerAdminEmail($db, $email);
        
        if($isAdminSignIn === 1) { 
            $allergyIds = implode(',', array_map('strval', $allergies));
            insertUser($db, 'User', 'administrateur', $nom, $email, $prenom, $city, $passwordHashed, $allergyIds);
        } else { 
            $allergyIds = implode(',', array_map('strval', $allergies));
            insertUser($db, 'User', 'utilisateur', $nom, $email, $prenom, $city, $passwordHashed, $allergyIds);
        }
        return "Success";
    }
};




