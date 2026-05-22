async function guardar(){

let datos = {

area: area.value,
equipo: equipo.value,
servicio: servicio.value,
modelo: modelo.value,
marca: marca.value,
serie: serie.value,
codigo: codigo.value,

disco: disco.value,
memoria: memoria.value,
monitor: monitor.value,
teclado: teclado.value,
mouse: mouse.value,
impresora: impresora.value,
telefono: telefono.value,
antivirus: antivirus.value,
mantenimiento: mantenimiento.value
  tecnico: tecnico.value,
fecha: fecha.value

};

let lista = JSON.parse(localStorage.getItem("datos")) || [];

lista.push(datos);

localStorage.setItem("datos", JSON.stringify(lista));
await addDoc(collection(db,"equipos"), datos);

mostrar();

}

function mostrar(){

let lista = JSON.parse(localStorage.getItem("datos")) || [];

let cont = document.getElementById("lista");

cont.innerHTML = "";

lista.forEach((e,i)=>{

cont.innerHTML += `

<div class="card">

<b>Área:</b> ${e.area}<br>
<b>Equipo:</b> ${e.equipo}<br>
<b>Servicio:</b> ${e.servicio}<br>
<b>Modelo:</b> ${e.modelo}<br>
<b>Marca:</b> ${e.marca}<br>
<b>Serie:</b> ${e.serie}<br>
<b>Código:</b> ${e.codigo}<br>

<b>Disco:</b> ${e.disco}<br>
<b>Memoria:</b> ${e.memoria}<br>
<b>Monitor:</b> ${e.monitor}<br>
<b>Teclado:</b> ${e.teclado}<br>
<b>Mouse:</b> ${e.mouse}<br>
<b>Impresora:</b> ${e.impresora}<br>
<b>Teléfono:</b> ${e.telefono}<br>
<b>Antivirus:</b> ${e.antivirus}<br>
<b>Mantenimiento:</b> ${e.mantenimiento}<br>
<b>Técnico:</b> ${e.tecnico}<br>
<b>Fecha:</b> ${e.fecha}<br><br>

<button onclick="editar(${i})">
Editar
</button>

${localStorage.getItem("rol")=="admin" ?

`<button onclick="eliminar(${i})">
Eliminar
</button>`

:

""}

</div>

`;

});

}

function eliminar(i){

let lista = JSON.parse(localStorage.getItem("datos")) || [];

lista.splice(i,1);

localStorage.setItem("datos", JSON.stringify(lista));

mostrar();

}

function buscarEquipo(){

let texto = document
.getElementById("buscar")
.value
.toLowerCase();

let tarjetas = document
.querySelectorAll(".card");

tarjetas.forEach(t=>{

if(t.innerText.toLowerCase().includes(texto)){

t.style.display="block";

}else{

t.style.display="none";

}

});

}

mostrar();
function exportarExcel(){

let datos = JSON.parse(localStorage.getItem("datos")) || [];

let contenido = `
<table border="1">

<tr>

<th>Área</th>
<th>Equipo</th>
<th>Servicio</th>
<th>Modelo</th>
<th>Marca</th>
<th>Serie</th>
<th>Código</th>
<th>Disco</th>
<th>Memoria</th>
<th>Monitor</th>
<th>Teclado</th>
<th>Mouse</th>
<th>Impresora</th>
<th>Teléfono</th>
<th>Antivirus</th>
<th>Mantenimiento</th>
<th>Técnico</th>
<th>Fecha</th>

</tr>
`;

datos.forEach(e=>{

contenido += `

<tr>

<td>${e.area}</td>
<td>${e.equipo}</td>
<td>${e.servicio}</td>
<td>${e.modelo}</td>
<td>${e.marca}</td>
<td>${e.serie}</td>
<td>${e.codigo}</td>
<td>${e.disco}</td>
<td>${e.memoria}</td>
<td>${e.monitor}</td>
<td>${e.teclado}</td>
<td>${e.mouse}</td>
<td>${e.impresora}</td>
<td>${e.telefono}</td>
<td>${e.antivirus}</td>
<td>${e.mantenimiento}</td>
<td>${e.tecnico}</td>
<td>${e.fecha}</td>

</tr>

`;

});

contenido += `</table>`;

let archivo = new Blob([contenido], {
type:"application/vnd.ms-excel"
});

let url = URL.createObjectURL(archivo);

let link = document.createElement("a");

link.href = url;

link.download = "servicio_tecnico.xls";

link.click();
  function generarPDF(){

let ventana = window.open('', '', 'width=800,height=600');

let contenido = document.getElementById("lista").innerHTML;

ventana.document.write(`

<html>

<head>

<title>Reporte Técnico</title>

<style>

body{

font-family:Arial;
padding:20px;

}

.card{

border:1px solid gray;
padding:10px;
margin:10px;
border-radius:10px;

}

button{

display:none;

}

</style>

</head>

<body>

<h1>Reporte Servicio Técnico</h1>

${contenido}

</body>

</html>

`);

ventana.document.close();

ventana.print();

function editar(i){

let lista = JSON.parse(localStorage.getItem("datos")) || [];

let e = lista[i];

area.value = e.area;
equipo.value = e.equipo;
servicio.value = e.servicio;
modelo.value = e.modelo;
marca.value = e.marca;
serie.value = e.serie;
codigo.value = e.codigo;
disco.value = e.disco;
memoria.value = e.memoria;
monitor.value = e.monitor;
teclado.value = e.teclado;
mouse.value = e.mouse;
impresora.value = e.impresora;
telefono.value = e.telefono;
antivirus.value = e.antivirus;
mantenimiento.value = e.mantenimiento;
tecnico.value = e.tecnico;
fecha.value = e.fecha;

eliminar(i);

function cerrarSesion(){

localStorage.removeItem("rol");

window.location="login.html";

}

