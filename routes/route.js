const express = require("express");
const router = express.Router();
const multer = require("multer");
var path = require("path");
const mongoose = require("mongoose");

const Location = require("../models/location");
const Image = require("../models/locationImage");

router.get("/location", (req, res, next) => {
  Location.find(function (err, menu) {
    res.json(menu);
  });
});

router.get("/album/:locationId", (req, res, next) => {
  Location.findOne(
    { locationId: req.params.locationId },
    function (err, location) {
      res.json(location);
    }
  );
});

router.get("/location/:type/:tag/:location", (req, res, next) => {
  var type = req.params.type == "any" ? new RegExp(".*") : req.params.type;
  var tag = req.params.tag == "any" ? new RegExp(".*") : req.params.tag;
  var location =
    req.params.location == "any" ? new RegExp(".*") : req.params.location;

  Location.find(
    { type: type, tags: tag, location: location },
    function (err, location) {
      setTimeout(function () {
        res.json(location);
      }, 2000);
    }
  );
});

/*
router.get('/location/:locationId/:tag', (req, res, next)=>{
    Location.findOneAndUpdate({locationId: req.params.locationId}, { $push: { tags: req.params.tags } }, (err, loc)=>{
        if(err){
            console.log(err);
        }
    });
});*/

router.post("/location", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(req.file);
      let newItem = new Location({
        locationId: req.body.locationId,
        name: req.body.name,
        address: req.body.address,
        location: req.body.location,
        timmings: req.body.timmings,
        images: new Array(),
        coverImage: req.file.filename,
        type: req.body.type,
        tags: new Array(),
      });

      newItem.save((err, contact) => {
        if (err) {
          res.json({ msg: "failed to add" });
        } else {
          res.json({ msg: "successful" });
        }
      });
      console.log(newItem);
    }
  });
});

router.delete("/location/:id", (req, res, next) => {
  Location.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("photo");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(req.file);

      Location.findOneAndUpdate(
        { locationId: req.body.locationId },
        { $push: { images: req.file.filename } },
        (err, loc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
});

router.post("/addTag", (req, res) => {
  Location.findOneAndUpdate(
    { locationId: req.body.locationId },
    { $push: { tags: req.body.tag } },
    (err, loc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(loc);
      }
    }
  );
});

module.exports = router;
