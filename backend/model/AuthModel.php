<?php include("DbOperationModel.php"); ?>
<?php

class Auth extends DbOperation
{
    var $CreatedOrNot=0;

    function dbSignupQuery($email,$password,$token)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`email`,`password`,`token`";
		//database column name
		$tablesName = "auth";
		//database table name
		$conditions = "'" . $email . "','" . $password . "','" . $token . "'";
		// conditions, what we want to apply
		$result = $objDbOperation->dbInsertTrans($columnsName, $tablesName, $conditions);
		// var_dump($result);
		// die();
		if ($result) {
			$this->CreatedOrNot = 1;
		}
		return $result;
	}

    function dbSigninQuery($email,$password,$token)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`token`='".$token."'";
		//database column name
		$tablesName = "auth";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "email = '" . $email . "' AND password='" . $password . "'";
        // conditions, what we want to apply
		$result = $objDbOperation->dbUpdate($columnsName, $tablesName, $conditions);
		
        // var_dump($result);

        if ($result) {
            $this->CreatedOrNot = 1;
        }
	}

	function dbSigninUid($email,$password)
	{
		$objDbOperation = new DbOperation();

		$columnsName2 = "`id`";
		//database column name
		$tablesName = "auth";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "email = '" . $email . "' AND password='" . $password . "'";
        // conditions, what we want to apply
		$data = $objDbOperation->dbSelect($columnsName2, $tablesName, $conditions);
		
		$result = array();

        while ($dataresult = mysqli_fetch_assoc($data)) {
            array_push($result, $dataresult);
        }

        if (mysqli_num_rows($data)) {
            $this->CreatedOrNot = 1;
            // $this->check = 1;
        }
     
        // var_dump($result);
        // return $result;
        // var_dump($result);

        // if ($result) {
        //     $this->CreatedOrNot = 1;
        // }
        
		return $result;
	}
}
?>