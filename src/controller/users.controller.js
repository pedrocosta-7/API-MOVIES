const knex = require("../database/knex/index")
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

class UsersController {
  async create(request, response) {
    let { name, email, password} = request.body;

    if (!name) {
      throw new AppError('Nome é obrigatório')
    }

    const checkUserExists = await knex('users').select('*').where({ email }).first();

    if(checkUserExists){
      throw new AppError("Email já em uso")
    }

    
    password = await hash(password, 8)


    await knex("users").insert({
      name,
      email,
      password
    })

    

    response.status(201).json({})
    
  }
  async update(request,response) {
    let { name, email, password, oldPassword} = request.body;
    const {id} = request.params;
    
    const user = await knex('users').select('*').where({id}).first()

    if(!user){
      throw new AppError("usuário não encontrado")
    }

    if(!oldPassword){
        throw new AppError("forneça a senha antiga")
    }

    const checkOldPassword = await compare(oldPassword, user.password)   

    if(!checkOldPassword){
        throw new AppError("senha antiga está incorreta")
    }

    const userWithUpdatedEmail = await knex('users').select('*').where({email}).first()

  if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    throw new AppError("Este e-mail já está em uso.")
   }

  password = await hash(password, 8)

  await knex("users").where({id}).update({
    name: name,
    email: email,
    password: password
  })

  return response.json({})

  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("users").where({id}).delete();

    return response.json({});
  }
}

module.exports = UsersController
