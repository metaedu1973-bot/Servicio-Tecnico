import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
update
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getAuth,
signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

const equiposRef = ref(db,"equipos");

let contador = 0;

let editandoID = null;

document.getElementById("tecnico").value =
localStorage.getItem("tecnico") || "";

document.getElementById("nombreTecnico").innerHTML =
"👨‍🔧 " +
localStorage.getItem("usuarioActivo");

document.getElementById("fechaActual").innerHTML =
"📅 " + new Date().toLocaleDateString();

window.guardar = function(){

let datos = {

numero: contador + 1,

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
localStorage.getItem("tecnico")

};

push(equiposRef,datos);

limpiar();

}

onValue(equiposRef,(snapshot)=>{

let datos = snapshot.val();

let html = "";

contador = 0;

for(let id in datos){

contador++;

let e = datos[id];

html += `

<tr>

<td>#${e.numero}</td>

<td>${e.fecha}</td>

<td>${e.equipo}</td>

<td>${e.area}</td>

<td>${e.estado}</td>

<td>${e.tecnico}</td>

<td>

<button onclick="editar('${id}')">
✏️
</button>

<button onclick="imprimirReporte('${id}')">
🖨️
</button>

</td>

</tr>

`;

}

document.getElementById("lista")
.innerHTML = html;

document.getElementById("totalEquipos")
.innerText = contador;

document.getElementById("totalMantenimientos")
.innerText = contador;

document.getElementById("numeroReporte")
.innerText =
"#" + (contador + 1);
let filtro =
document.getElementById(
"filtroArea"
);

if(filtro){

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
mantenimiento.value = e.mantenimiento;
estado.value = e.estado;
observaciones.value = e.observaciones;

});

}

function limpiar(){

document.querySelectorAll(
"input, textarea"
)

.forEach(campo=>{

if(
campo.type!="file"
&&
campo.id!="tecnico"
){

campo.value = "";

}

});

document.getElementById(
"tecnico"
).value =
localStorage.getItem(
"tecnico"
) || "";

document.getElementById(
"nombreTecnico"
).innerHTML =
"👨‍🔧 " +
(
localStorage.getItem(
"tecnico"
) || "Técnico"
);

document.getElementById(
"estado"
).value =
"Pendiente";

}


});


window.nuevoReporte = function(){

limpiar();

}

window.cerrarSesion = async function(){

await signOut(auth);

localStorage.removeItem("rol");

window.location.href =
"login.html";

}

window.imprimirReporte = function(id){

onValue(
ref(db,"equipos/"+id),
(snapshot)=>{

let e = snapshot.val();

let ventana =
window.open(
"",
"",
"width=900,height=900"
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
padding:30px;
}

table{
width:100%;
border-collapse:collapse;
}

td{
border:1px solid #000;
padding:10px;
}

</style>

</head>

<body>

<h2>
🖥️ REGISTRO TÉCNICO
</h2>

<table>

<tr><td>Área</td><td>${e.area}</td></tr>
<tr><td>Equipo</td><td>${e.equipo}</td></tr>
<tr><td>Servicio</td><td>${e.servicio}</td></tr>
<tr><td>Modelo</td><td>${e.modelo}</td></tr>
<tr><td>Marca</td><td>${e.marca}</td></tr>
<tr><td>Serie</td><td>${e.serie}</td></tr>
<tr><td>Código</td><td>${e.codigo}</td></tr>
<tr><td>Disco</td><td>${e.disco}</td></tr>
<tr><td>Memoria</td><td>${e.memoria}</td></tr>
<tr><td>Monitor</td><td>${e.monitor}</td></tr>
<tr><td>Teclado</td><td>${e.teclado}</td></tr>
<tr><td>Mouse</td><td>${e.mouse}</td></tr>
<tr><td>Impresora</td><td>${e.impresora}</td></tr>
<tr><td>Teléfono</td><td>${e.telefono}</td></tr>
<tr><td>Antivirus</td><td>${e.antivirus}</td></tr>
<tr><td>Mantenimiento</td><td>${e.mantenimiento}</td></tr>
<tr><td>Estado</td><td>${e.estado}</td></tr>
<tr><td>Observaciones</td><td>${e.observaciones}</td></tr>
<tr><td>Técnico</td><td>${e.tecnico}</td></tr>

</table>

</body>

</html>

`);

setTimeout(()=>{

ventana.print();

},800);

});

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

<h2 style="text-align:center;">
🖥️ REGISTROS TÉCNICOS
</h2>

<table border="1"
style="
width:100%;
border-collapse:collapse;
font-family:Arial;
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

let areaFila =
fila.children[3].innerText;

if(
areaSeleccionada=="" ||
areaFila==areaSeleccionada
){

contenido += `

<tr>
${fila.innerHTML}
</tr>
`;

}

});

contenido += "</table>";

let ventana =
window.open(
"",
"",
"width=1000,height=800"
);

ventana.document.write(contenido);

setTimeout(()=>{

ventana.print();

},800);

}

