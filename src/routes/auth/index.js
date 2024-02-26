// auth/index.js

const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res) => {
  // Implementieren Sie die Anmelde-Logik hier
});


AuthRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body; // Zugriff auf die Anmeldedaten im Anfragekörper
    const user = await User.findOne({
      where: { email: email }
    }); // Benutzer anhand der E-Mail-Adresse finden

    if (!user) {
      // Benutzer nicht gefunden
      return res.status(401).json({
        message: "Login nicht erfolgreich",
        error: "Benutzer nicht gefunden",
      });
    }

    // Passwort überprüfen
    const passwordMatch = (user.password === password); // Hier sollte die Überprüfung des Passworts sicherer sein, normalerweise mit bcrypt

    if (!passwordMatch) {
      // Passwort stimmt nicht überein
      return res.status(401).json({
        message: "Login nicht erfolgreich",
        error: "Ungültige Anmeldeinformationen",
      });
    }

    res.status(200).json({
      message: "Login erfolgreich",
      user,
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
