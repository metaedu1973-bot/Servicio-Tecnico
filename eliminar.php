<?php

$conexion = new mysqli("localhost", "root", "", "inventario_cpu");

$id = $_GET['id'];

$sql = "DELETE FROM equipos WHERE id=$id";

$conexion->query($sql);

header("Location: prueba.php");

?>
