let lista = JSON.parse(localStorage.getItem("datos")) || [];

mostrar();
actualizarDashboard();

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

lista.push(datos);

localStorage.setItem("datos",
JSON.stringify(lista));

mostrar();

actualizarDashboard();

limpiar();

}

if(archivo){

lector.readAsDataURL(archivo);

}else{

alert("Seleccione una foto");

}

}

function mostrar(){

let listaHTML = "";

lista.forEach((e,i)=>{

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
<p><b>Disco:</b> ${e.disco}</p>
<p><b>Memoria:</b> ${e.memoria}</p>
<p><b>Técnico:</b> ${e.tecnico}</p>
<p><b>Fecha:</b> ${e.fecha}</p>

<button onclick="editar(${i})">
✏️ Editar
</button>

${localStorage.getItem("rol")=="admin" ?

`<button onclick="eliminar(${i})">
🗑️ Eliminar
</button>`

:

""}

</div>

`;

});

document.getElementById("lista").innerHTML =
listaHTML;

}

function eliminar(i){

lista.splice(i,1);

localStorage.setItem("datos",
JSON.stringify(lista));

mostrar();

actualizarDashboard();

}

function editar(i){

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

}

function actualizarDashboard(){

document.getElementById("totalEquipos")
.innerText = lista.length;

document.getElementById("totalMantenimientos")
.innerText = lista.length;

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

function exportarExcel(){

let tabla = `
<table border="1">

<tr>

<th>Equipo</th>
<th>Área</th>
<th>Servicio</th>
<th>Marca</th>
<th>Modelo</th>

</tr>
`;

lista.forEach(e=>{

tabla += `

<tr>

<td>${e.equipo}</td>
<td>${e.area}</td>
<td>${e.servicio}</td>
<td>${e.marca}</td>
<td>${e.modelo}</td>

</tr>

`;

});

tabla += "</table>";

let blob = new Blob([tabla],
{type:"application/vnd.ms-excel"});

let link =
document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "reporte.xls";

link.click();

}

function generarPDF(){

window.print();

}

function cerrarSesion(){

localStorage.removeItem("rol");

window.location="login.html";

}
