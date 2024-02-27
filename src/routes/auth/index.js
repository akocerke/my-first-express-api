// auth/index.js

const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Überprüfen, ob die E-Mail bereits vorhanden ist
    const existingUser = await User.findOne({
      where: { email } // Hier wird die Bedingung für die Suche nach der E-Mail-Adresse angegeben
    });
    if (existingUser) {
      return res.status(400).json({ message: "E-Mail bereits registriert" });
    }

    // Hashen des Passworts, bevor es in der Datenbank gespeichert wird
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen und in der Datenbank speichern
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Gesichertes (gehashtes) Passwort speichern
    });
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    console.error("Fehler bei der Anmeldung:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

AuthRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body; // Zugriff auf die Anmeldedaten im Anfragekörper
    const user = await User.findOne({
      where: { email: email },
    }); // Benutzer anhand der E-Mail-Adresse finden

    if (!user) {
      // Benutzer nicht gefunden
      return res.status(401).json({
        message: "Login nicht erfolgreich",
        error: "Benutzer nicht gefunden",
      });
    }

    // Passwort überprüfen
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwort stimmt nicht überein
      return res.status(401).json({
        message: "Login nicht erfolgreich",
        error: "Ungültige Anmeldeinformationen",
      });
    }

    res.status(200).json({
      message: "Login erfolgreich",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    // Fehler bei der Verarbeitung der Anfrage
    res.status(500).json({
      message: "Ein Fehler ist aufgetreten",
      error: error.message,
    });
  }
});

AuthRouter.delete("/logout", (req, res) => {
  // Implementieren Sie die Logout-Logik hier
});

module.exports = { AuthRouter };
