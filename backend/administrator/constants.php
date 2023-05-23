<?php
require_once '../ini/ini.php';
require_once '../functions.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Get constants
        $query = $db->prepare("SELECT * FROM Constants WHERE id = :id LIMIT 1");
        $query->bindParam(':id', $id);
        $query->execute();

        $constant = $query->fetch(PDO::FETCH_ASSOC);

        echo json_encode($constant);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $data = getRequestDataBody();
    $token = $data["token"];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payloadJwt = json_decode($decodedToken[1], true);

    $currentUser = $payloadJwt["id"];
    $currentUserMail = $payloadJwt["mail"];

    if ($payloadJwt && $token && $currentUser) {
        $isAdmin = CurrentUserIsAdmin($db, $currentUser, $currentUserMail);
        $id = $data["id"];
        $value = $data["value"];

        if (!is_numeric($value) || $value < 0) {
            echo "La valeur doit être un nombre supérieur à 0";
            exit();
        }

        if ($isAdmin) {
            $db->beginTransaction();

            $query = $db->prepare("UPDATE Constants SET value = :value WHERE id = :id");
            $query->bindParam(':id', $id);
            $query->bindParam(':value', $value);

            $query->execute();

            $db->commit();
        } else {
            echo "Vous ne disposez pas des droits d'utilisateur nécessaires";
        }
    }
}