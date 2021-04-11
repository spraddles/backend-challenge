exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("fields")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("fields").insert([
        { id: 1, name: "firstName" },
        { id: 2, name: "lastName" },
        { id: 3, name: "dob" },
        { id: 4, name: "email" },
        { id: 5, name: "emergencyContact" },
      ]);
    });
};
