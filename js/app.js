'use strict';

let moviesTable = document.getElementById('moviesTable');
let count = 0;

function makeTableHeader() {
  let tableHeader = document.createElement('thead')
  moviesTable.appendChild(tableHeader);
  let trHeader = document.createElement('tr');
  tableHeader.appendChild(trHeader);
  let thfirst = document.createElement('th');
  trHeader.appendChild(thfirst);
  thfirst.textContent = '#';
  let thsecond = document.createElement('th');
  trHeader.appendChild(thsecond);
  thsecond.textContent = 'Image';
  let ththird = document.createElement('th');
  trHeader.appendChild(ththird);
  ththird.textContent = 'Name';
  let thfourth = document.createElement('th');
  trHeader.appendChild(thfourth);
  thfourth.textContent = 'Release';

}
makeTableHeader()

function makeTableFooter() {
  let tableFooter = document.createElement('tfoot')
  moviesTable.appendChild(tableFooter);
  let trFooter = document.createElement('tr');
  tableFooter.appendChild(trFooter);
  let thfirst = document.createElement('th');
  trFooter.appendChild(thfirst);
  thfirst.textContent = 'Quantity';
  let thsecond = document.createElement('th');
  trFooter.appendChild(thsecond);
  thsecond.textContent = count;

}
makeTableFooter()




//////////////  constructor function ////////////////

function Movie(Name, Type, Release) {
  this.Name = Name;
  this.Type = Type;
  this.Release = Release;
  Movie.all.push(this)
}
Movie.all = [];

Movie.prototype.render = function() {

  let tableBody = document.createElement('tbody')
  moviesTable.appendChild(tableBody);
  let trBody = document.createElement('tr');
  tableBody.appendChild(trBody);
  let tdfirst = document.createElement('td');
  trBody.appendChild(tdfirst);
  tdfirst.innerHTML = `<a href="#" onclick="del(${this.Name})">X</a>`;
  let tdsecond = document.createElement('td');
  trBody.appendChild(tdsecond);
  tdsecond.innerHTML = `<img src="./img/${this.Type}.png>"`;
  let tdthird = document.createElement('td');
  trBody.appendChild(tdthird);
  tdthird.textContent = `${this.Name}`;
  let tdfourth = document.createElement('td');
  trBody.appendChild(tdfourth);
  tdfourth.textContent = `${this.Release}`;

}

function renderAllElements() {
  for (let i in Movie.all) {
    new Movie(Movie.all[i].Name, Movie.all[i].Type, Movie.all[i].Release);
  }

}

//////////////////////clear item ///////////
function del(Name) {
  Movie.all.splice(Name, 1);
  saveToLocalStorage();
  if (Movie.all.length > 0) {
    clearTable();
    renderAllElements();
  } else {
    clearTable();
  }
}


///////////////// submition event handler//////////////////
function submissionEventHandler(event) {
  event.preventDefault();
  let Name = event.target.Name.value;
  let Type = event.target.Type.value;
  let Release = event.target.Release.value;

  let newMovie = new Movie(Name, Type, Release);
  count++;
  console.log(count);
  newMovie.render();
  saveToLocalStorage();

  movieForm.reset();

}



let movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', submissionEventHandler)
  /////////////// pageload event ////////////////
function pageLoad() {
  Movie.all = [];
  let data = JSON.parse(localStorage.getItem('movieListInfo'));
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let newStoredMovie = new Movie(data[i].Name, data[i].Type, data[i].Release);
      newStoredMovie.render();
    }
  }

}
document.addEventListener('DOMContentLoaded', pageLoad);
/////////////// save to local storage ////////////
function saveToLocalStorage() {
  let movieListInfo = localStorage.setItem('movieListInfo', JSON.stringify(Movie.all));
}

////////// clear the list ///////////////
function clearList() {
  moviesTable.innerHTML = '';
  localStorage.removeItem('movieListInfo');
}


/////////// clear table///////////
function clearTable() {
  moviesTable.innerHTML = '';
}