<?php
	include("../model/AuthModel.php");
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
	// error_reporting(0);
	$data = json_decode(file_get_contents("php://input"));
	
	$myObj=(object)null;

    $email = $data->email;
	$password = $data->password;

    // $email = "rahulmjain@gmail.com";
	// $password = "1234";

	$password_hash=hash('md5',$password);
	$token = hash('md5',rand(10000,99999));
	
	$obj = new Auth();
    $u_id = $obj->dbSignupQuery($email,$password_hash,$token);		
	
	// var_dump($obj);
	// die();

	if($obj->CreatedOrNot)
	{		
		$myObj->valid=true;
		$myObj->value= array("u_id"=>$u_id, "token"=>$token,"msg"=>"Thanks for sign up!");
		$_SESSION['token']=$token;
		echo json_encode($myObj);
	}
	else
	{
		$myObj->valid=false;
		$myObj->value = array("msg"=>"Something went wrong!");		
		echo json_encode($myObj);
	}
}
?>