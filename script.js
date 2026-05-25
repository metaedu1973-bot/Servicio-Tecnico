import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove,
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
localStorage.getItem("tecnico");

document.getElementById("nombreTecnico").innerHTML =
"👨‍🔧 " + localStorage.getItem("tecnico");

document.getElementById("fechaActual").innerHTML =
"📅 " + new Date().toLocaleDateString();

window.guardar = function(){

let fotoInput =
document.getElementById("foto");

let archivo =
fotoInput.files[0];

function guardarDatos(imagen){

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

foto: imagen

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

let lector =
new FileReader();

lector.onload = function(e){

guardarDatos(
e.target.result
);

};

lector.readAsDataURL(archivo);

}else{

guardarDatos(
"https://cdn-icons-png.flaticon.com/512/847/847969.png"
);

}

}

onValue(equiposRef,(snapshot)=>{

let datos = snapshot.val();

let listaHTML = "";

contador = 0;

if(!datos){

document.getElementById("lista").innerHTML = "";

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
.innerHTML = listaHTML;

document.getElementById("totalEquipos")
.innerText = contador;

document.getElementById("totalMantenimientos")
.innerText = contador;

document.getElementById("numeroReporte")
.innerText = "#" + (contador + 1);

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

campo.value="";

}

});

document.getElementById("tecnico")
.value =
localStorage.getItem("tecnico");

document.getElementById("estado")
.value =
"Pendiente";

}

window.buscarEquipo = function(){

let texto =
document.getElementById("buscar")
.value.toLowerCase();

let filas =
document.querySelectorAll("tbody tr");

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

window.nuevoReporte = function(){

limpiar();

editandoID = null;

}

window.cerrarSesion = async function(){

await signOut(auth);

localStorage.clear();

window.location.href = "login.html";

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
color:#000;
}

h1{
text-align:center;
margin-bottom:5px;
}

h3{
text-align:center;
margin-top:0;
margin-bottom:30px;
font-weight:normal;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

td{
border:1px solid #000;
padding:12px;
font-size:14px;
}

.titulo{
background:#f0f0f0;
font-weight:bold;
width:220px;
}

img{
width:180px;
margin-top:25px;
border:1px solid #ccc;
padding:5px;
}

.firma{
margin-top:70px;
text-align:center;
}

</style>

</head>

<body>

<h1>
🖥️ CNE
</h1>

<h3>
REGISTRO TÉCNICO DE EQUIPOS
</h3>

<table>

<tr>
<td class="titulo">N° Reporte</td>
<td>#${e.numero}</td>
</tr>

<tr>
<td class="titulo">Fecha</td>
<td>${e.fecha}</td>
</tr>

<tr>
<td class="titulo">Área</td>
<td>${e.area}</td>
</tr>

<tr>
<td class="titulo">Equipo</td>
<td>${e.equipo}</td>
</tr>

<tr>
<td class="titulo">Servicio</td>
<td>${e.servicio}</td>
</tr>

<tr>
<td class="titulo">Modelo</td>
<td>${e.modelo}</td>
</tr>

<tr>
<td class="titulo">Marca</td>
<td>${e.marca}</td>
</tr>

<tr>
<td class="titulo">Serie</td>
<td>${e.serie}</td>
</tr>

<tr>
<td class="titulo">Código</td>
<td>${e.codigo}</td>
</tr>

<tr>
<td class="titulo">Disco Duro</td>
<td>${e.disco}</td>
</tr>

<tr>
<td class="titulo">Memoria RAM</td>
<td>${e.memoria}</td>
</tr>

<tr>
<td class="titulo">Monitor</td>
<td>${e.monitor}</td>
</tr>

<tr>
<td class="titulo">Teclado</td>
<td>${e.teclado}</td>
</tr>

<tr>
<td class="titulo">Mouse</td>
<td>${e.mouse}</td>
</tr>

<tr>
<td class="titulo">Impresora</td>
<td>${e.impresora}</td>
</tr>

<tr>
<td class="titulo">Teléfono</td>
<td>${e.telefono}</td>
</tr>

<tr>
<td class="titulo">Antivirus</td>
<td>${e.antivirus}</td>
</tr>

<tr>
<td class="titulo">Mantenimiento</td>
<td>${e.mantenimiento}</td>
</tr>

<tr>
<td class="titulo">Estado</td>
<td>${e.estado}</td>
</tr>

<tr>
<td class="titulo">Observaciones</td>
<td>${e.observaciones}</td>
</tr>

<tr>
<td class="titulo">Técnico Responsable</td>
<td>${e.tecnico}</td>
</tr>

</table>

<center>

<img src="${e.foto}">

</center>

<div class="firma">

<p>

---

</p>

<p>
Firma Técnico Responsable
</p>

</div>

<script>

setTimeout(() => {

ventana.print();

}, 800);


</script>

</body>

</html>

`);

});

}
