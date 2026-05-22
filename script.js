function guardar() {
  let datos = {
    area: area.value,
    equipo: equipo.value,
    servicio: servicio.value,
    modelo: modelo.value,
    marca: marca.value,
    serie: serie.value,
    codigo: codigo.value
    disco: disco.value,
memoria: memoria.value,
monitor: monitor.value,
teclado: teclado.value,
mouse: mouse.value,
impresora: impresora.value,
telefono: telefono.value,
antivirus: antivirus.value,
mantenimiento: mantenimiento.value
  };

  let lista = JSON.parse(localStorage.getItem("datos")) || [];
  lista.push(datos);

  localStorage.setItem("datos", JSON.stringify(lista));

  mostrar();
}

function mostrar() {
  let lista = JSON.parse(localStorage.getItem("datos")) || [];
  let cont = document.getElementById("lista");

  cont.innerHTML = "";

  lista.forEach(e => {
    cont.innerHTML += `
<div style="background:white;
padding:15px;
margin:10px;
border-radius:10px;
box-shadow:0px 0px 5px gray;">

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

cont.innerHTML += `
<div style="background:white;
padding:15px;
margin:10px;
border-radius:10px;
box-shadow:0px 0px 5px gray;">

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
<b>Mantenimiento:</b> ${e.mantenimiento}<br><br>

<button onclick="eliminar(${i})">
Eliminar
</button>

</div>
`;
function eliminar(i){

let lista = JSON.parse(localStorage.getItem("datos")) || [];

lista.splice(i,1);

localStorage.setItem("datos", JSON.stringify(lista));

mostrar();

}
    `;
  });
}

mostrar();
