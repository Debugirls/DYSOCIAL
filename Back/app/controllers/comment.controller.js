const db = require("../models");
const Comment = db.comments;

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        console.log("bodyinsidecontroller", req.body)
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
console.log(req.body)
    // Create a Comment
    const comment = new Comment({
        image: req.body.image,
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date,
        likes: req.body.likes,
        published: req.body.published ? req.body.published : false
    });

    // Save Comment in the database
    comment
        .save(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the comment."
            });
        });
};

// Retrieve all comments from the database and find by title from the database:


//Aqui hago uso de GetSortedAndPaged,introduciendo el offset, limit y maxDate que vienen de la query url
//(la llamada http con las interrogaciones y los parametros extra)
//blablabla/publications?page=0&size=24&maxDate=20230101
//maxDate determina la fecha de post mas tardÍos que vamos a devolver:

exports.findAll = (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    var condition = {};
    if(title !== undefined) {
        condition["title"] = { $regex: new RegExp(title), $options: "i" };
    }
    if(author !== undefined) {
        condition["author"] = { $regex: new RegExp(author), $options: "i" };
    }
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Comment.paginate(condition, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                comments: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};

// Find a single comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found comment with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving comment with id=" + id });
        });
};

// Update a comment by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update comment with id=${id}. Maybe that comment was not found!`
                });
            } else res.send({ message: "Comment was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating comment with id=" + id
            });
        });
};

// Delete a comment with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete comment with id=${id}. Maybe the comment was not found!`
                });
            } else {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete comment with id=" + id
            });
        });
};

// Delete all comments from the database.
exports.deleteAll = (req, res) => {
    Comment.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Comment were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all comments."
            });
        });
};
// Find all published comments
exports.findAllPublished = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Comment.paginate({ published: true }, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                comments: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};