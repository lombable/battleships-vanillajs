import "bootstrap";
import "./style.css";

window.onload = function() {
  // Obtiene elemento padre donde se creará el tablero

  const container = document.getElementById("gameboard");

  // Creación de variables que tendrán las filas y cuadros que se crearán
  let rows = document.getElementsByClassName("gridRow");
  let cells = document.getElementsByClassName("cell");

  //Crea las filas, añadiendo divs con clase gridRow y un id unico
  let row = null;
  function createRows(rowNum) {
    for (let i = 0; i < rowNum; i++) {
      row = document.createElement("div");
      container.appendChild(row);
      row.className = "gridRow";
      row.id = "r" + i;
    }
  }

  //Dibuja cada cuadro del tablero, añadiendo la clase cell y un id
  let cell = null;
  function createColumns(cellNum) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < cellNum; j++) {
        cell = document.createElement("div");
        rows[j].appendChild(cell);
        cell.className = "cell";
        cell.id = i;
      }
    }
  }
  // Esta función crea el tablero completo llamando las funciones anteriores
  createGrid();

  function createGrid() {
    createRows(8);
    createColumns(6);
  }
  // Asignar el event listener a cada elemento con la clase cell y ejecutar la función fire
  //cuando se haga "click" en un elemento con clase cell
  document.querySelectorAll(".cell").forEach(item => {
    item.addEventListener("click", fire);
  });

  let board = [
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 1]
  ];
  // Esta función determina si la posición del elemento corresponde a la posicion de un barco
  // y si es así muestra la imagen de un barco y si no, agua.
  let hits = 0;
  let misses = 0;
  function fire(e) {
    // Asigno las posiciones de fila y columna para buscar en el arreglo
    cell = e.target;
    let colNum = cell.id;
    let rowNum = cell.parentElement.id.substring(1, 2);

    // Identifica la posición en el arreglo y asigna las clases que dibujan un barco o agua
    if (board[rowNum][colNum] === 0) {
      cell.classList.add("miss");
      misses++;
    }
    if (board[rowNum][colNum] === 1) {
      cell.classList.add("hit");
      hits++;
    }
    // Si el jugador gana o pierde, remueve el event listener de todas las celdas
    if (won()) {
      document.querySelectorAll(".cell").forEach(item => {
        item.removeEventListener("click", fire);
      });
    }
    if (lost()) {
      document.querySelectorAll(".cell").forEach(item => {
        item.removeEventListener("click", fire);
      });
    }
  }
  // Cuenta cuantos si la cantidad de aciertos corresponde a la cantidad de barcos
  // y muestra una alerta de felicitaciones
  function won() {
    if (hits === 14 && !!alert) {
      const alertDiv = document.getElementById("alert");
      let alert = document.createElement("h1");
      alert.className = "alert alert bg-transparent text-success";
      alert.innerHTML = "Congratulations! You won!";
      alertDiv.appendChild(alert);
      window.scrollTo(0, 0);
      return true;
    } else return false;
  }
  // Cuenta cuantos si la cantidad de clicks es mayor a 30, y si no ha ganado muestra
  // una alerta diciendo que perdió
  function lost() {
    let shots = hits + misses;
    if (hits === 14) {
      return;
    }
    if (shots === 30) {
      const alertDiv = document.getElementById("alert");
      let alert = document.createElement("div");
      alert.className = "alert alert-info";
      alert.innerHTML = "Sorry! Reload the page to try again!";
      alertDiv.appendChild(alert);
      window.scrollTo(0, 0);
      return true;
    } else return false;
  }
};
