// Toggle Between Sign In and Sign Up Pages by using a Integer
let activeAccountBox = 0;
function toggleAccountBox(clicker){
    if(activeAccountBox == 0 && clicker == 1){
        document.getElementById("loginSelectButton").className = "";
        document.getElementById("signUpSelectButton").className = "active"
        document.getElementById("signInBox").style.display = "none";
        document.getElementById("signUpBox").style.display = "block";
        activeAccountBox = 1;
    }
    else if(activeAccountBox == 1 && clicker == 0){
        document.getElementById("loginSelectButton").className = "active";
        document.getElementById("signUpSelectButton").className = "";
        document.getElementById("signInBox").style.display = "block";
        document.getElementById("signUpBox").style.display = "none";
        activeAccountBox = 0;
    }
}

// Sign In a New User
function signInUser(){

    // Get the Form Data from the DOM
    let userName = document.getElementById("userNameLogin").value;
    let userPass = document.getElementById("userPassLogin").value;

    // Create A Form Data for the User
    let loginFormData = new FormData();
    loginFormData.append("username", userName);
    loginFormData.append("password", userPass);

    // Check If Both are Empty or Not
    if(userName.length == 0 || userPass.length == 0){
        window.alert("Not Complete")
    }
    // Send the Login Request to the Server
    else{
        fetch("/LoginAPI", {
            method: "POST",
            body: loginFormData
        }).then(res => res.text()).then(data => {
            // If OK response from Server Move to Chat Page because we are Login Now
            if(data == "OK"){
                window.location = "/Chat";
            }
            else{
                // Show Error Message to ther User
                window.alert(data);
            }
        })
    }
}

// Sign Up a new User
function signUpUser(){

    // Get Data from the form
    let username = document.getElementById("userNameSignUp").value;
    let password = document.getElementById("userPassSignUp").value;
    let confirmPassword = document.getElementById("userPassConfirmSignUp").value;;
    let profilePic = document.getElementById("userProfilePictureSignUp");
    let agreeConditions = document.getElementById("agreeCheckBox").checked;

    // Check Given input data if Correct or not
    if(username.length == 0 || password.length == 0 || confirmPassword.length == 0){
        window.alert("Please complete the form!");
    }
    else if(password != confirmPassword){
        window.alert('Please Enter Same password for confirm.');
    }
    else if(profilePic.files.length == 0){
        window.alert("Please select your Profile Picture");
    }
    else if(agreeConditions == false){
        window.alert("Please agree to our terms and conditions");
    }

    // All Checks are cleared. Now Submit User Data
    else{

        // Create Form Data
        let signupForm = new FormData();
        signupForm.append("username", username);
        signupForm.append("password", password);
        signupForm.append("profilePicture", profilePic.files[0]);

        // Send data to the Server
        fetch("/RegistorAPI", {
            method: "POST",
            body: signupForm
        }).then(res => res.text()).then(data => {
            // If OK response from Server Move to Chat Page because we are Login Now
            if(data == "OK"){
                window.location = "/Chat";
            }
            else{
                // Show Error Message to ther User
                window.alert(data);
            }
        })
    }
    
}