const knex = require("../database/knex/index")


class NotesController {
  async create(request, response) {
    const {title ,description, nota } = request.body;
    const {user_id} = request.params;

  await knex("movie_notes").insert({
      title,
      description,
      nota,
      user_id
    })
    return response.status(201).json({title ,description, nota})
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({id}).delete();

    return response.json({});
  }
  async show(request,response){
    const { id } = request.params
 
    const notes = await knex("movie_notes").where({id})

    return response.status(201).json({notes})
  }

}

module.exports = NotesController

