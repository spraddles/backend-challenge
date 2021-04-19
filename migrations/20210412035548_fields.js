exports.up = function(knex, Promise) {
    return knex.schema.table("fields", function(table) {
        table.bool("required");
        table.string("type");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("fields", function(table) {
        table.dropColumn("required");
        table.dropColumn("type");
    });
};