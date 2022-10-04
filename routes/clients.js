const express = require("express");
const router = express.Router();
const db = require("../database/connect.js");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                
    try {
    const results = await db.query("SELECT * FROM clients");       //Stars the QUERY for SQL commands
    return res.json(results.rows);                                 //Returns what was selected
    } catch (err) {                                                //For error
    return next(err);      
    }
   });

   // ---------------- SELECT ONE------------------
router.get("/:id", async function(req, res, next) {                
    try {
    const results = await db.query("SELECT * FROM clients WHERE id=$1", //Stars the QUERY for SQL commands
     [req.params.id]);                                            //Store the data   
    return res.json(results.rows);                                //Returns what was selected
    } catch (err) {                                               //For error
    return next(err);      
    }
   });

    // -------------- INSERT --------------------------
router.post("/", async function(req, res, next) {
    try {
    const result = await db.query(
    "INSERT INTO clients (name, email, birth_date, cpf) VALUES ($1,$2,$3,$4) RETURNING *",
    [req.body.name, req.body.email, req.body.birth_date, req.body.cpf]
    );
    return res.json(result.rows[0]);    //Returns what was inserted
    } catch (err) {
    return next(err);
    }
   });


   // ------------- UPDATE ----------------------
router.patch("/:id", async function(req, res, next) {
    try {
    const result = await db.query(
    "UPDATE clients SET name=$1, email=$2, birth_date=$3, cpf=$4 WHERE id=$5 RETURNING *",
    [req.body.name, req.body.email, req.body.birth_date, req.body.cpf, req.params.id]
    );
    return res.json(result.rows[0]);                //Returns what was updated
    } catch (err) {
    return next(err);
    }
   });

   // ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
    try {
    const result = await db.query("DELETE FROM clients WHERE id=$1", [
    req.params.id
    ]);
    return res.json({ message: "Deleted" });       
    } catch (err) {
    return next(err);
    }
   });
   
   module.exports = router;