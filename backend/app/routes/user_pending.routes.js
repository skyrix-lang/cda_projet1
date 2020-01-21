module.exports = app => {
    const users = require("../controllers/user_pending.controller.js");

    // Create a new User
    app.post("/users_pending", users.create);

    // Retrieve all Users
    app.get("/users_pending", users.findAll);

    // Retrieve a single User with userId
    app.get("/users_pending/:userId", users.findOne);
    
    // Retrieve a single User with mail and password
    app.get("/users_pending/:mail/:password", users.findConnection)

    // Update a User with userId
    app.put("/users_pending/:userId", users.update);

    // Delete a User with userId
    app.delete("/users_pending/:userId", users.delete);

    // Create a new User
    app.delete("/users_pending", users.deleteAll);
};