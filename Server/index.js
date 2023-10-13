// Import Our Libraries
let express = require("express");
let multer = require("multer");
let path = require("path");
let cors = require("cors");
let session = require("express-session")

// Store User Data In this Data Structure
let userData = [

]

// Server Paths
let clientDirectory = path.join(__dirname, "../Client/")
let publicDirectory = path.join(__dirname, "../Public/")

// Initialize Our Multer Form Praser
let multerUploadProfilePics = multer({
    dest: "../ProfilePics/"
});

// Create a Server and Configure
let app = express();
app.use(session({
    secret: "bkhGFTY%REY%^$",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(publicDirectory))
app.use(cors({
    "origin": "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make routes for Website

// Main Page
app.get("/", (req, res) => {
    res.redirect("/Home")
})

// Chat Pages
app.get("/Chat", (req, res) => {
    res.redirect("/Login");
})

// Sign In New User
app.post("/LoginAPI", multerUploadProfilePics.none(), (req, res) => {
    console.log(req.body)
})

// Create a new User
app.post("/RegistorAPI", multerUploadProfilePics.single("profilePicture"), (req, res) => {

    // Check if Data or Profile Picture is not Null
    if (req.body != null && req.file != null) {

        //Get Data from our Request
        let username = req.body.username;
        let password = req.body.password;
        let fileLocation = req.file.path;

        // Check if User Already Exist or Not
        let isUserExist = false;
        userData.forEach(e => {
            if(e.username == username){
                isUserExist = true;
            }
        })

        // If User Exist
        if(isUserExist){
            console.log("New User Registration. Failed!");
            res.send("Error User Already Exist!");
        }
        // This is a new User
        else{

            // Save the Data into Our Data Structure
            let newUser = {
                "username" : username,
                "password" : password,
                "profilePic": fileLocation
            }

            // Save this User
            userData.push(newUser);
            console.log("New User Registered: " + newUser.username);

            // Save the New User Session 
            req.session.isLogin = true;
            req.session.username = newUser.username;
            req.session.password = newUser.password;

            // Send ok Status to the Client
            res.send("OK");
            
        }
    }
    else {
        res.send("Error: Invalid Request from Client.");
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