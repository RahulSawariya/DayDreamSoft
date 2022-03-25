<?php include("DbOperationModel.php");?>
<?php
    
    class Task extends DbOperation
    {
        //This variable discribes that, this article is exist in database or not .
        var $PrintedOrNot;
        var $SelectedOrNot;
        var $CreatedOrNot;
        var $check = 0;
        var $desinfo=null;

        function  dbCheck($auth_email,$auth_token)
        {
            $this->CreatedOrNot = 0;
            $objDbOperation = new DbOperation();
    
            $columnsName = "`id`";
            //database column name
            $tablesName = "auth";
            //database table name
            $conditions = "email = '" . $auth_email . "' AND token='" . $auth_token . "'";
            // conditions, what we want to apply
            $data = $objDbOperation->dbSelect($columnsName, $tablesName, $conditions);
    
            // var_dump($data);
    
            $result = array();
    
            while ($dataresult = mysqli_fetch_assoc($data)) {
                array_push($result, $dataresult);
            }
    
            if (mysqli_num_rows($data)) {
                $this->CreatedOrNot = 1;
                // $this->check = 1;
            }
         
            // var_dump($result);
            return $result;
        }

       //-----------------------Method for Create a new Task
        function dbCreateTask($u_id,$title,$date,$taskimage)
        {
            $objDbOperation = new DbOperation();
            $this->check=0;
            $status=1;
            
            $columnsName = "`u_id`,`title`,`date`,`img`,`status`";
            //database column name
            $tablesName = "task";
            //database table name
            $conditions = "'".$u_id."','".$title."','".$date."','".$taskimage."','".$status."'";
            // conditions, what we want to apply
            $result = $objDbOperation->dbInsert($columnsName,$tablesName,$conditions);
            
            if($result)
            {
                $this->PrintedOrNot = 1;
                $this->check = 1;               
            }
            //This if statement will execute For not creation Article
            if($this->check==0)
            {
                $this->PrintedOrNot=0;
            }
        }


    function  dbViewTask($u_id)
    {
        $this->CreatedOrNot = 0;
        $objDbOperation = new DbOperation();

        $columnsName = "`id`,`title`,`date`,`img`,`status`";
        //database column name
        $tablesName = "task";
        //database table name
        $conditions = "`u_id`= $u_id order by `date` ";
        // conditions, what we want to apply
        $data = $objDbOperation->dbSelect($columnsName, $tablesName,$conditions);

        // var_dump($data);

        $result = array();

        while ($dataresult = mysqli_fetch_assoc($data)) {
            array_push($result, $dataresult);
        }

        if (mysqli_num_rows($data)) {
            $this->CreatedOrNot = 1;
            // $this->check = 1;
        }
     
        // var_dump($result);
        return $result;
    }


    function dbCompleteTask($task_id)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`status`=0";
		//database column name
		$tablesName = "task";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "id = '" . $task_id . "'";
        // conditions, what we want to apply
		$result = $objDbOperation->dbUpdate($columnsName, $tablesName, $conditions);
		
        // var_dump($result);

        if ($result) {
            $this->CreatedOrNot = 1;
        }
        
	}

    }
?>