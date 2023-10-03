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
    loginFormData.append("requestType", "signin");
    loginFormData.append("username", userName);
    loginFormData.append("password", userPass);

    // Check If Both are Empty or Not
    if(userName.length == 0 || userPass.length == 0){
        window.alert("Not Complete")
    }
    // Send the Login Request to the Server
    else{
        fetch("/AccountAPI", {
            method: "POST",
            body: loginFormData
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }
}