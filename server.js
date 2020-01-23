var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var BOOKS_COLLECTION = "books";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// books API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/books"
 *    GET: finds all books
 *    POST: creates a new Book
 */

app.get("/api/books", function(req, res) {
  db.collection(BOOKS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get books.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/books", function(req, res) {
  var newBook = req.body;
  newBook.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(BOOKS_COLLECTION).insertOne(newBook, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new book.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/api/books/:id", function(req, res) {
  db.collection(BOOKS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get book");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/books/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BOOKS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update book");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/books/:id", function(req, res) {
  db.collection(BOOKS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete book");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});