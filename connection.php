<?php

$servername = "*************";
$database  = "*************";
$username = "***********";
$password = "****************";


$conn = new mysqli($servername, $username, $password);

if (!mysqli_select_db($conn, $database)){
	echo "Database not selected";
}


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>