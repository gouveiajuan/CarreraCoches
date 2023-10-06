// Creo las constantes que usaremos durante toda la aplicacion
const contenedor = document.querySelector(".container");
const iniciar = document.createElement("button");
const reiniciar = document.createElement("button");
const enviar = document.createElement("button");
const numCoches = document.createElement("button");
const menu = document.createElement("div");

// Arays donde guardamos los participantes, posiciones, y el resultado final
var participantesArray = [];
var positionsArray = [];
var finalResults = [];

// Creamos el menu principal 
const mainMenu = () => {

  // elegimos el titulo, colocamos la etiqueta html h1 para que se muestre en grande, colocamos un ID para indentificarlo
  menu.classList.add("menu");
  menu.innerHTML = "<h1 id='titulo'>La Gran Carrera</h1>";

  // Añadimos etiquetas HTML para crear el menu desplegable donde elegiremos el numero de participantes
  const participantes = document.createElement("div");
  participantes.innerHTML = `
                <h2>Selecciona el número de participantes:</h2>
                    <select class="selectores" id="jugadores" name="jugadores">
                        <!-- Opciones de la lista -->
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                            `;

  // Boton para iniciar la carrera
  enviar.innerText = "Iniciar";
  enviar.classList.add("send");

  // Creamos el evento para el boton de Iniciar
  enviar.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selectores").value;

    //tras haber elegido se escondera el menu principal
    menu.style.display = "none"; 

    //llamamos entonces a la funcion para empezar la carrera con el valor de prueba que habremos elegido con el selector
    return empezar(prueba); 
  });

  //Añadimos elementos al contenedor
  menu.appendChild(participantes);
  menu.appendChild(enviar);
  contenedor.appendChild(menu);
};

const empezar = (corredor) => {
  
  //a traves de una constante creamos un nuevo elemento para añadir los participantes
  const menuCarrera = document.createElement("div");

  //usamos un for para crear el numero de corredores que se hayan seleccionado
  for (var x = 0; x < corredor; x++) {
    var dorsal = document.createElement("div");
    dorsal.innerHTML = `<p>${x + 1}</p>`;
    dorsal.classList.add("dorsal");

    // aqui crearemos lo que sera la carretera
    var position = document.createElement("div");
    position.classList.add("pista");

    // crearemos los coches y seleccionaremos la imagen segun el numero de participantes que se hayan elegido
    var car = document.createElement("img");
    car.classList.add("vehiculos");
    car.classList.add(`jquery-race${x}`);
    car.src = `./img/car${x + 1}.png`;
    car.nombre = x + 1; 
    participantesArray.push(car);

    //Añadimos el coche dentro de la carretera
    position.appendChild(car);
    contenedor.appendChild(dorsal);
    contenedor.appendChild(position);
  }

  //le otorgaremos la funcionalidad a los botones de iniciar, menu y reiniciar
  // boton Iniciar
  iniciar.classList.add("send");
  iniciar.innerText = "Iniciar";
  iniciar.id = "race-btn";
  iniciar.style.display = "initial";

  //boton reiniciar
  reiniciar.classList.add("send");
  reiniciar.id = "reiniciarCarrera";
  reiniciar.innerText = "Reiniciar";
  reiniciar.style.display = "none";


  // Aunque la pac no lo pide creare un tercer boton "Menu"
  // que tendra la funcion de ir a la pagina principal al clicar
  numCoches.classList.add("send");
  numCoches.innerText = "Menu";
  numCoches.style.display = "initial";
  numCoches.onclick = () => location.reload();

  // Usamos jquery para crear una funcion para reiniciar la carrera
  $(document).ready(function () {
    $("#reiniciarCarrera").click(function () {
      for (var p = 0; p < participantesArray.length; p++) {

        //Paramos y regresamos a la posicion inicial a cada coche
        $(`.jquery-race${p}`).stop();
        $(`.jquery-race${p}`).animate({ marginLeft: "0px" }, 50);
      }
      
      //Mostramos y ocultamos botones de nuevo
      reiniciar.style.display = "none";
      iniciar.style.display = "initial";
      numCoches.style.display = "initial";
    });
  });

  // agregamos los botones
  menuCarrera.classList.add("menu-carrera");
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  menuCarrera.appendChild(numCoches);
  //y añadimos al contenedor 
  contenedor.appendChild(menuCarrera);

  // aqui volvemos a usar jquery 
  $(document).ready(function () {
    $("#race-btn").click(function () {
        
      /* Escondemos el boton iniciar y mostramos el de reiniciar una vez 
        comienza la carrera */
      setTimeout(() => {
        iniciar.style.display = "none";
        numCoches.style.display = "none";
        reiniciar.style.display = "initial";
      }, 100);

      //Creamos el elemento donde mostrar las posiciones finales
      const tablePositions = document.createElement("div");
      tablePositions.innerHTML = "<h1 id='posiciones'>Posiciones</h1>";

      // Bucle for para dar el movimiento a los coches a traves de animaciones
      for (var y = 0; y < participantesArray.length; y++) {

        // Usamos un random para asignar la velocidad con la que se moveran de forma aleatoria
        var duration = Math.random() * (10 - 1) + 1;
        duration = Math.round(duration) * 1000;

        //Usamos el metodo .animate para cada coche que tendra el valor aleatorio que hara que se mueva hasta la meta
        $(`.jquery-race${y}`).animate(
          { marginLeft: "90%" },
          duration,
          null,
          function () {

            //Cuando finalice la carrera se iran añadiendo al array segun vayan llegando a la meta
            positionsArray.push(this.nombre); 
            console.log(positionsArray);


            //Ahora creamos un if que se ejecutara cuando hayan llegado todos los coches 
            if (positionsArray.length == participantesArray.length) {
              
              // una vez que haya terminado se ocultara el boton "reiniciar" y volvemos a hacer visible el de "iniciar"
              reiniciar.style.display = "none";
              iniciar.style.display = "initial";

              //Pasamos las posiciones al array final donde los mostraremos
              finalResults = positionsArray;

              //Volvemos a vaciar el array para una nueva carrera
              positionsArray = [];

              //Vamos a ocultar todo lo qu esta en pantalla para entonces mostrar los resultados
              var coches = document.querySelectorAll(".pista");
              var dorsales = document.querySelectorAll(".dorsal");
              coches.forEach((coche) => {
                coche.style.display = "none";
              });
              
              dorsales.forEach((nDorsal) => {
                nDorsal.style.display = "none";
              });

              //Ahora creamos la lista con las posiciones 
              for (var x = 0; x < finalResults.length; x++) {
                var pos = document.createElement("div");
                pos.classList.add("posiciones");
                pos.innerHTML = `<p><u>Posición ${x + 1} :</u> Coche ${
                  finalResults[x]
                }</p></br>`;
                tablePositions.appendChild(pos);
              }
              
              //mostramos entonces los resultados por pantalla.
              iniciar.style.display = "none"; 
              contenedor.appendChild(tablePositions); 

              //Mostrara los resultados 5 segundos y volvera a la pantalla principal          
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          }
        );
      }
    });
  });
};
//llamamos a la funcion main para empezar a ejecutar el programa
mainMenu();