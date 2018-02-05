<?php
 
	include 'conexion.php';
	global $conexion;
	$json_dias = $_REQUEST['dates1'];
	$id = $_REQUEST['id'];
	echo($id);
	echo($json_dias);
	$dias = json_decode($json_dias);
	$dias.json_last_error();
	echo $dias;
	// Separamos los dias y generamos un array con ellos
	$array_dias = explode(",", $json_dias);
	echo($array_dias);
	$aux = "true";
	for ($i=0 ; $i<count($array_dias) ; $i++) {
		$ordenSQL = 'INSERT INTO dias_laborables (id_medico, fecha_laboral) VALUES("' . $id . '", "' . $array_dias[$i] . '")';
		
		$res = $conexion->query($ordenSQL);
		if (!$res) {
			$aux = "false";
			break;
		}
	}
	echo $aux;

?>