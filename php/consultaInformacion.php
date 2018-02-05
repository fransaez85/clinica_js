<?php
 
include 'conexion.php';

	class clinica {

		public $id;
		public $nombre;
		public $telefono;
		public $email;
		public $direccion;

		public function __construct ($id, $nombre, $telefono, $email, $direccion){

			$this->id = $id;
			$this->nombre = $nombre;
			$this->telefono = $telefono;
			$this->email = $email;
			$this->direccion = $direccion;
		}

}

//consulta un registro
$query = "SELECT * FROM informacion";
$resul = $conexion->query($query);
$dimension=$resul->num_rows;
if ($dimension>0) {

	$array_fila= $resul->fetch_array();
	/*$clinica = new clinica ($array_fila['id'], 
	$array_fila['denominacion'], 
	$array_fila['telefono'], 
	$array_fila['direccion']);*/
			
		$obj_JSON = json_encode($array_fila);
		echo $obj_JSON;
		//print_r($array_persona[0]->dni);
		//print_r($obj_JSON);

	} else {
		echo "error";
	}

?>