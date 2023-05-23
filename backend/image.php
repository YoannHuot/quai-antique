<?php

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$hostname = $_SERVER['HTTP_HOST'];

$imageUrl = $protocol . $hostname . '/backend/static';

$absoluteUrl = $_SERVER['DOCUMENT_ROOT'] . '/static';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['file'])) {
        $file = $_GET['file'];

        $cheminImage = $absoluteUrl . '/' . $file;

        // Déterminer le type MIME de l'image
        $typeMime = mime_content_type($cheminImage);

        // Lire le contenu de l'image
        $contenuImage = file_get_contents($cheminImage);

        // Envoyer les en-têtes appropriés
        header("Content-Type: $typeMime");
        header("Content-Length: " . strlen($contenuImage));

        // Renvoyer l'image en tant que réponse HTTP
        echo $contenuImage;
    }
}