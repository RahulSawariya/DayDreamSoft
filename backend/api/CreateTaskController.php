<?php 
    include("../model/TaskModel.php");
    error_reporting(0);
    $myObj= (object)null;
    $myObj->Success = 0;
    $myObj->Msg = null;
    
    
    $u_id=$_POST['u_id']; 
    $title=$_POST["title"];
    $date=$_POST["date"];
    
    $taskimage=$_FILES["taskimg"]["name"];
    $ftype=$_FILES["taskimg"]["type"];
    $fsize=$_FILES["taskimg"]["size"];
   
	$auth_email = $_POST['auth_email'];
	$auth_token = $_POST['auth_token'];

	$obj = new Task();
    $obj->dbCheck($auth_email,$auth_token);		
	
	// var_dump($data);
    // var_dump($data[0]['id']);
	// die();

    // $created_by = $data[0]['id'];

	if($obj->CreatedOrNot)
	{	


    if($fsize<5242880 && $fsize>0)
    {
        if(move_uploaded_file($_FILES["taskimg"]["tmp_name"],"../../frontend/public/uploads/".$_FILES["taskimg"]["name"]))
        {
            
            $objTask = new Task();
            //object declaretion for using MyReact class. MyReact class is in MyReactModel.php file
            $objTask->dbCreateTask($u_id,$title,$date,$taskimage);     
            
            if($objTask->PrintedOrNot)
            {       
                $myObj->Msg ='Task Inserted Successfully...';       
                $myObj->success = 1;
                echo json_encode($myObj);
        
            }
            else
                {
                    $myObj->Msg ='Failed from Model.';      
                    echo json_encode($myObj);
                }
        }
      else
      {
        $myObj->Msg ='Unable to Move File into uploads.';       
        echo json_encode($myObj);
      }
        
    }
    else {
        $myObj->Msg='File is Empty OR file size is inappropriate.';
        echo json_encode($myObj);
    }
}
else
	{
		$myObj->valid=false;
		$myObj->value = array("msg"=>"token mismatch!");		
		echo json_encode($myObj);
	}
?>