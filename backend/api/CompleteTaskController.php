<?php
	include("../model/TaskModel.php");
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
	error_reporting(0);
	$data = json_decode(file_get_contents("php://input"));
	
	$myObj=(object)null;

    $auth_email = $data->auth_email;
	$auth_token = $data->auth_token;
    $task_id = $data->t_id;

    // $auth_email = "rahulmjain154@gmail.com";
	// $auth_token = "d2abdc034c8035de05f41e88d422be1d";
    // $first_name = "Rahul";
    // $last_name = "Jain";
    // $email = "rahulmjain154@gmail.com";
    // $address = "Udaipur"; 

	$obj = new Task();
    $data = $obj->dbCheck($auth_email,$auth_token);		
	
	// var_dump($data);
    // var_dump($data[0]['id']);
	// die();

	if($obj->CreatedOrNot)
	{	
        $obj2 = new Task();
        $obj2->dbCompleteTask($task_id);		

        // var_dump($obj2);
        // die();

        if($obj2->CreatedOrNot)
        {	        
		$myObj->valid=true;
		$myObj->value= array("msg"=>"Task is Completed Successfully.");
		echo json_encode($myObj);
        }
        else{
            $myObj->valid=false;
		    $myObj->value = array("msg"=>"Something went wrong!");		
		    echo json_encode($myObj);
        }
	}
	else
	{
		$myObj->valid=false;
		$myObj->value = array("msg"=>"token mismatch!");		
		echo json_encode($myObj);
	}
}
?>