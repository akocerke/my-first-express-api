CREATE DATABASE todos_db;

USE todos_db;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS todos;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    title VARCHAR(255),
    completed BOOLEAN,
    doneByDate DATE,
    FOREIGN KEY (userId) REFERENCES users(id)
);


INSERT INTO users (firstName, lastName, email, password) VALUES
('Max', 'Mustermann', 'max@example.com', 'password123'),
('John', 'Doe', 'john@example.com', 'securepassword'),
('Emily', 'Smith', 'emily@example.com', 'qwerty123'),
('David', 'Brown', 'david@example.com', 'password456'),
('Emma', 'Johnson', 'emma@example.com', 'secure123'),
('Daniel', 'Wilson', 'daniel@example.com', 'password789'),
('Olivia', 'Taylor', 'olivia@example.com', 'pass123word'),
('Michael', 'Anderson', 'michael@example.com', 'secure456'),
('Sophia', 'Thomas', 'sophia@example.com', 'passwordabc'),
('James', 'Jackson', 'james@example.com', 'abc123password'),
('Isabella', 'White', 'isabella@example.com', 'secure789'),
('Ethan', 'Harris', 'ethan@example.com', 'passwordxyz'),
('Ava', 'Martinez', 'ava@example.com', 'xyz123password'),
('Alexander', 'Lopez', 'alexander@example.com', 'securexyz'),
('Mia', 'Garcia', 'mia@example.com', 'password789abc'),
('William', 'King', 'william@example.com', 'abcxyzpassword'),
('Charlotte', 'Lee', 'charlotte@example.com', 'securepassword123'),
('Abigail', 'Green', 'abigail@example.com', 'passwordxyz123'),
('Benjamin', 'Evans', 'benjamin@example.com', 'xyzabcpassword'),
('Amelia', 'Wright', 'amelia@example.com', 'password123xyz');

INSERT INTO todos (userId, title, completed, doneByDate) VALUES
(1, 'Design festlegen', true, '2024-12-17'),
(1, 'Prototyp erstellen', false, '2024-12-31'),
(2, 'Benutzerregistrierung implementieren', true, '2024-12-20'),
(3, 'Datenbankstruktur entwerfen', false, '2024-12-22'),
(4, 'Benutzerschnittstelle gestalten', true, '2024-12-25'),
(2, 'Aufgabenliste anzeigen', false, '2024-12-28'),
(5, 'Funktion zum Hinzufügen von Aufgaben implementieren', true, '2024-12-30'),
(3, 'Funktion zum Bearbeiten von Aufgaben implementieren', false, '2025-01-02'),
(6, 'Funktion zum Löschen von Aufgaben implementieren', true, '2025-01-05'),
(4, 'Funktion zum Markieren von Aufgaben als erledigt implementieren', false, '2025-01-08'),
(7, 'Benutzerprofilseite erstellen', true, '2025-01-10'),
(5, 'Authentifizierung implementieren', false, '2025-01-12'),
(8, 'Funktion zum Filtern von Aufgaben implementieren', true, '2025-01-15'),
(6, 'Responsive Design anpassen', false, '2025-01-18'),
(9, 'Testing und Debugging durchführen', true, '2025-01-20'),
(7, 'Deployment auf Server vorbereiten', false, '2025-01-22'),
(10, 'Dokumentation schreiben', true, '2025-01-25'),
(8, 'Benachrichtigungen implementieren', false, '2025-01-28'),
(11, 'Kundenumfrage durchführen', true, '2025-01-30'),
(9, 'Sicherheitsüberprüfung durchführen', false, '2025-02-02');



SELECT * FROM users;
SELECT * FROM todos;

SELECT * FROM todos WHERE userId = '25';

