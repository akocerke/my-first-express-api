const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const members = [
    { todoId: 1, memberId: 123 },
    { todoId: 1, memberId: 456 },
    { todoId: 2, memberId: 789 },
    { todoId: 3, memberId: 101 },
    { todoId: 3, memberId: 123 },
    { todoId: 2, memberId: 325 },
    { todoId: 1, memberId: 456 },
    { todoId: 4, memberId: 789 },
    { todoId: 7, memberId: 101 },
    { todoId: 8, memberId: 123 },
    { todoId: 1, memberId: 123 },
    { todoId: 1, memberId: 456 },
    { todoId: 5, memberId: 789 },
    { todoId: 6, memberId: 101 },
    { todoId: 4, memberId: 123 }
]; // Hier sollten die Mitgliederdaten gespeichert werden

const MemberRouter = Router();

// GET - Mitglieder für ein bestimmtes Todo erhalten
MemberRouter.get("/:todoId", (req, res) => {
    const todoId = req.params.todoId;
    const todoMembers = members.filter(member => member.todoId === parseInt(todoId)); // Beachte die Umwandlung in Integer

    if (todoMembers.length === 0) {
        console.log(`Keine Mitglieder gefunden für Todo mit der ID ${todoId}`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Keine Mitglieder gefunden für Todo mit der ID ${todoId}` });
        
    }
    console.log(`Mitglieder gefunden für Todo mit der ID ${todoId}`);
    res.status(StatusCodes.OK).json({ message: `Mitglieder gefunden für Todo mit der ID ${todoId}`, members: todoMembers });
});

// POST - Mitglied hinzufügen
MemberRouter.post("/add", (req, res) => {
    const { todoId, memberId } = req.body;

    // Hier müsste Logik stehen, um sicherzustellen, dass das Mitglied und die Todo-ID gültig sind
    members.push({ todoId: parseInt(todoId), memberId: parseInt(memberId) }); // Beachte die Umwandlung in Integer
    console.log(`Mitglied erfolgreich hinzugefügt: Todo ID ${todoId}, Mitglied ID ${memberId}`);
    res.status(StatusCodes.OK).json({ message: "Mitglied erfolgreich hinzugefügt", newMember: { todoId, memberId } });
});

// DELETE - Mitglied aus einem bestimmten Todo entfernen
MemberRouter.delete("/remove/:todoId", (req, res) => {
    const todoId = req.params.todoId;
    const memberId = parseInt(req.body.memberId); // Beachte die Umwandlung in Integer

    // Hier müsste Logik stehen, um sicherzustellen, dass das Mitglied und die Todo-ID gültig sind

    const index = members.findIndex(member => member.todoId === parseInt(todoId) && member.memberId === memberId);
    if (index === -1) {
        console.log(`Mitglied nicht gefunden für Todo mit der ID ${todoId}`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Mitglied nicht gefunden für Todo mit der ID ${todoId}` });
    }

    members.splice(index, 1);
    console.log(`Mitglied erfolgreich aus Todo mit der ID ${todoId} entfernt`);
    res.status(StatusCodes.OK).json({ message: `Mitglied erfolgreich aus Todo mit der ID ${todoId} entfernt` });
});

module.exports = { MemberRouter };