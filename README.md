# Express Template

1. `npm install` Pakete nachinstallieren
2. `npm run dev`, um API-Server auf dem Port, welcher in der `.env` Datei definiert ist, zu starten

## Dokumentation USER

`/test` : GET - Soll eine Testroute darstellen und Gibt ein Hello World! zurück

`/profile` : GET - Soll ein Profil vom User in json Format zurück geben

`/user` : GET - Soll ein Profil vom User mit firstName, lastName, birthday  in json Format zurück geben

`/users` : GET - Soll mehrere Profile von Usern mit firstName, lastName, birthday in json Format zurück geben

`/user` : POST - Soll User mit id, firstName, lastName, birthday in json Format einfügen

`/user/delete/:id`: DELETE - soll einen User mit :id löschen

`/user/update/:id`  PUT - Soll einen User mit :id Daten updaten


## Dokumentation TODO

`/todos` : GET - Soll ALLE todos in json Format zurück geben

`todo` : GET - Soll EIN todo :id zurück geben

`/todo/add` POST - Soll EIN todo :id hinzufügen

`/todo/update` PUT - Soll EIN todo :id aktualisieren

`/todo/delete` DELETE - Soll EIN todo :id löschen


