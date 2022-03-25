<?php
	include("../model/AuthModel.php");
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
	error_reporting(0);
	$data = json_decode(file_get_contents("php://input"));
	
	$myObj=(object)null;

    $email = $data->email;
	$password = $data->password;

    // $email = "rahulmjain@gmail.com";
	// $password = "1234";

	$password_hash=hash('md5',$password);
    $token = hash('md5',rand(10000,99999));
	
	$obj = new Auth();
	$obj->dbSigninQuery($email,$password_hash,$token);		
	$u_id = $obj->dbSigninUid($email,$password_hash);		

	// var_dump($u_id);
	// var_dump($obj);
	// die();

	if($obj->CreatedOrNot)
	{	
		$myObj->valid=true;
		$myObj->value= array("u_id"=>$u_id[0]['id'], "token"=>$token,"msg"=>"Thanks for sign in!");
		$_SESSION['token']=$token;
		echo json_encode($myObj);
	}
	else
	{
		$myObj->valid=false;
		$myObj->value = array("msg"=>"Unauthorized User!!!");		
		echo json_encode($myObj);
	}
}
?>