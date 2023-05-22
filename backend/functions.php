<?php

/*
* Permet de formater les données d'une requête Poste
*/
function getRequestDataBody()
{
    $body = file_get_contents('php://input');

    if (empty($body)) {
        return [];
    }

    // Parse json body and notify when error occurs
    $data = json_decode($body, true);
    if (json_last_error()) {
        trigger_error(json_last_error_msg());
        return [];
    }

    return $data;
}

// /*
// * Récupération du user en cours en fonction de son adresse email unique. 
// */
function checkUserLogin($db, $email, $password)
{
    $request = $db->prepare("SELECT * FROM User WHERE email = :email");
    $request->execute(array(':email' => $email));

    $user = $request->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['mdp'])) {
        // Return user data as JSON
        return $user;
    } else {
        // Return an error message as JSON
        var_dump($user["mdp"]);
        echo json_encode(array("error" => "Invalid login information"));
    }
}


/*
* Vérification de la validité de l'email envoyé
*/
function checkValidEmail($db, $mail) {
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM User WHERE email = :email");
    $stmt->execute([':email' => $mail]);

    $result = $stmt->fetch();

    if($result['count'] > 0) {
        return false;
    } else {
        return true;
    }
}

/*
* Vérification de l'email administrateur
*/
function registerAdminEmail($db, $mail) {
    if ($mail === "admin-quai-antique@gmail.com") {
        $stmt = $db->prepare("SELECT COUNT(*) as count FROM User WHERE email = :email");
        $stmt->execute([':email' => $mail]);

        $result = $stmt->fetch();

        if($result['count'] > 0) {
            return "L'email administrateur est déjà enregistré";
        } else {
            return 1;
        }
    } else {
        return "L'email fournie n'est pas une adresse email d'administrateur valide";
    }
}

/*
* Encodage des données du token JWT
*/
function base64UrlEncode($data)
{
    $result = base64_encode(json_encode(($data)));
    return str_replace(['+', '/', '='], ['-', '_', ''], $result);
}

function getJwtToken($payload, $secret)
{
    $header = [
        'typ' => 'JWT',
        'alg' => 'HS256'
    ];

    $header = base64UrlEncode($header);
    $payload = base64UrlEncode($payload);
    $secret = base64_encode($secret);
    // var_dump($secret);

    $signature = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
    $signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    // var_dump($signature);
    $jwt = "$header.$payload.$signature";

    return json_encode(array("jwt" => $jwt));;
}

function decodeJwt($jwt, $secret)
{

    if($jwt) { 
        $parts = explode('.', $jwt);
        if (count($parts) != 3) {
            throw new Exception('Invalid JWT format');
        }
    }
    list($header, $payload, $signatureProvided) = $parts;

    $secret = base64_encode($secret);
    $signatureExpected = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
    $signatureExpected = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signatureExpected));

    $checkValidity = $signatureExpected === $signatureProvided;
    $headerDecoded = base64_decode($header);
    $payloadDecoded = base64_decode($payload);

    return [
        $headerDecoded,
        $payloadDecoded,
        $checkValidity
    ];
}
