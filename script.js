import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue
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

const tecnicoActivo =
localStorage.getItem("usuarioActivo");

document.getElementById("nombreTecnico").innerHTML =
"👨‍🔧 " + tecnicoActivo;

document.getElementById("tecnico").value =
tecnicoActivo;

document.getElementById("fechaActual").innerHTML =
"📅 " + new Date().toLocaleDateString();

window.guardar = function(){

let datos = {

numero: contador + 1,

fecha:
new Date().toLocaleDateString(),

area: area.value,
equipo: equipo.value,
modelo: modelo.value,
marca: marca.value,
serie: serie.value,
estado: estado.value,
observaciones:
observaciones.value,

tecnico: tecnicoActivo

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

</tr>

`;

}

document.getElementById("lista")
.innerHTML = html;

document.getElementById("numeroReporte")
.innerText =
"#" + (contador + 1);

});

function limpiar(){

document.querySelectorAll(
"input, textarea"
)

.forEach(campo=>{

if(
campo.id!="tecnico"
){

campo.value = "";

}

});

document.getElementById("tecnico").value =
tecnicoActivo;

}

window.nuevoReporte = function(){

limpiar();

}

window.cerrarSesion = async function(){

await signOut(auth);

window.location.href =
"login.html";

}
