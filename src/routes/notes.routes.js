const { Router } = require("express")

const notesRoutes = Router()

const NotesController = require("../controller/notes.controller")

const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/:id", notesController.show)

module.exports = notesRoutes