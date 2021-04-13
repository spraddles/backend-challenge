exports.up = function(knex, Promise) {
    return knex.schema.table("data", function(table) {
        table.integer("emergencyContactID");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("data", function(table) {
        table.dropColumn("emergencyContactID");
    });
};