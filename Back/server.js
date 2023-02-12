const express = require("express");
const cors = require("cors");
const requestLogger = require("./app/middlewares/requestLogger");
const path = require('path')

const app = express();

//this is the ip and the port
var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(requestLogger);


// parse requests of content-type - application/json
app.use(express.json());

app.use("/images", express.static(path.join(__dirname + '/public')));

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

//database connection

const dbConfig = require('./app/config/db.config');
const db = require("./app/models");
const Role = db.role;


// mongoose connection

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    })




// adding a route handler (middleware) and important message
app.get("/", (req, res) => {
    res.json({ message: "This is part of the Cookies & Cream project" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/comment.routes")(app);
require('./app/routes/image.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// register new users (roles)

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}