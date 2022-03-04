 //1.)capturar el formulario (etiqueta form)
 let formulario = document.querySelector('form')

 //.2) crear el arreglo vacío, para almacenar los objetos que creemos
 //por medio de la captura de datos en el formulario
 let citas = [];
 
 //3) escuchador o controlador del evento submit o evento de envío
 //del formulario




 formulario.addEventListener('submit', e => {
     e.preventDefault(); //prevenimos el evento por defecto del submit
     capturaDatos(); //llamado de la función capturaDatos
     
 })
//Función Onclick de reset formulario
 const borrar=()=>{
    formulario.reset()

}
 
 //4) crear una función para capturar datos
 //construcción del objeto
 //validación de existencia de key en el local storage
 const capturaDatos = () => {
     
    
     //captura de datos y almacenamiento en variables
     let nombre = document.getElementById('nombre').value;
     let fecha =  document.getElementById('fecha').value;
     let hora = document.getElementById('hora').value;
     let sintomas =  document.getElementById('sintomas').value;
 
     //creación del objeto
     let registro = {
         id: Math.round(Math.random() * (100 - 1) + 1), // id aleatorio entre 1 y 100
         nombre,
         fecha,
         hora,
         sintomas
     }
     //Restricciones de datos
     if( (nombre.length >= 3 && nombre.length <= 30)  && (fecha.length === 10)  && (hora.length === 5) && (sintomas.length >= 5 && sintomas.length <= 45)){
     
     
     //validación existencia de la key citas en el localstorage
     //para no sobreescribir la data
     //traemos la información del local storage con key llamada citas
     const key = JSON.parse(localStorage.getItem('Citas'))
     if(key !== null){ // si el local storage no es nulo
        key.unshift(registro) //inserte el objeto registro en el array con lo antiguo(key)
        localStorage.setItem('Citas',JSON.stringify(key)) //almacene en el local storage el array (lo viejo con lo nuevo)
     }else{ // si el key está nulo
         citas.unshift(registro); //añada al arreglo citas el objeto llamado registro
         localStorage.setItem('Citas', JSON.stringify(citas))//almacene en local storage el arreglo citas en la key Citas
     }
 
    }
    else{
        alert("Algunos campos están incompletos")
    }

     getLocalStorage(); //llamado de la función getLocalStorage

     
 }
 
 // 5.) capturar tbody para listar la data del localostorage
 let listarCita = document.getElementById('listarCita');
 
 //6.)crear una función para traer data del local storage
 // y mostrarla en el tbody listarCita
 const getLocalStorage = () => {
     //llevams un valor vacío a listarCita
     listarCita.innerHTML = '';
     //traemos la data del local storage key Citas
     let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
     //recorremos la lista citasLocalStorage con map que realiza las iteraciones de la lista y nos devuelve un elemento nuevo
     citasLocalStorage?.map(cita => { //cita hace referencia al objeto en el que se está posicionado en el momento del recorrido
         const {id,nombre,fecha,hora,sintomas} = cita; //desestructuramos la información del objeto cita
          //establecemos una estructura html para realizarle cambio de contenido a listarCita con innerHTML
          // ` los templates string, back ticks o plantillas literales (comillitas al revés)
          //nos permiten imprimir inormación de una manera más flexible
          //y nos permite personaliar cualquier cosa que yo requiere envolver
          //leer sobre tagged templates para más info
         listarCita.innerHTML += `
                     <td>${nombre}</td>
                     <td>${fecha}</td>
                     <td>${hora}</td>
                     <td>${sintomas}</td>
                     <td><button id=${id} class="btn btn-danger">Eliminar</button></td>
         `
     })
 }
 
 //7.) cargar luego del DOM
 document.addEventListener('DOMContentLoaded',getLocalStorage)
 
 //8.) para el eliminar. Llamamos el evento clic de tody listarCita
 
 listarCita.addEventListener('click', e => {
     //classList.contains nos retorna un booleano(true o false) en base al valor que tiene contains dentro
     const btnEliminar = e.target.classList.contains('btn-danger');
     //capturams el id asignado a los botones en getLocalStorage
     const id = e.target.id
     //taremos la data del local storage
     const local = JSON.parse(localStorage.getItem('Citas'))
     //la función find se puede usar en los arreglos o listas y nos retorna un objeto en base a los buscado
     //== doble igual comparación NO estricta, solo valida contenido
     //=== triple igual, comparación estricta, valida contenido y tipo de dato
     const buscado = local.find(data => data.id === Number(id))
      //si tbnEliminar es true, es decir, si el elemento html que seleccionamos tiene una clase llamada btn-danger(para efectos de este ejercicio)
     if(btnEliminar){
         //recorremos la data traida del local storage y la recorremos con forEach, este permite recorrer arreglos y listas
         //cuando usamos forEach o map, aparte de tener acceso al objeto, podemos acceder al número de la posición o también conocido como index
         local.forEach((element,index) => {
              //validamos si es objeto.id es igual al id capturado cuando hacemos clic sobre el botón eliminar
             if(element.id === buscado.id){
                 //eliminar el index indicado del arreglo llamado local (data traida desde el local storage)
                 //splice nos permite eliminar una posición del arreglo
                 //splice(índex o índice del objeto en el array,cantidad de elementos a eliminar, normalmente indicamos 1)
                 local.splice(index,1)
                 //cuando eliminamos, necesitamos sobre escribir el array local en el local storage en la key llamada Citas
                 localStorage.setItem('Citas', JSON.stringify(local))
                 //llamamos a getLocalStorage para que nos cargue la dat actualizada y no
                 //tengamos que recargar la página en el navegador
                 getLocalStorage();
             }
         });
     }
 
 })
 
 //9.)Buscador
 //capturamos el botón buscar
 let buscar = document.getElementById('btnBuscar');
 // capturamos el div en donde vamos a mostrar la data que busquemos
 let busqueda = document.getElementById('busqueda');
 
 //10.) llamaos el evento clic del botón buscar
 buscar.addEventListener('click', e => {
     e.preventDefault();
     //capturamos el texto ingresado en la caja de texto para buscar
     let input = document.getElementById('inputBuscar').value; //lo que voy a buscar
     //traemos la data del local storage
     //dentro de la búsqueda de información,e s importante tener presente dos cosas
     //1.) lo que voy a buscar
     //2.) en donde lo voy a buscar
     let data = JSON.parse(localStorage.getItem('Citas')); // en donde lo voy a buscar
     //función filter, nos devuelve un arreglo con lo encontrado, al retornar un arrar, puede devolver varios objetos que coindidan
     //la función includes, nos permite buscar las coincidencias y no el valo exacto
     //la función toLowerCase, es como la función toLocaleLoweCase, nos permite convertir el texto todo en minúsculas
     //también está la función toUpperCase, toLocaleUpperCase, que cambia a mayúsculas
     let filtro = data.filter(cita => cita.nombre.toLowerCase().includes(input.toLowerCase()))
     //limpiamos el div
     busqueda.innerHTML = '';
 
     //tomamos el arreglo filtro que contiene la información que coincida con la búsqueda que realizaste
     //vamos a validar con un condicional ternario (estos nos permiten validar en términos de expresiones)
     //validamos que si es arreglo no tiene nada filtro.length(longitud del array)
     filtro.length === 0 ?
     //nos muestre un diz indicando que lo ingresado no existe
         busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
         :
         //en caso contrario, nos va a recorrer filtro, desestructuramos y mostramos lo filtrado
         (
             filtro.map(cita => {
                 const { nombre, fecha, hora, sintomas } = cita;
                 busqueda.innerHTML += `
                                     <div style="color:white;">${nombre}</div>
                                     <div style="color:white;">${fecha}</div>
                                     <div style="color:white;">${hora}</div>
                                     <div style="color:white;">${sintomas}
                                              
                 `
             })
         )
 })