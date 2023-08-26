// Import Our Libraries
let express = require("express");
let path = require("path");

// Server Paths
let clientDirectory = path.join(__dirname, "../Client/")
let publicDirectory = path.join(__dirname, "../Public/")

// Create a Server and Configure
let app = express();
app.use(express.static(publicDirectory))

// Make routes for Website
app.get("/", (req, res) => {
    res.sendFile(clientDirectory+ "Home.html");
})

// Listen Our Server on Port 80
app.listen(80)