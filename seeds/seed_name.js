exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("fields")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("fields").insert([
        { name: "firstName", type: "text", required: "1" },
        { name: "lastName", type: "text", required: "1"},
        { name: "dob", type: "date", required: "1" },
        { name: "email", type: "email", required: "0" },
        { name: "emergencyContact", type: "text", required: "1" }
      ]);
    });
};