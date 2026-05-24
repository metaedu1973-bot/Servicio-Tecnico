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

databaseURL: "https://servicio-tecnico-8a5ef-default-rtdb.firebaseio.com",

projectId: "servicio-tecnico-8a5ef",

storageBucket: "servicio-tecnico-8a5ef.firebasestorage.app",

messagingSenderId: "895895342548",

appId: "1:895895342548:web:c400eb7e17ff78f57c1a41"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

const equiposRef = ref(db,"equipos");

let contador = 0;

let editandoID = null;

document.getElementById("tecnico").value =
localStorage.getItem("tecnico");

document.getElementById("nombreTecnico").innerHTML =
"👨‍🔧 " +
localStorage.getItem("tecnico");

document.getElementById("fechaActual").innerHTML =
"📅 " +
new Date().toLocaleDateString();

window.guardar = function(){

guardarLista("areas",area.value);
guardarLista("equipos",equipo.value);
guardarLista("marcas",marca.value);

let fotoInput =
document.getElementById("foto");

let archivo = fotoInput.files[0];

let lector = new FileReader();

lector.onload = function(e){

let datos = {

numero:
editandoID
?
document.getElementById("numeroReporte")
.innerText.replace("#","")
:
contador + 1,

fecha:
new Date().toLocaleDateString(),

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

cargarListas();

}

if(archivo){

lector.readAsDataURL(archivo);

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

<span class="estado
${e.estado=="Pendiente"
?
"pendiente"
:
e.estado=="Reparación"
?
"reparacion"
:
"entregado"}">

${e.estado}

</span>

</td>

<td>${e.tecnico}</td>

<td>

<div class="acciones-tabla">

<button onclick="editar('${id}')">
✏️
</button>

<button onclick="eliminar('${id}')">
🗑️
</button>

</div>

</td>

</tr>

`;

}

document.getElementById("lista")
.innerHTML = listaHTML;
  cargarFiltroAreas(datos);

document.getElementById("totalEquipos")
.innerText = contador;

document.getElementById("totalMantenimientos")
.innerText = contador;

document.getElementById("numeroReporte")
.innerText =
"#" + (contador + 1);

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
estado.value =
e.estado;
observaciones.value =
e.observaciones;

});

}

window.eliminar = function(id){

remove(ref(db,"equipos/"+id));

}

function limpiar(){
  window.nuevoReporte = function(){

limpiar();

editandoID = null;

document.getElementById(
"numeroReporte"
).innerText =
"#" + (contador + 1);

}

document.querySelectorAll(
"input, textarea"
)

.forEach(campo=>{

if(campo.type!="file"){

campo.value="";

}

});

document.getElementById("tecnico")
.value =
localStorage.getItem("tecnico");

document.getElementById("foto")
.value="";

}

window.buscarEquipo = function(){

let texto =
document.getElementById("buscar")
.value.toLowerCase();

let filas =
document.querySelectorAll("tbody tr");

filas.forEach(fila=>{

if(fila.innerText
.toLowerCase()
.includes(texto)){

fila.style.display="";

}else{

fila.style.display="none";

}

});

}

window.cerrarSesion = async function(){

await signOut(auth);

localStorage.clear();

window.location.href =
"login.html";

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

function cargarListas(){

let areas =
JSON.parse(
localStorage.getItem("areas")
) || [];

let equipos =
JSON.parse(
localStorage.getItem("equipos")
) || [];

let marcas =
JSON.parse(
localStorage.getItem("marcas")
) || [];

document.getElementById(
"listaAreas"
).innerHTML =

areas.map(a=>
`<option value="${a}">`
).join("");

document.getElementById(
"listaEquipos"
).innerHTML =

equipos.map(a=>
`<option value="${a}">`
).join("");

document.getElementById(
"listaMarcas"
).innerHTML =

marcas.map(a=>
`<option value="${a}">`
).join("");

}function cargarFiltroAreas(datos){

let filtro =
document.getElementById(
"filtroArea"
);

let areas = [];

for(let id in datos){

if(!areas.includes(datos[id].area)){

areas.push(datos[id].area);

}

}

filtro.innerHTML =
'<option value="">📋 Todas las Áreas</option>';

areas.forEach(area=>{

filtro.innerHTML +=
`<option value="${area}">
${area}

</option>`;

});

}

window.imprimirArea = function(){

let areaSeleccionada =
document.getElementById(
"filtroArea"
).value;

let filas =
document.querySelectorAll(
"#lista tr"
);

let contenido = `

<h2>
Reporte Área:
${areaSeleccionada || "Todas"}
</h2>

<table border="1"
style="width:100%;
border-collapse:collapse;">

<tr>

<th>#</th>
<th>Fecha</th>
<th>Equipo</th>
<th>Área</th>
<th>Estado</th>
<th>Técnico</th>

</tr>
`;

filas.forEach(fila=>{

if(

areaSeleccionada=="" ||

fila.children[3]
.innerText
== areaSeleccionada

){

contenido += `

<tr>

<td>${fila.children[0].innerHTML}</td>
<td>${fila.children[1].innerHTML}</td>
<td>${fila.children[2].innerHTML}</td>
<td>${fila.children[3].innerHTML}</td>
<td>${fila.children[4].innerHTML}</td>
<td>${fila.children[5].innerHTML}</td>

</tr>
`;

}

});

contenido += "</table>";

let ventana =
window.open("","","width=900,height=700");

ventana.document.write(contenido);

ventana.print();
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

areas.push(datos[id].area);

}

}

filtro.innerHTML =
'<option value="">📋 Todas las Áreas</option>';

areas.forEach(area=>{

filtro.innerHTML +=
`<option value="${area}">
${area}

</option>`;

});

}

window.imprimirArea = function(){

let areaSeleccionada =
document.getElementById(
"filtroArea"
).value;

let filas =
document.querySelectorAll(
"#lista tr"
);

let contenido = `

<h2>
Reporte Área:
${areaSeleccionada || "Todas"}
</h2>

<table border="1"
style="
width:100%;
border-collapse:collapse;
">

<tr>

<th>#</th>
<th>Fecha</th>
<th>Equipo</th>
<th>Área</th>
<th>Estado</th>
<th>Técnico</th>

</tr>

`;

filas.forEach(fila=>{

if(

areaSeleccionada=="" ||

fila.children[3]
.innerText
== areaSeleccionada

){

contenido += `

<tr>

<td>${fila.children[0].innerHTML}</td>
<td>${fila.children[1].innerHTML}</td>
<td>${fila.children[2].innerHTML}</td>
<td>${fila.children[3].innerHTML}</td>
<td>${fila.children[4].innerHTML}</td>
<td>${fila.children[5].innerHTML}</td>

</tr>

`;

}

});

contenido += "</table>";

let ventana =
window.open(
"",
"",
"width=900,height=700"
);

ventana.document.write(contenido);

ventana.print();

}

window.exportarExcel = function(){

let tabla =
document.querySelector("table")
.outerHTML;

let url =
'data:application/vnd.ms-excel,' +
encodeURIComponent(tabla);

let link =
document.createElement('a');

link.href = url;

link.download =
"ReporteTecnico.xls";

link.click();

}

window.generarPDF = function(){

let contenido = document.querySelector(
".contenedor"
).innerHTML;

let ventana =
window.open(
"",
"",
"width=1000,height=800"
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
margin-top:20px;
}

table,th,td{
border:1px solid #000;
}

th,td{
padding:10px;
text-align:left;
}

h2{
text-align:center;
}

</style>

</head>

<body>

<h2>
🖥️ REPORTE TÉCNICO CNE
</h2>

${contenido}

</body>

</html>

`);

ventana.document.close();

ventana.print();

}



}


cargarListas();
