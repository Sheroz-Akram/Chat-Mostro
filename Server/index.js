// Import Our Libraries
let express = require("express");
let path = require("path");
let cors = require("cors");

// Server Paths
let clientDirectory = path.join(__dirname, "../Client/")
let publicDirectory = path.join(__dirname, "../Public/")

// Create a Server and Configure
let app = express();
app.use(express.static(publicDirectory))
app.use(cors({
    "origin": "*"
}));

// Make routes for Website

// Main Page
app.get("/", (req, res) => {
    res.redirect("/Home")
})

// Home Page
app.get("/Home", (req, res) => {
    res.sendFile(clientDirectory+ "Home.html");
})

// Listen Our Server on Port 80
app.listen(80)