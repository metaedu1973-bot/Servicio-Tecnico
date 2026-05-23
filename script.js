import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyDILlEvHJ05IUg146N17zVwGG5RD7X50Y4",

authDomain: "servicio-tecnico-8a5ef.firebaseapp.com",

databaseURL: "https://servicio-tecnico-8a5ef-default-rtdb.firebaseio.com",

projectId: "servicio-tecnico-8a5ef",

storageBucket: "servicio-tecnico-8a5ef.firebasestorage.app",

messagingSenderId: "895895342548",

appId: "1:895895342548:web:c400eb7e17ff78f57c1a41",

measurementId: "G-HTXDTJ735G"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const equiposRef = ref(db,"equipos");

function guardar(){

let fotoInput =
document.getElementById("foto");

let archivo = fotoInput.files[0];

let lector = new FileReader();

lector.onload = function(e){

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
mantenimiento: mantenimiento.value,
tecnico: tecnico.value,
fecha: fecha.value,
foto: e.target.result

};

push(equiposRef,datos);

limpiar();

}

if(archivo){

lector.readAsDataURL(archivo);

}else{

alert("Seleccione una foto");

}

}

window.guardar = guardar;

onValue(equiposRef,(snapshot)=>{

let datos = snapshot.val();

let listaHTML = "";

let total = 0;

for(let id in datos){

total++;

let e = datos[id];

listaHTML += `

<div class="card">

<img src="${e.foto}">

<h3>${e.equipo}</h3>

<p><b>Área:</b> ${e.area}</p>
<p><b>Servicio:</b> ${e.servicio}</p>
<p><b>Marca:</b> ${e.marca}</p>
<p><b>Modelo:</b> ${e.modelo}</p>
<p><b>Serie:</b> ${e.serie}</p>
<p><b>Código:</b> ${e.codigo}</p>
<p><b>Técnico:</b> ${e.tecnico}</p>
<p><b>Fecha:</b> ${e.fecha}</p>

${localStorage.getItem("rol")=="admin" ?

`<button onclick="eliminar('${id}')">
🗑️ Eliminar
</button>`

:

""}

</div>

`;

}

document.getElementById("lista")
.innerHTML = listaHTML;

document.getElementById("totalEquipos")
.innerText = total;

document.getElementById("totalMantenimientos")
.innerText = total;

});

function eliminar(id){

remove(ref(db,"equipos/"+id));

}

window.eliminar = eliminar;

function limpiar(){

document.querySelectorAll("input")
.forEach(input=>{

if(input.type!="file"){

input.value="";

}

});

document.getElementById("foto").value="";

}

function buscarEquipo(){

let texto =
document.getElementById("buscar")
.value.toLowerCase();

let cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

if(card.innerText.toLowerCase()
.includes(texto)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

window.buscarEquipo = buscarEquipo;

function cerrarSesion(){

localStorage.removeItem("rol");

window.location="login.html";

}

window.cerrarSesion = cerrarSesion;

function exportarExcel(){

alert("Excel próximamente 😄");

}

window.exportarExcel = exportarExcel;

function generarPDF(){

window.print();

}

window.generarPDF = generarPDF;
