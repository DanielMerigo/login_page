const express = require("express");
const router = express.Router();
const db = require("../database/connect.js");

// ---------------- SELECT ------------------
router.get("/", async function(req, res, next) {                
    try {
    const results = await db.query("SELECT * FROM passwords");       //Stars the QUERY for SQL commands
    return res.json(results.rows);                                 //Returns what was selected
    } catch (err) {                                                //For error
    return next(err);      
    }
   });

   // ---------------- SELECT ONE------------------
router.get("/:id", async function(req, res, next) {                
    try {
    const results = await db.query("SELECT * FROM passwords WHERE id=$1", //Stars the QUERY for SQL commands
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
    "INSERT INTO passwords (password, id_client) VALUES ($1,$2) RETURNING *",
    [req.body.password, req.body.id_client]
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
    "UPDATE passwords SET password=$1, id_client=$2 WHERE id=$3 RETURNING *",
    [req.body.password, req.body.id_client, req.params.id]
    );
    return res.json(result.rows[0]);                //Returns what was updated
    } catch (err) {
    return next(err);
    }
   });

   // ----------- DELETE -----------------------
router.delete("/:id", async function(req, res, next) {
    try {
    const result = await db.query("DELETE FROM passwords WHERE id=$1", [
    req.params.id
    ]);
    return res.json({ message: "Deleted" });       
    } catch (err) {
    return next(err);
    }
   });
   
   module.exports = router;