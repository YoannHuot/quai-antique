<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $validEmail = checkValidEmail($db, $email);
    $data = getRequestDataBody();

    if($validEmail === false) { 
        echo "Cette adresse mail est déjà enregistrée.";
    } else { 
        $passwordHashed =  password_hash($password, PASSWORD_BCRYPT);
        $isAdminSignIn = registerAdminEmail($db, $email);
        
        if($isAdminSignIn === 1) { 
            $allergyIds = implode(',', array_map('strval', $allergies));
            insertData($db, 'User', 'administrateur', $nom, $email, $prenom, $city, $passwordHashed, $allergyIds);

        } else { 
            $allergyIds = implode(',', array_map('strval', $allergies));
            insertData($db, 'User', 'utilisateur', $nom, $email, $prenom, $city, $passwordHashed, $allergyIds);
        }
    }
};




