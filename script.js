// =======================
// SHOW / HIDE PAGES
// =======================

function showRegister(){

    document.getElementById("loginPage")
    .classList.add("hidden");

    document.getElementById("registerPage")
    .classList.remove("hidden");

}

function showLogin(){

    document.getElementById("registerPage")
    .classList.add("hidden");

    document.getElementById("loginPage")
    .classList.remove("hidden");

}


// =======================
// LOAD STATES
// =======================

const state =
document.getElementById("state");

const lga =
document.getElementById("lga");

Object.keys(statesAndLGAs).forEach(function(item){

    let option =
    document.createElement("option");

    option.value = item;
    option.textContent = item;

    state.appendChild(option);

});

state.addEventListener("change",function(){

    lga.innerHTML =
    '<option value="">Select Local Government</option>';

    statesAndLGAs[this.value].forEach(function(item){

        let option =
        document.createElement("option");

        option.value = item;
        option.textContent = item;

        lga.appendChild(option);

    });

});


// =======================
// PASSPORT PREVIEW
// =======================

const passport =
document.getElementById("passport");

const preview =
document.getElementById("preview");

passport.addEventListener("change",function(){

    let file = this.files[0];

    if(!file) return;

    if(file.size > 500000){

        alert("Passport must not exceed 500KB");

        this.value = "";

        return;

    }

    let reader =
    new FileReader();

    reader.onload = function(e){

        preview.src = e.target.result;

        preview.style.display = "block";

    }

    reader.readAsDataURL(file);

});


// =======================
// REGISTER USER
// =======================

document.getElementById("regForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    let password =
    document.getElementById("regPassword").value;

    let confirm =
    document.getElementById("confirmPassword").value;

    if(password !== confirm){

        alert("Passwords do not match!");
        return;

    }

    let student = {

        surname:
        document.getElementById("surname").value,

        username:
        document.getElementById("username").value,

        password: password

    };

    localStorage.setItem(
        "student",
        JSON.stringify(student)
    );

    alert("Registration Successful!");

    this.reset();

    showLogin();

});


// =======================
// LOGIN
// =======================

document.getElementById("loginForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    let saved =
    JSON.parse(localStorage.getItem("student"));

    if(!saved){

        alert("No account found. Register first.");
        return;

    }

    let username =
    document.getElementById("loginUsername").value;

    let password =
    document.getElementById("loginPassword").value;

    if(

        username === saved.username &&
        password === saved.password

    ){

        document.getElementById("loginPage")
        .classList.add("hidden");

        document.getElementById("dashboard")
        .classList.remove("hidden");

        document.getElementById("studentName")
        .innerHTML =
        "Welcome " + saved.surname;

    }

    else{

        alert("Wrong username or password");

    }

});


// =======================
// LOGOUT
// =======================

function logout(){

    document.getElementById("dashboard")
    .classList.add("hidden");

    document.getElementById("loginPage")
    .classList.remove("hidden");

}
