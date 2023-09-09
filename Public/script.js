// Toggle Between Sign In and Sign Up Pages by using a Integer
let activeAccountBox = 0;
function toggleAccountBox(){
    if(activeAccountBox == 0){
        document.getElementById("loginSelectButton").className = "";
        document.getElementById("signUpSelectButton").className = "active"
        document.getElementById("signInBox").style.display = "none";
        document.getElementById("signUpBox").style.display = "block";
        activeAccountBox = 1;
    }
    else{
        document.getElementById("loginSelectButton").className = "active";
        document.getElementById("signUpSelectButton").className = "";
        document.getElementById("signInBox").style.display = "block";
        document.getElementById("signUpBox").style.display = "none";
        activeAccountBox = 0;
    }
}