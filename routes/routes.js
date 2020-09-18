const express = require("express");

const router = express.Router();

var ObjectId = require("mongodb").ObjectId;

module.exports = (app) => {
  // two routes for views

  router.get("/allfilms", (req, res) => {
    app
      .set("myDb")
      .collection("filmsCollection")
      //get all films cf. select *
      //.find({})
      //Get all films over £5 (note- stored as string)
      //.find({filmPrice: {$gt:"5"}})
      //Get all PG films with prices above £6
      .find({ filmCertificate: "PG", filmPrice: { $gt: "6.00" } })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        return res.render("films", { title: "All Films", films: docs });
      });
  });

  router.get("/film/:filmID", (req, res) => {
    //Note that let is another way of defining variables. Introduced with ES6.
    //Let has block-scope (only occurs within those curly braces)
    //Var has function scope, works within whole function
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        return res.render("oneFilm", { title: "Some Title", film: docs[0] });
      });
  });

  // two routes for JSON

  router.get("/api/allfilms", (req, res) => {
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        res.json(docs);
      });
  });

  router.get("/api/film/:filmID", (req, res) => {
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  });

  //Can use router.post for post requests
  //Can also use reouter.put & reouter.delete
  router.post("/api/film/:filmID", (req, res) => {
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);
    app
      .set("myDb")
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  });

  return router;
};
