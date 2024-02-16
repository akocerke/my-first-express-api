// Aufgabe 1

const { response } = require("express");

// 1. Ein GET auf "https://jsonplaceholder.typicode.com/posts&quot;
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));

//   2. Ein GET auf deine ToDo Api, die alle todos ausgibt
fetch("http://localhost:3030/v1/todos/all")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error))


//  3. Ein GET auf deine ToDo Api, die alle todos zu einer userId ausgibt 
fetch(`http://localhost:3030/v1/todos/byuserid/5`) // => /:id kann man immer wieder austausche 
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error fetching data:', error))

// zu 3 => siehe todos API
// GET-Anfrage, um alle Todos eines Benutzers anhand der Benutzer-ID zurückzugeben
// TodoRouter.get("/byuserid/:userId", (req, res) => {...
   
