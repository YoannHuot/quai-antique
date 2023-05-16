<?php

$data = json_decode(file_get_contents("php://input"));

// Data payload from client
$address = $data->payload->address;
$allergies = $data->payload->allergies;
$city = $data->payload->city;
$email = $data->payload->email;
$nom = $data->payload->nom;
$password = $data->payload->password;
$passwordConfirm = $data->payload->passwordConfirm;
$prenom = $data->payload->prenom;


$jwt = $data->payload->token;


const SECRET = '0hLa83lleBroue11e';

