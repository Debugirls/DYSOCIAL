const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.comments = require("./comment.model.js")(mongoose, mongoosePaginate);
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin"];

module.exports = db;