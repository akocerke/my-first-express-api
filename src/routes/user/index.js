const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { users } = require("../../../User");

const UserRouter = Router();

// GET-Anfrage, um das Profil eines bestimmten Benutzers zurückzugeben
UserRouter.get("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId || isNaN(userId)) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const userProfile = users.find((user) => user.id === userId);
  if (!userProfile) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    return;
  }
  res.status(StatusCodes.OK).json({ profile: userProfile });
});

// PUT-Anfrage, um das Profil eines Benutzers zu aktualisieren
UserRouter.put("/profile/update", (req, res) => {
  const { username, userId } = req.body;

  const currentUser = users.find((user) => user.id === userId);
  if (!currentUser) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    return;
  }

  currentUser.username = username;

  res.status(StatusCodes.OK).json({ updatedProfile: currentUser });
});

// DELETE-Anfrage, um das Profil eines Benutzers zu löschen
UserRouter.delete("/profile/delete", (req, res) => {
  const { userId } = req.body;

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    return;
  }

  users.splice(index, 1);

  res.status(StatusCodes.OK).json({ deletedUserId: userId });
});

module.exports = { UserRouter };