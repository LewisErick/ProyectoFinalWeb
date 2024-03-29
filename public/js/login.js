function login(email, password) {
    let url = "/api/users/login";

    data = {
        "email" : email,
        "password" : password
    };

    console.log(data);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }})
        .then(res => {
            console.log(res);
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            window.location.replace("/");
            console.log(resJSON);
        }) 
        .catch(err => {
            $("#error").text("Error: Incorrect email or password");
            $("#error").css("visibility", "visible");
            console.log(err);
        });
}

function register(email, password) {
    let url = "/api/users/";

    data = {
        "email" : email,
        "password" : password
    };

    console.log(data);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }})
        .then(res => {
            console.log(res);
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            $("#info").html("User registered. Please log in.");
            $("#info").show();
            console.log(resJSON);
        }) 
        .catch(err => {
            $("#error").text("Error: Incorrect email or password");
            $("#error").css("visibility", "visible");
            console.log(err);
        });
}

function init() {

    $("#loginForm #login").on("click", function(e) {
        e.preventDefault();
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();

        if(!email || !password) {
            $("#error").text("Error: Missing field!");
            $("#error").css("visibility", "visible");
        } else {
            $("#error").css("visibility", "hidden");
            login(email, password);
        }
    });

    $("#loginForm #register").on("click", function(e) {
        e.preventDefault();
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();

        if(!email || !password) {
            $("#error").text("Error: Missing field!");
            $("#error").css("visibility", "visible");
        } else {
            $("#error").css("visibility", "hidden");
            register(email, password);
        }
    });
}

console.log("login");

init();