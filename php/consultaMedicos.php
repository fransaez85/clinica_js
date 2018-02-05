<?php
include 'conexion.php';
$id = $_REQUEST['especialidad'];
//print_r($id);
//consulta un registro
$query = "SELECT * FROM medico WHERE id_especialidad='$id'";
$resul = $conexion->query($query);
$dimension=$resul->num_rows;
if ($dimension>0) {
	# code...
	for ($i=0; $i < $dimension; $i++) { 	
			$array_fila[] = $resul->fetch_assoc();
			$objmedico =$array_fila[$i];
								
			$array_medicos[$i] =  $objmedico;
		}

		$obj_JSON = json_encode($array_medicos);

		echo $obj_JSON;
		//print_r($array_persona[0]->dni);
		//print_r($obj_JSON);

	} else {
		echo "error";
	}

?>