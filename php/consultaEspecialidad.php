<?php 

include_once("conexion.php");

class especialidad {

		public $id;
		public $nombre;
		public $id_medico;

		public function __construct ($id, $nombre, $id_medico){

			$this->id = $id;
			$this->nombre = $nombre;
			$this->id_medico = $id_medico;
		}

}

$sql = "SELECT * FROM especialidad";
$res = $conexion->query($sql);
$aux = $res->num_rows;

if ($res->num_rows > 0) {
	while ($aux > 0) {

		$datos= $res->fetch_object();
		$dat[]=$datos;
		$aux--;

	}

	$json=JSON_encode($dat);
	echo $json;

}else {
		echo "error";
	}



	/*$query = "SELECT * FROM especialidad";
$resul = $conexion->query($query);
$dimension=$resul->num_rows;
if ($dimension>0) {

	$array_fila= $resul->fetch_array();
	//$especialidad = new especialidad ($array_fila['id'], 
	//$array_fila['nombre'],
			
		$obj_JSON = json_encode($array_fila);
		echo $obj_JSON;
		//print_r($array_fila[0]->nombre);
		//print_r($obj_JSON);

	} else {
		echo "error";
	}*/


?>