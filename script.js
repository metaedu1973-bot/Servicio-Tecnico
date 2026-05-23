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

appId: "1:895895342548:web:c400eb7e17ff78f57c1a41",

measurementId: "G-HTXDTJ735G"

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

};

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

};

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

<td>

<img src="${e.foto}"
class="foto-tabla">

<br><br>

<b>${e.equipo}</b>

</td>

<td>${e.area}</td>

<td>

<span class="estado
${e.estado == 'Pendiente'
? 'pendiente'
: e.estado == 'Reparación'
? 'reparacion'
: 'entregado'}">

${e.estado == 'Pendiente'
? '🟡 Pendiente'
: e.estado == 'Reparación'
? '🔵 Reparación'
: '🟢 Entregado'}

</span>

</td>

<td>${e.tecnico}</td>

<td>

<div class="acciones-tabla">

<button onclick="editar('${id}')">
✏️
</button>

<button onclick="generarPDF()">
📄
</button>

${localStorage.getItem("rol")
=="admin"

?

`<button onclick="eliminar('${id}')">
🗑️
</button>`

:

""}

</div>

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
estado.value = e.estado;
observaciones.value =
e.observaciones;

document.getElementById("numeroReporte")
.innerText =
"#" + e.numero;

});

};

window.eliminar = function(id){

remove(ref(db,"equipos/"+id));

};

function limpiar(){

document.querySelectorAll(
"input, textarea"
)

.forEach(campo=>{

if(campo.type!="file"){

campo.value="";

}

});

document.getElementById("tecnico").value =
localStorage.getItem("tecnico");

document.getElementById("foto").value="";

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

};

window.cerrarSesion = async function(){

try{

await signOut(auth);

localStorage.clear();

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

};

window.exportarExcel = function(){

window.print();

};

window.generarPDF = function(){

window.print();

};
