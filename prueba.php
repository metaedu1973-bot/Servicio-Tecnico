<?php

$conexion = new mysqli("localhost", "root", "", "inventario_cpu");

$sql = "SELECT * FROM equipos";
$resultado = $conexion->query($sql);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Lista de Equipos</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

<div class="container">

<h1>Lista de Equipos</h1>

<table>

<tr>
<th>ID</th>
<th>Área</th>
<th>Funcionario</th>
<th>Usuario</th>
<th>Modelo</th>
<th>Serie</th>
<th>Estado</th>
<th>Acciones</th>
</tr>

<?php while($fila = $resultado->fetch_assoc()) { ?>

<tr>
<td><?php echo $fila['id']; ?></td>
<td><?php echo $fila['area']; ?></td>
<td><?php echo $fila['funcionario']; ?></td>
<td><?php echo $fila['usuario_pc']; ?></td>
<td><?php echo $fila['modelo']; ?></td>
<td><?php echo $fila['serie']; ?></td>
<td><?php echo $fila['estado']; ?></td>

<td>
<a class="btn btn-delete" href="eliminar.php?id=<?php echo $fila['id']; ?>">
Eliminar
</a>
</td>

</tr>

<?php } ?>

</table>

<br>
<a href="index.php">Volver</a>

</div>

</body>
</html>
