const sql = require("./db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// constructor
const User_Pending = function(user) {
  this.id = user.id;
  this.role = user.role;
  this.password = user.password;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.mail = user.mail;
  this.birthDate = user.birthDate;
  this.phone = user.phone;
  this.address = user.address;
  this.zipCode = user.zipCode;
  this.city = user.city;
  this.country = user.country;
};

User_Pending.create = (newUser_Pending, result) => {
  bcrypt.hash(newUser_Pending.password, saltRounds, function(err, hash) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newUser_Pending.password = hash;
    sql.query(
      "INSERT INTO users_pending SET ?",
      newUser_Pending,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created user_pending: ", {
          id: res.insertId,
          ...newUser_Pending
        });
        result(null, { id: res.insertId, ...newUser_Pending });
      }
    );
  });
};

User_Pending.findById = (userId, result) => {
  sql.query(`SELECT * FROM users_pending WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User_Pending with the id
    result({ kind: "not_found" }, null);
  });
};

User_Pending.findByMailAndPassword = (mail, password, result) => {
  sql.query(
    `SELECT * FROM users_pending WHERE mail = '${mail}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        bcrypt.compare(password, res[0].password, function(err, isMatch) {
          if (err) {
            console.log(err);
          }

          if (isMatch) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
          } else if (!isMatch) {
            result({ kind: "not_found" }, null);
          }
        });
      }
    }
  );
};

User_Pending.getAll = result => {
  sql.query("SELECT * FROM users_pending", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users_pending: ", res);
    result(null, res);
  });
};

User_Pending.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users_pending SET role = ?, birthDate = ?, phone = ?, address = ?, zipCode = ?, city = ?, country = ? WHERE id = ?",
    [
      user.role,
      "1998-01-23",
      //user.birthDate,
      user.phone,
      user.address,
      user.zipCode,
      user.city,
      user.country,
      user.id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User_Pending with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User_Pending.remove = (id, result) => {
  sql.query("DELETE FROM users_pending WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User_Pending with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User_Pending.removeAll = result => {
  sql.query("DELETE FROM users_pending", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users_pending`);
    result(null, res);
  });
};

module.exports = User_Pending;
