const knex = require("../database/knex/index")

class NotesController {
  async create(request, response) {
    const {title ,description, nota, movie_tags} = request.body;
    const {user_id} = request.params;

  const [id_da_notação] = await knex("movie_notes").insert({
      title,
      description,
      nota,
      user_id
    })

    const tagsInsert = movie_tags.map(nome_da_tag => {
      return {
        id_da_notação,
        user_id,
        nome_da_tag
      }
    })

    await knex("movie_tags").insert(tagsInsert)

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

