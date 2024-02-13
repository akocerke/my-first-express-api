# Express Template

1. `npm install` Pakete nachinstallieren
2. `npm run dev`, um API-Server auf dem Port, welcher in der `.env` Datei definiert ist, zu starten

## Dokumentation

`/test` : GET - Soll eine Testroute darstellen und Gibt ein Hello World! zurück

`/profile` : GET - Soll ein Profil vom User in json Format zurück geben

`/user` : GET - Soll ein Profil vom User mit firstName, lastName, birthday  in json Format zurück geben

`/user` : POST - Soll ein Profil vom User mit firstName, lastName, birthday in json Format einfügen

`/users` : GET - Soll mehrere Profile von Usern mit firstName, lastName, birthday in json Format zurück geben

`/todos` : GET - Soll eine Liste von "todos" in json Format zurück geben

`/user/delete/:id`: DELETE - soll einen User löschen

`/user/update/:id`  PUT -soll einen User Daten updaten

