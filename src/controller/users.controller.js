const knex = require("../database/knex/index")
const AppError = require('../utils/AppError')


class UsersController {
  async create(request, response) {
    const { name, email, password, } = request.body
    
    if (!name) {
      throw new AppError('Nome é obrigatório')
    }
    
    await knex("users").insert({
      name,
      email,
      password
    })

    response.status(201).json({ name, email, password })
    
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("users").where({id}).delete();

    return response.json({});
  }
}

module.exports = UsersController
