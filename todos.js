//  todos.js
const todos = [
    { 
        id: 1, 
        userId: 1,
        title: "Design festlegen", 
        completed: true,
        doneByDate: new Date('2024-12-17') 
    },
    { 
        id: 2, 
        userId: 1,
        title: "Wireframes erstellen", 
        completed: false,
        doneByDate: new Date('2024-12-19') 
    },
    { 
        id: 3, 
        userId: 2,
        title: "Frontend-Prototyp entwickeln", 
        completed: true,
        doneByDate: new Date('2024-12-20') 
    },
    { 
        id: 4, 
        userId: 2,
        title: "Backend-Infrastruktur planen", 
        completed: false,
        doneByDate: new Date('2024-12-18') 
    },
    { 
        id: 5, 
        userId: 3,
        title: "Datenbankmodellierung durchführen", 
        completed: true,
        doneByDate: new Date('2024-12-20') 
    },
    { 
        id: 6, 
        userId: 3,
        title: "API-Routen definieren", 
        completed: false,
        doneByDate: new Date('2024-12-22') 
    },
    { 
        id: 7, 
        userId: 4,
        title: "Authentifizierungssystem implementieren", 
        completed: true,
        doneByDate: new Date('2024-12-21') 
    },
    { 
        id: 8, 
        userId: 4,
        title: "Benutzeroberfläche gestalten", 
        completed: false,
        doneByDate: new Date('2024-12-23') 
    },
    { 
        id: 9, 
        userId: 5,
        title: "Komponentenbibliothek integrieren", 
        completed: true,
        doneByDate: new Date('2024-12-25') 
    },
    { 
        id: 10, 
        userId: 5,
        title: "Responsive Design implementieren", 
        completed: false,
        doneByDate: new Date('2024-12-24') 
    },
    { 
        id: 11, 
        userId: 6,
        title: "Backend-Endpunkte implementieren", 
        completed: true,
        doneByDate: new Date('2024-12-26') 
    },
    { 
        id: 12, 
        userId: 6,
        title: "Datenvalidierung einrichten", 
        completed: false,
        doneByDate: new Date('2024-12-27') 
    }
];

module.exports = todos;
