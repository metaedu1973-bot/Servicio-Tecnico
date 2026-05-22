<!DOCTYPE html>
<html>
<head>
    <title>Inventario CPU</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

<div class="container">

<h1>Ingreso de Equipos</h1>

<form action="guardar.php" method="POST">

<input type="text" name="area" placeholder="Área">
<input type="text" name="funcionario" placeholder="Funcionario">
<input type="text" name="usuario_pc" placeholder="Usuario PC">
<input type="text" name="modelo" placeholder="Modelo">
<input type="text" name="serie" placeholder="Serie">
<input type="text" name="estado" placeholder="Estado">
<textarea name="observaciones" placeholder="Observaciones"></textarea>

<button type="submit">Guardar Equipo</button>

</form>

<br>
<a href="prueba.php">Ver Equipos</a>

</div>

</body>
</html>
