<?php

/* 
* Récupération de toutes les adresses emails de tous les utilisateurs pour checker les validités.
*/
function fetchEmails($fetchBdd, $db)
{
    $all_users = array();
    foreach ($fetchBdd as $role => $query) {
        $all_users[$role] = array();
        $requete = $db->query($query);
        $result = $requete->fetchAll();
        foreach ($result as $user) {
            array_push($all_users[$role], $user["email"]);
        }
    }
    return $all_users;
}

/*
* Fetch current user
*/
function FetchCurrentUser($db, $fetchBdd, $role, $mail)
{
    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $user) {
        var_dump($user);
    }
}

/*
* Récupération des consultants non validés par les adminsitrateurs
*/
function fetchUserUnValidate($db, $fetchBdd, $role)
{
    $usersUnvalidate = array();

    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $users) {
        if ($users["created_by"] === NULL) {
            array_push($usersUnvalidate, $users);
        }
    }
    return $usersUnvalidate;
}

/*
* Requête d'insertion dans la base de données selon le rôle
*/
function insertData($db, $table, $profil, $nom, $email, $prenom, $city, $password, $allergies)
{
    try {
        $db->beginTransaction();
            $db->exec("insert into $table (profil, nom, email, prenom, ville, mdp, allergies) values ( '$profil', '$nom', '$email', '$prenom', '$city', '$password', '$allergies')");
    
        $db->commit();
        echo "User $profil created";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}