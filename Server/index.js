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
let profilePics = path.join(__dirname, "../ProfilePics/")

// Initialize Our Multer Form Praser
let multerUploadProfilePics = multer({
    dest: "../ProfilePics/"
});

// Create a Server and Configure
let app = express();
app.set('view engine', 'pug')
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

// Logout the User
app.get("/Logout", (req, res) => {

    // Destroy the user session with the server
    req.session.destroy();

    // Send User Back to the Home Page
    res.redirect("/Home");
})

app.get("/GetPicture", (req, res) => {

    // Check If User is Login or Not
    if (req.session.isLogin) {

        // Check for User in the Database
        let isLoginAuth = false;
        let i = 0;
        for (i = 0; i < userData.length; i++) {
            // Check User Name and Password
            if (userData[i].username == req.session.username && userData[i].password == req.session.password) {
                isLoginAuth = true;
                break;
            }
        }

        // User Login Sucessfully
        if (isLoginAuth) {
            res.sendFile(profilePics + userData[i]["profilePic"]);
        }

        // Invalid User Send Back to Login
        else {
            // Clear Session
            req.session.destroy();

            // Send Back to Login Page
            res.redirect("/Login");
        }
    }
    // If User Not Login Redirect to the Login Page
    else {
        res.redirect("/Login");
    }

})

// Chat Pages
app.get("/Chat", (req, res) => {

    // Check If User is Login or Not
    if (req.session.isLogin) {

        // Check for User in the Database
        let isLoginAuth = false;
        let i = 0;
        for (i = 0; i < userData.length; i++) {
            // Check User Name and Password
            if (userData[i].username == req.session.username && userData[i].password == req.session.password) {
                isLoginAuth = true;
                break;
            }
        }

        // User Login Sucessfully
        if (isLoginAuth) {

            // Send User to the Chat Page
            res.render(clientDirectory + "/Chat.pug", {
                user: userData[i].username,
            })
            
        }

        // Invalid User Send Back to Login
        else {
            // Clear Session
            req.session.destroy();

            // Send Back to Login Page
            res.redirect("/Login");
        }
    }
    // If User Not Login Redirect to the Login Page
    else {
        res.redirect("/Login");
    }
})

// Sign In New User
app.post("/LoginAPI", multerUploadProfilePics.none(), (req, res) => {

    //Get Data from our Request
    let username = req.body.username;
    let password = req.body.password;

    // Check if User Already Exist or Not
    let isUserExist = false;
    userData.forEach(e => {
        if (e.username == username && e.password == password) {
            isUserExist = true;
        }
    })

    // If User Exist
    if (isUserExist) {

        // Save the New User Session 
        req.session.isLogin = true;
        req.session.username = username;
        req.session.password = password;

        // Send ok Status to the Client
        res.send("OK");

    }
    else {
        // Send Message for Invalid User name and Password
        res.send("Invalid User name and Password!");
    }
})

// Create a new User
app.post("/RegistorAPI", multerUploadProfilePics.single("profilePicture"), (req, res) => {

    // Check if Data or Profile Picture is not Null
    if (req.body != null && req.file != null) {

        //Get Data from our Request
        let username = req.body.username;
        let password = req.body.password;
        let fileLocation = req.file.filename;

        // Check if User Already Exist or Not
        let isUserExist = false;
        userData.forEach(e => {
            if (e.username == username) {
                isUserExist = true;
            }
        })

        // If User Exist
        if (isUserExist) {
            console.log("New User Registration. Failed!");
            res.send("Error User Already Exist!");
        }
        // This is a new User
        else {

            // Save the Data into Our Data Structure
            let newUser = {
                "username": username,
                "password": password,
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