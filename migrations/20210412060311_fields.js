exports.up = function(knex, Promise) {
    return knex.schema.createTable("data", function(table) {
        table.increments("id").primary();
        table.string("firstName");
        table.string("lastName");
        table.date("dob");
        table.string("email");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("data");
};