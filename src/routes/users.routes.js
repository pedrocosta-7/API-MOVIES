const { Router } = require("express")

const usersRoutes = Router()

const UsersController = require("../controller/users.controller")

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.delete("/:id", usersController.delete)
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes