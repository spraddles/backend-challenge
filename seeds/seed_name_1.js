exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("data")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("data").insert([
        { firstName: "John", lastName: "Smith", dob: "1990-01-09", email: "john.smith@gmail.com", emergencyContactID: "2" },
        { firstName: "Brenda", lastName: "Jones", dob: "", email: "brenda.jones@hotmail.com", emergencyContactID: "" },
        { firstName: "Harry", lastName: "Reynolds", dob: "1969-01-10", email: "harry1969.jones@hotmail.com", emergencyContactID: "4" },
        { firstName: "Bazza", lastName: "Greyson", dob: "", email: "big_bazza@hotmail.com", emergencyContactID: "" },
        { firstName: "Laura", lastName: "Reddy", dob: "1990-01-09", email: "notreddy@outlook.com", emergencyContactID: "6" },
        { firstName: "Jarrod", lastName: "Bright", dob: "", email: "bjarrod@gmail.com", emergencyContactID: "" }
      ]);
    });
};