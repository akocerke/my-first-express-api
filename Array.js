// Array Methoden

// todos
const todos = [
    { id: 1, title: "Design festlegen", completed: true },
    { id: 2, title: "Funktion der Navbar definieren", completed: true },
    { id: 3, title: "Entwicklungsumgebung festlegen", completed: false },
    { id: 4, title: "Backend-Routen definieren", completed: false },
    { id: 5, title: "Frontend-Komponenten entwerfen", completed: false }
    ];

    module.exports = todos;

// ============== push() Methode Fügt ein Element am Ende des Arrays ein und gibt die neue Größe des Arrays zurück
const newTodoPush = { id: 6, title: "Tests schreiben", completed: false };
todos.push(newTodoPush);

console.log("push() Methode:");
console.log(todos);

// =============== pop() Methode Entfernt das letzte Element aus dem Array und gibt es zurück
const removedTodo = todos.pop();
console.log("Entferntes Todo:", removedTodo);

// =============== unshift() Methode Fügt ein Element am Anfang des Arrays ein und gibt die neue Größe des Arrays zurück
const newTodoUnshipft = { id: 0, title: "Projektplan erstellen", completed: false };
const newSize = todos.unshift(newTodoUnshipft);

// Ergebnis auf der Konsole ausgeben
console.log("Nach Hinzufügen eines neuen Todos mit unshift():");
console.log("Neue Größe des Arrays:", newSize);
console.log("Aktualisierte Todo-Liste:", todos);

// =============== find() Methode Gibt den Wert des ersten Elements zurück, 
const foundTodo = todos.find((item) => item.id === 1);
console.log("Beispiel für die find() Methode:");
console.log(foundTodo);


// =============== sort() Methode Wandelt die Werte in Strings um, so dass Zahlen nicht numerisch sortiert werden.
const sortedTodos = todos.slice().sort((a, b) => a.id - b.id);

// Ergebnis auf der Konsole ausgeben
console.log("Nach Sortieren der Todos mit sort():");
console.log(sortedTodos);


// =============== concat() Methode Erzeugt ein neues Array aus dem Original, gefolgt von allen Elementen eines oder mehrerer weiterer Arrays.

// Variable additionalTodos definiert
const additionalTodos = [
    { id: 6, title: "Tests schreiben", completed: false },
    { id: 7, title: "Dokumentation aktualisieren", completed: false }
];

// Die ursprünglichen Todos, die in der Variable todos definiert sind.
// Die zusätzlichen Todos, die in der Variable additionalTodos definiert sind
const concatenatedTodos = todos.concat(additionalTodos);

// Ergebnis auf der Konsole ausgeben
console.log("Nach Verketten der Todos mit concat():");
console.log(concatenatedTodos);


// =============== join() Methode, um einen String zu erzeugen
const joinedString = concatenatedTodos.map(todo => todo.title).join(", ");

// Ausgabe des erzeugten Strings
console.log("String aus den Elementen des Arrays mit join():");
console.log(joinedString);


// =============== reverse() Methode, um die Reihenfolge der Elemente umzukehren
todos.reverse();

// Ausgabe des geänderten Arrays
console.log("Nach Umkehren der Reihenfolge von todos mit reverse():");
console.log(todos);

// =============== indexOf () Durchsucht das Array von einem Startindex an nach einem Wert und gibt die erste Fundstelle oder -1 (nicht gefunden) zurück.
// Suchen nach einem Element mit der indexOf() Methode
const index = todos.findIndex(todo => todo.id === 3);

// Ausgabe des Ergebnisses
console.log("Index des Elements in todos:", index);


// ============== map()-Methode die auf jedes Element angewendet wird  und gibt ein neues Array zurück
const getTitle = todo => todo.title;

// Anwendung der map()-Methode
const titles = todos.map(getTitle);

// Ausgabe des neuen Arrays mit den Titeln
console.log(titles);

// ============== filter()-Methode erstellt ein neues Array, das nur diejenigen Elemente enthält, für die die Bedingung wahr ist
const incompleteTodos = todo => !todo.completed; // gibt nur false zurück durch "!" => nicht
// const incompleteTodos = todo => todo.completed;  gibt nur true zurück

// Anwendung der filter()-Methode
const incomplete = todos.filter(incompleteTodos);

// Ausgabe des neuen Arrays mit unvollständigen Todos
console.log(incomplete);
