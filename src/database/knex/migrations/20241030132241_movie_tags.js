exports.up = knex => knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    table.integer("id_da_notação").references("id").inTable("users").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.text("nome_da_tag")
});
exports.down = knex => knex.schema.dropTable("movie_tags")
