<?php
 
	include 'conexion.php';
	global $conexion;

	$id = $_REQUEST['id'];
	$id = json_decode($id);
	$ordenSQL = "SELECT * FROM dias_laborales WHERE id_medico='$id'";
	$resul = $conexion->query($ordenSQL);
	$dimension=$resul->num_rows;
	//print_r($query);
	if ($dimension>0) {
		for ($i=0; $i < $dimension; $i++) { 	
			$array_fechas[] = $resul->fetch_assoc();						
		};

		$obj_JSON = json_encode($array_fechas);

		//echo $obj_JSON;
		//print_r($array_fecha[0]->fecha_laboral);
		//print_r($obj_JSON);
	} else {
		echo "error";
	}	
?>

