const express = require("express");
const app = express();
const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const port = 3000;

// add in parser for better body & error handling
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add in form validation
const { body, validationResult } = require('express-validator');

// ping test
app.get("/ping", 
async (req, res) => res.send("pong"));

// get fields
app.get("/fields", 
async (req, res) => {
  knex("fields")
  .select("*")
  .then((rows) => {
    res.json(rows);
  })
  .catch((err) => {
    res.status(500).json({message: "Error getting fields", error: err})
  });
});

// create new fields
app.post("/fields/new", 
async (req, res) => {
  const new_fields = req.body;
  knex("fields")
  .insert(new_fields)
  .then(() => {
    res.json({ success: true, message: 'Fields created!' });
  })
  .catch((err) => {
    res.status(500).json({message: "Error creating new field", error: err})
  });
});

// update fields
app.put("/fields/update", 
async (req, res) => {
  const field_changes = req.body;
  knex("fields")
  .where({ id: req.body.id })
  .update(field_changes)
  .then(() => {
    res.json({ success: true, message: 'Fields updated!' });
  })
  .catch((err) => {
    res.status(500).json({message: "Error updating fields", error: err})
  });
});

// delete fields
app.delete("/fields/delete", 
async (req, res) => {
  const field_delete = req.body;
  knex("fields")
  .where({ id: req.body.id })
  .del(field_delete)
  .then(() => {
    res.json({ success: true, message: 'Fields deleted!' });
  })
  .catch((err) => {
    res.status(500).json({message: "Error deleting fields", error: err})
  });
});

// get forms
app.get("/forms", 
async (req, res) => {
  knex("data")
  .select("*")
  .then((rows) => {
    res.json(rows);
  })
  .catch((err) => {
    res.status(500).json({message: "Error getting forms", error: err})
  });
});

// create new form (with validation)
app.post("/forms/new",
body('firstName').isString(),
body('lastName').isString(),
body('dob').isDate(),
body('email').isEmail().optional(), // express-validator "optional" not working
body('emergencyContact.firstName').isString(),
body('emergencyContact.lastName').isString(),
body('emergencyContact.email').isEmail().optional(),
async (req, res) => {
  const base_new_form_details = {
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  knex("data").insert({
    firstName: req.body.emergencyContact.firstName,
    lastName: req.body.emergencyContact.lastName,
    email: req.body.emergencyContact.email
  }).returning('id')

  .then(function (the_id) {
    return knex("data").insert({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      emergencyContactID: the_id
    })
  })
  .then(() => {
    res.json({ success: true, message: 'Form created!' });
  })
  .catch(err=>{
    res.status(500).json({message: "Error creating new form", error: err})
  })
})

// update form (with validation)
app.put("/forms/update",
body('firstName').isString(),
body('lastName').isString(),
body('dob').isDate(),
body('email').isEmail().optional(),
async (req, res) => {
  const field_changes = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  knex("data")
  .where({ id: req.body.id })
  .update(field_changes)
  .then(() => {
    res.json({ success: true, message: 'Form updated!' });
  })
  .catch((err) => {
    res.status(500).json({message: "Error updating form", error: err})
  });
});

// delete form
app.delete("/forms/delete",
async (req, res) => {
  const form_delete = req.body;
  knex("data")
  .where({ id: req.body.id })
  .del(form_delete)
  // @TODO - add in logic to also delete related 'emergencyContact'
  .then(() => {
    res.json({ success: true, message: 'Form deleted!' });
  })
  .catch((err) => {
    res.status(500).json({message: "Error deleting form", error: err})
  });
});

app.listen(port, () => console.log("Example app listening on port " + port));