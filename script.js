import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove,
update
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getAuth,
signOut
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyDILlEvHJ05IUg146N17zVwGG5RD7X50Y4",

authDomain: "servicio-tecnico-8a5ef.firebaseapp.com",

databaseURL:
"https://servicio-tecnico-8a5ef-default-rtdb.firebaseio.com",

projectId: "servicio-tecnico-8a5ef",

storageBucket:
"servicio-tecnico-8a5ef.firebasestorage.app",

messagingSenderId:
"895895342548",

appId:
"1:895895342548:web:c400eb7e17ff78f57c1a41"

};

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

const auth =
getAuth(app);

const equiposRef =
ref(db,"equipos");

let contador = 0;

let editandoID = null;

document.getElementById(
"tecnico"
).value =
localStorage.getItem("tecnico");

document.getElementById(
"nombreTecnico"
).innerHTML =
"👨‍🔧 " +
localStorage.getItem("tecnico");

document.getElementById(
"fechaActual"
).innerHTML =
"📅 " +
new Date().toLocaleDateString();

window.guardar = function(){

guardarLista("areas",area.value);
guardarLista("equipos",equipo.value);
guardarLista("marcas",marca.value);

let fotoInput =
document.getElementById("foto");

let archivo =
fotoInput.files[0];

let lector =
new FileReader();

lector.onload = function(e){

let datos = {

numero:
editandoID
?
document.getElementById(
"numeroReporte"
).innerText.replace("#","")
:
contador + 1,

fecha:
new Date()
.toLocaleDateString(),

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
mantenimiento: mantenimiento.value,
estado: estado.value,
observaciones:
observaciones.value,
tecnico:
localStorage.getItem("tecnico"),
foto: e.target.result

};

if(editandoID){

update(
ref(db,"equipos/"+editandoID),
datos
);

editandoID = null;

}else{

push(equiposRef,datos);

}

limpiar();

}

if(archivo){

lector.readAsDataURL(
archivo
);

}else{

lector.onload({
target:{
result:
"https://cdn-icons-png.flaticon.com/512/847/847969.png"
}
});

}

}

onValue(equiposRef,(snapshot)=>{

let datos = snapshot.val();

let listaHTML = "";

contador = 0;

if(!datos){

document.getElementById(
"lista"
).innerHTML = "";

return;

}

for(let id in datos){

contador++;

let e = datos[id];

listaHTML += `

<tr>

<td>#${e.numero}</td>

<td>${e.fecha}</td>

<td>${e.equipo}</td>

<td>${e.area}</td>

<td>

<span class="estado">

${e.estado}

</span>

</td>

<td>${e.tecnico}</td>

<td>

<div class="acciones-tabla">

<button onclick="editar('${id}')">
✏️
</button>

<button onclick="imprimirReporte('${id}')">
🖨️
</button>

${
localStorage.getItem("rol")
=="admin"

?

`<button onclick="eliminar('${id}')">
🗑️ </button>`

:

""

}

</div>

</td>

</tr>

`;

}

document.getElementById(
"lista"
).innerHTML = listaHTML;

document.getElementById(
"totalEquipos"
).innerText = contador;

document.getElementById(
"totalMantenimientos"
).innerText = contador;

document.getElementById(
"numeroReporte"
).innerText =
"#" + (contador + 1);

cargarFiltroAreas(datos);

});

window.editar = function(id){

onValue(
ref(db,"equipos/"+id),
(snapshot)=>{

let e = snapshot.val();

editandoID = id;

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
mantenimiento.value =
e.mantenimiento;
estado.value = e.estado;
observaciones.value =
e.observaciones;

});

}

window.eliminar = function(id){

remove(
ref(db,"equipos/"+id)
);

}

window.nuevoReporte = function(){

limpiar();

editandoID = null;

document.getElementById(
"numeroReporte"
).innerText =
"#" + (contador + 1);

}

function limpiar(){

document.querySelectorAll(
"input, textarea"
)

.forEach(campo=>{

if(campo.type!="file"){

campo.value = "";

}

});

document.getElementById(
"tecnico"
).value =
localStorage.getItem(
"tecnico"
);

}

window.buscarEquipo = function(){

let texto =
document.getElementById(
"buscar"
).value.toLowerCase();

let filas =
document.querySelectorAll(
"tbody tr"
);

filas.forEach(fila=>{

if(
fila.innerText
.toLowerCase()
.includes(texto)
){

fila.style.display="";

}else{

fila.style.display="none";

}

});

}

window.cerrarSesion =
async function(){

await signOut(auth);

localStorage.clear();

window.location.href =
"login.html";

}

window.exportarExcel =
function(){

let tabla =
document.querySelector(
"table"
).outerHTML;

let url =
'data:application/vnd.ms-excel,' +
encodeURIComponent(tabla);

let link =
document.createElement("a");

link.href = url;

link.download =
"ReporteTecnico.xls";

link.click();

}

window.generarPDF =
function(){

window.print();

}

window.imprimirReporte =
function(id){

onValue(
ref(db,"equipos/"+id),
(snapshot)=>{

let e = snapshot.val();

let ventana =
window.open(
"",
"",
"width=900,height=800"
);

ventana.document.write(`

<html>

<head>

<title>
Reporte Técnico
</title>

<style>

body{
font-family:Arial;
padding:20px;
}

table{
width:100%;
border-collapse:collapse;
}

td{
border:1px solid #000;
padding:10px;
}

img{
width:150px;
margin-top:20px;
}

</style>

</head>

<body>

<h2>
🖥️ REPORTE TÉCNICO CNE
</h2>

<table>

<tr><td><b>Área</b></td><td>${e.area}</td></tr>

<tr><td><b>Equipo</b></td><td>${e.equipo}</td></tr>

<tr><td><b>Servicio</b></td><td>${e.servicio}</td></tr>

<tr><td><b>Modelo</b></td><td>${e.modelo}</td></tr>

<tr><td><b>Marca</b></td><td>${e.marca}</td></tr>

<tr><td><b>Serie</b></td><td>${e.serie}</td></tr>

<tr><td><b>Código</b></td><td>${e.codigo}</td></tr>

<tr><td><b>Disco</b></td><td>${e.disco}</td></tr>

<tr><td><b>Memoria</b></td><td>${e.memoria}</td></tr>

<tr><td><b>Monitor</b></td><td>${e.monitor}</td></tr>

<tr><td><b>Teclado</b></td><td>${e.teclado}</td></tr>

<tr><td><b>Mouse</b></td><td>${e.mouse}</td></tr>

<tr><td><b>Impresora</b></td><td>${e.impresora}</td></tr>

<tr><td><b>Teléfono</b></td><td>${e.telefono}</td></tr>

<tr><td><b>Antivirus</b></td><td>${e.antivirus}</td></tr>

<tr><td><b>Mantenimiento</b></td><td>${e.mantenimiento}</td></tr>

<tr><td><b>Estado</b></td><td>${e.estado}</td></tr>

<tr><td><b>Observaciones</b></td><td>${e.observaciones}</td></tr>

<tr><td><b>Técnico</b></td><td>${e.tecnico}</td></tr>

</table>

<center>

<img src="${e.foto}">

</center>

<script>

window.onload = function(){

window.print();

}

</script>

</body>

</html>

`);

});

}

function guardarLista(nombre,valor){

if(valor=="") return;

let lista =
JSON.parse(
localStorage.getItem(nombre)
) || [];

if(!lista.includes(valor)){

lista.push(valor);

localStorage.setItem(
nombre,
JSON.stringify(lista)
);

}

}

function cargarFiltroAreas(datos){

let filtro =
document.getElementById(
"filtroArea"
);

if(!filtro) return;

let areas = [];

for(let id in datos){

if(
!areas.includes(datos[id].area)
){

areas.push(
datos[id].area
);

}

}

filtro.innerHTML =
'<option value="">
📋 Todas las Áreas

</option>';

areas.forEach(area=>{

filtro.innerHTML +=
`<option value="${area}">
${area}

</option>`;

});

}
