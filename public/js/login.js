function login(email, password) {
    let url = "/api/users/" + email;

    fetch(url)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            if(resJSON.password == password) {
                window.location.replace("/shop.html");
            } else {
                $("#error").text("Error: Incorrect email or password");
                $("#error").css("visibility", "visible");
            }

            console.log(resJSON);
        }) 
        .catch(err => {
            console.log(err);
        });
}

function init() {

    $("#loginForm").on("submit", function(e) {
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
}

init();