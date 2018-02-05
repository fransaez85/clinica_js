<?php
include_once 'conexion.php';

//consulta todos los registros
$query = "SELECT * FROM medico";
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
			//alert($obj_JSON);
		echo $obj_JSON;
		
	} else {
		echo "error";
	}


/*include_once("conexion.php");

class medico {

		public $id;
		public $nombre;
		public $id_especialidad;
		public $foto;

		public function __construct ($id, $nombre,$id_especialidad, $foto){

			$this->id = $id;
			$this->nombre = $nombre;
			$this->id_especialidad = $id_especialidad;
			$this->foto = $foto;
		}

}

$sql = "SELECT * FROM medico";
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
	}*/


?>