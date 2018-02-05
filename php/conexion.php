<?php

$conexion = new mysqli("localhost","root","root");

if($conexion){

	$conexion->select_db("clinica") or die ("Base de Datos no encontrada");

}

?>