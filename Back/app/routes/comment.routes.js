const authJwt = require("../middlewares/authJwt.js");

module.exports = app => {
    const publications = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new publications verified
    router.post("/", [authJwt.verifyToken], publications.create);

    // Retrieve all publications
    router.get("/", publications.findAll);

    // Retrieve all published publications
    router.get("/published", publications.findAllPublished);

    // Retrieve a single comment with id
    router.get("/:id", publications.findOne);

    // Update a comment with id
    router.put("/:id", publications.update);

    // Delete a comment with id
    router.delete("/:id", publications.delete);

    // Delete all publications
    router.delete("/", publications.deleteAll);

    app.use('/api/publications', router);
};