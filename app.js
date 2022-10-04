const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const clientsRoutes = require("./routes/clients.js");
const passwordRoutes = require("./routes/password.js")

// --------- URL FOR CLIENTS -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/clients", clientsRoutes);

// --------- URL FOR PASSWORDS -----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/passwords", passwordRoutes);


app.use(function(req, res, next) {
 let err = new Error("Not Found");
 err.status = 404;
 next(err);
});

if (app.get("env") === "development") {
 app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.send({
 message: err.message,
 error: err
 });
 });
}

// -------- CONEXÃO DO EXPREESS PARA FAZER UM LOCALHOST ------------
app.listen(3333, function() {                       
 console.log("Server starting on port 3333!");      
});
