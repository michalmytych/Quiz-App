<?php


include_once("connection.php");


if(getenv('REQUEST_METHOD') == 'POST') {
	$client_data = file_get_contents("php://input");

	$decoded_data_array = json_decode($client_data, true);

	echo $decoded_data_array[nickname];
	echo $decoded_data_array[score];
	echo $decoded_data_array[duration_m];
	echo $decoded_data_array[duration_s];
	
	$post_score_query = "INSERT INTO Scores(nickname, score, duration_m, duration_s) VALUES ('$decoded_data_array[nickname]', '$decoded_data_array[score]','$decoded_data_array[duration_m]','$decoded_data_array[duration_s]')";
	
	if (!mysqli_query($conn, $post_score_query))
	{
		echo "Not inserted";
	}

    exit();
}

// UZYSKAJ DANE Z PYTAŃ Z BAZY DANYCH

// PRZEŚLIJ JSON Z PHP DO JS
$questions_array = array('question', 'answ1', 'answ2', 'answ3', 'answ4', 'valid_answ');
echo json_encode($questions_array);



?>