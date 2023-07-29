module.exports = app => {
    const signs = require("../controllers/sign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new sign
    router.post("/", signs.create);
  
    // Retrieve all signs
    router.get("/", signs.findAll);
  
    // Retrieve a single sign with id
    router.get("/:id", signs.findOne);

    // Retrieve signature count
    router.post("/count", signs.verifyCount);
  
    // Update a sign with id
    // router.put("/:id", signs.update);
  
    // Delete a sign with id
    // router.delete("/:id", signs.delete);
  
    app.use('/api/signs', router);
  };