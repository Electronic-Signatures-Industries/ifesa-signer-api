const http = require("http");
const express = require('express');
var cors = require("cors");

const app = express();

// Create a database connection
const db = require('./app/config/_db.config');

// Use body-parser to parse the request body
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

// Create routes for CRUD operations
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, IFESA Signer API' });
});

app.get('/signs', db.getSigns);
app.post('/signs', db.createSign);
app.put('/signs/:id', db.updateSign);
app.delete('/signs/:id', db.deleteSign);

// Start the server
const port = process.env.PORT || 3003;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
const server = http.createServer(app);
server.listen(port);
console.debug("Server listening on port " + port);