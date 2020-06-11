<?php

$servername = "localhost";
$database  = "id13447387_mrufkobaza";
$username = "id13447387_mrufka";
$password = "}V?/pUhMB1R%@0jK";

// Łączenie z bazą danych:
$conn = new mysqli($servername, $username, $password);

if (!mysqli_select_db($conn, $database)){
	echo "Database not selected";
}

// Sprawdzanie połączenia
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>