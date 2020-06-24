<?php

$servername = "localhost";
$database  = "id13447387_mrufkobaza";
$username = "id13447387_mrufka";
$password = "}V?/pUhMB1R%@0jK";

$conn = new mysqli($servername, $username, $password);

if (!mysqli_select_db($conn, $database)){
	echo "Database not selected";
}
else{
	echo "Database selected";
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";


if(getenv('REQUEST_METHOD') == 'POST') {
	$client_data = file_get_contents("php://input");

	$decoded_data_array = json_decode($client_data, true);

	echo $decoded_data_array[nickname];
	echo $decoded_data_array[score];
	echo $decoded_data_array[duration_m];
	echo $decoded_data_array[duration_s];
	
    $sql = "INSERT INTO Scores(nickname, score, duration_m, duration_s) VALUES ('$decoded_data_array[nickname]', '$decoded_data_array[score]','$decoded_data_array[duration_m]','$decoded_data_array[duration_s]')";
    
	
	if (!mysqli_query($conn, $sql))
	{
		echo "Not inserted";
	}
	else{
		echo "Inserted";
	}

    exit();
}
?>