const User_Pending = require("../models/user_pending.model.js");

// Create and Save a new User_Pending
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User_Pending
  const user = new User_Pending({
    id: req.body.id,
    role: req.body.role,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mail: req.body.mail,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    zipCode: req.body.zipCode,
    city: req.body.city,
    country: req.body.country
  });

  // Save User_Pending in the database
  User_Pending.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User_Pending."
      });
    else res.send(data);
  });
};

// Retrieve all User_Pendings from the database.
exports.findAll = (req, res) => {
  User_Pending.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users_pending."
      });
    else res.send(data);
  });
};

// Find a single User_Pending with a id
exports.findOne = (req, res) => {
  User_Pending.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User_Pending with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User_Pending with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findConnection = (req, res) => {
  User_Pending.findByMailAndPassword(req.params.mail, req.params.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User_Pending with mail ${req.params.mail} and password ${req.params.password}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User_Pending with mail ${req.params.mail} and password ${req.params.password}.`
        });
      }
    } else res.send(data);
  });
};

// Update a User_Pending identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User_Pending.updateById(req.params.id, new User_Pending(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User_Pending with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User_Pending with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a User_Pending with the specified id in the request
exports.delete = (req, res) => {
  User_Pending.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User_Pending with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User_Pending with id " + req.params.id
        });
      }
    } else res.send({ message: `User_Pending was deleted successfully!` });
  });
};

// Delete all User_Pendings from the database.
exports.deleteAll = (req, res) => {
  User_Pending.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users_Pending."
      });
    else res.send({ message: `All User_Pending were deleted successfully!` });
  });
};
