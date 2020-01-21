const sql = require("./db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// constructor
const User = function(user) {
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

User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newUser.password = hash;
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
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

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByMailAndPassword = (mail, password, result) => {
  sql.query(`SELECT * FROM users WHERE mail = '${mail}'`, (err, res) => {
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
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  user.password = CryptoJS.AES.encrypt(user.password, secretKey);
  sql.query(
    "UPDATE users SET role = ?, password = ?, firstName = ?, lastName = ?, mail = ?, birthDate = ?, phone = ?, address = ?, zipCode = ?, city = ?, country = ? WHERE id = ?",
    [
      user.role,
      user.password,
      user.firstName,
      user.lastName,
      user.mail,
      user.birthDate,
      user.phone,
      user.address,
      user.zipCode,
      user.city,
      user.country,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
