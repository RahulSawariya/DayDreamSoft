<?php
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
		error_reporting(0);

	session_unset();
	session_destroy();


	header('Cache-Control: no-cache, must-revalidate');
	// header("Location:../");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: GET,POST,PUT");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	}
?>