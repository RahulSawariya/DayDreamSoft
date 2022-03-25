<?php include("ConnectionModel.php"); ?>

<?php

class DbOperation
{
	function dbInsert($columnsName, $tablesName, $conditions)
	{
		$objConnection = new Connection();
		// object declaretion for using Connection class. Connection class is in ConnectionModel.php file
		$objConnection->dbConnection();
		$con = $objConnection->con;
		// $sql = "INSERT INTO ".$tablesName."( ".$columnsName." ) VALUES ( ".$conditions." )";
		$result = mysqli_query($con, "INSERT INTO " . $tablesName . "( " . $columnsName . " ) VALUES ( " . $conditions . " )");
		// var_dump($sql);
		// $last_insertid=$con->insert_id;
		// die();			
		$objConnection->dbCloseConnection();
		//var_dump($result);			
		// return $last_insertid;
		return $result;
	}

	function dbUpdate($columnsName, $tablesName, $conditions)
	{
		$objConnection = new Connection();
		// object declaretion for using Connection class. Connection class is in ConnectionModel.php file
		$objConnection->dbConnection();
		$con = $objConnection->con;
		// $sql = "UPDATE " . $tablesName . " SET " . $columnsName . " WHERE " . $conditions;
		$result = mysqli_query($con, "UPDATE " . $tablesName . " SET " . $columnsName . " WHERE " . $conditions);
		// var_dump($sql);						
		// var_dump(mysqli_affected_rows($con));
		$rowsAffected = mysqli_affected_rows($con);
		$objConnection->dbCloseConnection();
		//var_dump($result);
		return $rowsAffected;
	}

	function dbSelect($columnsName, $tablesName, $conditions)
	{
		$objConnection = new Connection();
		// object declaretion for using Connection class. Connection class is in ConnectionModel.php file
		$objConnection->dbConnection();
		$con = $objConnection->con;
		$sql = "SELECT " . $columnsName . " FROM " . $tablesName . " WHERE " . $conditions;
		// var_dump($sql);
		// die;
		$result = mysqli_query($con, $sql);


		$objConnection->dbCloseConnection();
		// var_dump($result);
		// print_r($result);
		// echo($result);
		// die;
		return $result;
	}

	function dbInsertTrans($columnsName, $tablesName, $conditions)
    {
        $objConnection = new Connection();
        // object declaretion for using Connection class. Connection class is in ConnectionModel.php file
        $objConnection->dbConnection();
        $con = $objConnection->con;
        // $sql = "INSERT INTO ".$tablesName."( ".$columnsName." ) VALUES ( ".$conditions." )";
        $result = mysqli_query($con, "INSERT INTO " . $tablesName . "( " . $columnsName . " ) VALUES ( " . $conditions . " )");
        //var_dump($sql);

        $last_insertid = $con->insert_id;
        // die();           
        $objConnection->dbCloseConnection();
        //var_dump($result);            
        return $last_insertid;
    }

}

?>