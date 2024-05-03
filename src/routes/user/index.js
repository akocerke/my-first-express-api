const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const  User  = require("../../database/models/User");

const UserRouter = Router();

// GET-Anfrage, um das Profil eines bestimmten Benutzers zurückzugeben
UserRouter.get("/profile/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (!userId || isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  
    const userProfile = await User.findOne({ where: { id: userId } });
    if (!userProfile) {
      return res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    }
  
    return res.status(StatusCodes.OK).json({ profile: userProfile });
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzerprofils:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

// PUT-Anfrage, um das Profil eines Benutzers zu aktualisieren
UserRouter.put("/profile/update", async (req, res) => {
  try {
    const { username, userId } = req.body;
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    }
    userToUpdate.username = username;
    await userToUpdate.save();
    return res.status(StatusCodes.OK).json({ updatedProfile: userToUpdate });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Benutzerprofils:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

// DELETE-Anfrage, um das Profil eines Benutzers zu löschen
UserRouter.delete("/profile/delete", async (req, res) => {
  try {
    const { userId } = req.body;
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(StatusCodes.NOT_FOUND).send("Benutzer nicht gefunden");
    }
    await userToDelete.destroy();
    return res.status(StatusCodes.OK).json({ deletedUserId: userId });
  } catch (error) {
    console.error('Fehler beim Löschen des Benutzerprofils:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = { UserRouter };
