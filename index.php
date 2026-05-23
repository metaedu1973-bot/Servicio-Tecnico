<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Sistema Técnico CNE</title>

<link rel="stylesheet"
href="estilos.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

</head>

<body>

<header>

<h1>
🏢 CNE - SISTEMA TÉCNICO
</h1>

<button onclick="cerrarSesion()">
🚪 Cerrar Sesión
</button>

</header>

<div class="dashboard">

<div class="card-dashboard">

<h2 id="totalEquipos">
0
</h2>

<p>Equipos Registrados</p>

</div>

<div class="card-dashboard">

<h2 id="totalMantenimientos">
0
</h2>

<p>Mantenimientos</p>

</div>

</div>

<div class="contenedor">

<div class="titulo-reporte">

<h2>
📋 Registro Técnico
</h2>

<div class="info-superior">

<div id="nombreTecnico">
👨‍🔧 Técnico
</div>

<div id="fechaActual">
📅 Fecha
</div>

<div>

N° <span id="numeroReporte">
#1
</span>

</div>

</div>

</div>

<div class="formulario">

<input type="text"
id="area"
placeholder="🏢 Área">

<input type="text"
id="equipo"
placeholder="💻 Equipo">

<input type="text"
id="servicio"
placeholder="🛠️ Servicio">

<input type="text"
id="modelo"
placeholder="🖥️ Modelo">

<input type="text"
id="marca"
placeholder="💻 Marca">

<input type="text"
id="serie"
placeholder="🔢 Serie">

<input type="text"
id="codigo"
placeholder="🏷️ Código">

<select id="estado">

<option value="Pendiente">
🟡 Pendiente
</option>

<option value="Reparación">
🔵 Reparación
</option>

<option value="Entregado">
🟢 Entregado
</option>

</select>

<textarea
id="observaciones"
placeholder="📝 Observaciones">
</textarea>

<input type="text"
id="tecnico"
readonly>

<input type="file"
id="foto"
accept="image/*">

<button onclick="guardar()">
💾 Guardar Registro
</button>

</div>

<div class="acciones">

<button onclick="exportarExcel()">
📊 Excel
</button>

<button onclick="generarPDF()">
📄 PDF
</button>

</div>

<input type="text"
id="buscar"
placeholder="🔍 Buscar reporte..."
onkeyup="buscarEquipo()">

<div class="tabla-contenedor">

<table>

<thead>

<tr>

<th>#</th>
<th>Fecha</th>
<th>Equipo</th>
<th>Área</th>
<th>Estado</th>
<th>Técnico</th>
<th>Acciones</th>

</tr>

</thead>

<tbody id="lista">

</tbody>

</table>

</div>

</div>

<script type="module"
src="script.js"></script>

</body>
</html>
