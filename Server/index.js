// Import Our Libraries
let express = require("express");
let multer = require("multer");
let path = require("path");
let cors = require("cors");

// Server Paths
let clientDirectory = path.join(__dirname, "../Client/")
let publicDirectory = path.join(__dirname, "../Public/")

// Initialize Our Multer Form Praser
let multerUpload = multer();

// Create a Server and Configure
let app = express();
app.use(express.static(publicDirectory))
app.use(cors({
    "origin": "*"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(multerUpload.none())

// Make routes for Website

// Main Page
app.get("/", (req, res) => {
    res.redirect("/Home")
})

// Chat Pages
app.get("/Chat", (req, res) => {
    res.redirect("/Login");
})

// Create Account and Sign In New User
app.post("/AccountAPI", (req, res) => {
    console.log(req.body)

    // Get the Type of Request
    let requestType = req.body["requestType"];

    // Login Implementation
    if (requestType == "signin") {

    }

    // Sign Up a new User
    else if (requestType == "signup") {

    }

    // In Case of Invalid Request
    else {
        res.send({
            "ResponseCode": "404",
            "Message": "Invalid API Endpoint"
        })
    }
})

// Terms and Conditions Page
app.get("/Terms", (req, res) => {
    res.sendFile(clientDirectory + "Terms.html");
})

// Registration and Login Page
app.get("/Login", (req, res) => {
    res.sendFile(clientDirectory + "Login.html");
})

// Home Page
app.get("/Home", (req, res) => {
    res.sendFile(clientDirectory + "Home.html");
})

// Listen Our Server on Port 80
app.listen(80)