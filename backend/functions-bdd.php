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
function CurrentUserIsAdmin($db, $id, $mail)
{
    $sql = 'SELECT * FROM User WHERE id = :id AND email = :email';
    
    try {
        $request = $db->prepare($sql);
        $request->bindParam(':id', $id);
        $request->bindParam(':email', $mail);
        $request->execute();
    } catch (PDOException $e) {
        die('Erreur : ' . $e->getMessage());
    }
    
    $users = $request->fetchAll();

    if (!$users || count($users) == 0) {
        return "No user found";
    }

    foreach ($users as $index => $user) {
        if($user["email"] !== "admin-quai-antique@gmail.com") {
            return "User is not an admin";
        } else {
            return true;
        }
    }
}




/*
* Requête d'insertion des users dans la base de données 
*/
function insertUser($db, $table, $profil, $nom, $email, $prenom, $city, $password, $allergies)
{
    try {
        $db->beginTransaction();
            $db->exec("insert into $table (profil, nom, email, prenom, ville, mdp, allergies) values ( '$profil', '$nom', '$email', '$prenom', '$city', '$password', '$allergies')");
    
        $db->commit();
        echo "Success";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}

function addReservation($db, $userId, $date, $hours, $guests) {
    try {
        // Convertir la date et l'heure en objet DateTime
        $dateTime = new DateTime("$date $hours");
        
        // Préparer la requête SQL
        $stmt = $db->prepare("SELECT * FROM Reservations WHERE userID = :userID AND dateTime = :dateTime");
        
        // Exécutez la requête SQL et récupérez le résultat
        $stmt->execute([':userID' => $userId, ':dateTime' => $dateTime->format('Y-m-d H:i:s')]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if($result) {
            // Réservation existe déjà
            echo 'Vous avez déjà une réservaton à cette date';
        } else {
            // Insert new reservation
            $stmt = $db->prepare("INSERT INTO Reservations (userID, dateTime, guests) VALUES (:userID, :dateTime, :guests)");
            $stmt->execute([':userID' => $userId, ':dateTime' => $dateTime->format('Y-m-d H:i:s'), ':guests' => $guests]);
            echo 'Votre réservation a été enregistrée ! ';
        }
    } catch(PDOException $e) {
        // Si une erreur se produit, retournez l'erreur
        return ['error' => $e->getMessage()];
    } catch(Exception $e) {
        // Si une erreur se produit, retournez l'erreur
        return ['error' => $e->getMessage()];
    }
}

function checkUpcomingReservation($db, $userID) {
    try {

        $now = new DateTime();
        $mysqlDateTime = $now->format('Y-m-d H:i:s');

        $stmt = $db->prepare("SELECT * FROM Reservations WHERE userID = :userID AND dateTime > :now");
        $stmt->execute([':userID' => $userID, ':now' => $mysqlDateTime]);

        if ($stmt->rowCount() > 0) {
            return true;
        } else { 
            return false;
        }

    } catch (PDOException $e) {
        return $e->getMessage();
    }
}

function getUpcomingReservation($db, $userID) {
    try {
        $now = new DateTime();
        $mysqlDateTime = $now->format('Y-m-d H:i:s');

        // Rechercher la prochaine réservation de l'utilisateur
        $stmt = $db->prepare("SELECT * FROM Reservations WHERE userID = :userID AND dateTime > :now ORDER BY dateTime ASC LIMIT 1");
        $stmt->execute([':userID' => $userID, ':now' => $mysqlDateTime]);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);  // Retourner les détails de la réservation
        } else { 
            return false;  // Aucune réservation à venir
        }

    } catch (PDOException $e) {
        return $e->getMessage();
    }
}


function checkAvailableSeats($db, $date, $hours) {
    try {
        // Convertir la date et l'heure en objet DateTime
        $dateTime = new DateTime("$date $hours");

        // Obtenir le nombre total de personnes ayant réservé à ce créneau horaire
        $stmt = $db->prepare("SELECT SUM(guests) AS totalGuests FROM Reservations WHERE dateTime = :dateTime");
        $stmt->execute([':dateTime' => $dateTime->format('Y-m-d H:i:s')]);

        // Vérifier si le nombre total de personnes est supérieur à 60
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row && $row['totalGuests'] >= 60) {
            return true;
        }
        return false; 
    } catch (PDOException $e) {
        return $e->getMessage();
    }
}

function insertProduct($db, $table, $description, $prix, $type, $titre)
{
    try {
        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO $table (type, titre, description, prix) VALUES (:type, :titre, :description, :prix)");

        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':titre', $titre);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':prix', $prix);

        $stmt->execute();

        $db->commit();
        echo "Success";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}

function modifyProduct($db, $table, $id, $description, $prix, $type, $titre)
{
    try {
        $db->beginTransaction();

        $stmt = $db->prepare("UPDATE $table SET type = :type, titre = :titre, description = :description, prix = :prix WHERE id = :id");

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':titre', $titre);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':prix', $prix);

        $stmt->execute();

        $db->commit();
        echo "Success";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}
