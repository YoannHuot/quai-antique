<?php
function initializeOpeningHours($db, $openingHours)
{
    $stmt = $db->query("SELECT COUNT(*) FROM OpeningHours");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        foreach ($openingHours as $hours) {
            if ($hours['shift'] == 'CLOSED') {
                $hours['openingTime'] = NULL;
                $hours['closingTime'] = NULL;
            }

            $stmt = $db->prepare("INSERT INTO OpeningHours (dayOfWeek, shift, openingTime, closingTime) VALUES (:dayOfWeek, :shift, :openingTime, :closingTime)");
            $stmt->execute($hours);
        }
    }
}
