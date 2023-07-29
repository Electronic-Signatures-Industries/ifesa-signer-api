const db = require("../models");
const Sign = db.signs;
const User = db.users;

function getNameAndIdDoc(signatureString) {
  const indexName1 = signatureString.indexOf('[f] nombre ')
  const indexName2 = signatureString.indexOf(' - id')
  const name = signatureString.substring(indexName1 + '[f] nombre '.length, indexName2).toUpperCase()

  const indexId1 = signatureString.indexOf(' - id')
  const indexId2 = signatureString.indexOf('ou=')
  const idDoc = signatureString.substring(indexId1 + ' - id'.length + 1, indexId2 - 1).toUpperCase()

  return { name, idDoc }
}

exports.verifyCount = async (req, res) => {
  if (!req.body.str) {
    return res.status(400).send({
      message: "Data can not be empty!"
    });
  }

  const signatureData = getNameAndIdDoc(req.body.str.toLowerCase());

  var condition = { 
    name: signatureData.name , 
    idDoc: signatureData.idDoc, 
  };
  console.log('condition', condition)

  try{
    const count = await Sign
        .find(condition)
        .countDocuments();

    let valid = true;

    if (count > 3) {
      const user = await User
        .find(condition);
      if(user.length === 0){
        valid = false;
      }
    }
    
    res.send({ valid });
  } catch(err) {
    res.status(500).send({
      message: 
      err.message || "Some error occurred while retrieving signs."
    });
  }
}

// Create and Save a new Sign
exports.create = (req, res) => {
    // Validate request
    if (!req.body.signatureString) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const data = getNameAndIdDoc(req.body.signatureString.toLowerCase());

      // Create a Sign
      const sign = new Sign(data);
    
      // Save Sign in the database
      sign
        .save(sign)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Sign."
          });
        });
};

// Retrieve all Signs from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    
    Sign
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving signs."
            });
        });
  
};

// Find a single Sign with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Sign
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found sign with id " + id });
            else 
                res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving sign with id=" + id });
        });
};

// Update a Sign by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Sign.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update sign with id=${id}. Maybe sign was not found!`
            });
          } else res.send({ message: "Sign was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating sign with id=" + id
          });
        });
};

// Delete a Sign with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Sign.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete sign with id=${id}. Maybe sign was not found!`
          });
        } else {
          res.send({
            message: "Sign was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete sign with id=" + id
        });
      });
  
};