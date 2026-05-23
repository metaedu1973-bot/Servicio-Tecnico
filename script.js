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

let contador = 0;

let editandoID = null;

window.guardar = function(){

let fotoInput =
document.getElementById("foto");

let archivo = fotoInput.files[0];

let lector = new FileReader();

lector.onload = function(e){

let datos = {

numero:
editandoID ?
document.getElementById("numeroReporte")
.innerText.replace("#","")
:
contador + 1,

fecha: new Date().toLocaleDateString(),

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
  observaciones:
observaciones.value,
tecnico: tecnico.value,
foto: e.target.result

};

if(editandoID){

update(ref(db,"equipos/"+editandoID),datos);

editandoID = null;

}else{

push(equiposRef,datos);

}

limpiar();

}

if(archivo){

lector.readAsDataURL(archivo);

}else{

alert("Seleccione una foto");

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

<div class="card">

<img src="${e.foto}">

<div class="card-contenido">

<div class="card-header">

<div>

<h3>📄 REPORTE TÉCNICO</h3>

<div class="fecha">
📅 ${e.fecha}
</div>

</div>

<div class="numero">
#${e.numero}
</div>

</div>

<h2>${e.equipo}</h2>

<p><b>👨‍🔧 Técnico:</b>
${e.tecnico}</p>

<p><b>🏢 Área:</b>
${e.area}</p>

<p><b>🛠️ Servicio:</b>
${e.servicio}</p>

<p><b>💻 Marca:</b>
${e.marca}</p>

<p><b>🖥️ Modelo:</b>
${e.modelo}</p>
<p><b>📝 Observaciones:</b><br>
${e.observaciones}</p>

<div class="estado pendiente">
🟡 Pendiente
</div>

<div class="botones-card">

<button onclick="editar('${id}')">
✏️ Editar
</button>

<button onclick="generarPDF()">
📄 PDF
</button>

${localStorage.getItem("rol")=="admin" ?

`<button onclick="eliminar('${id}')">
🗑️ Eliminar
</button>`

:

""}

</div>

</div>

</div>

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

document.getElementById("fechaActual")
.innerText =
new Date().toLocaleDateString();

});

window.editar = function(id){

onValue(ref(db,"equipos/"+id),
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
  observaciones.value =
e.observaciones;
tecnico.value = e.tecnico;

document.getElementById("numeroReporte")
.innerText = "#" + e.numero;

});

}

window.eliminar = function(id){

remove(ref(db,"equipos/"+id));

}

function limpiar(){

document.querySelectorAll("input")
.forEach(input=>{

if(input.type!="file"){

input.value="";

}

});

document.getElementById("foto").value="";

}

window.buscarEquipo = function(){

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

window.cerrarSesion = function(){

localStorage.removeItem("rol");

window.location="login.html";

}

window.exportarExcel = function(){

window.print();

}

window.generarPDF = function(){

window.print();

}
