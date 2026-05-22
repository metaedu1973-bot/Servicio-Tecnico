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
      <p>
        ${e.area} - ${e.equipo} - ${e.servicio} - ${e.modelo}
      </p>
    `;
  });
}

mostrar();
