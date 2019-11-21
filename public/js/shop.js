function getAllBeers() {
    fetch("/api/beers")
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            beers = resJSON;
            let len = resJSON.length;
            for(let i = 0; i < len; i++) {
                $("#beerCatalog").append(
                    `<div class="col-md-4">
                        <div class="row" id="selectBeer">
                            <div class="col-md-12" id="name">
                                <h4>
                                    ${resJSON[i].Nombre}
                                </h4>
                            </div>
                            <div class="col-md-12">
                                <img alt="Bootstrap Image Preview" src=${resJSON[i].fotoURL} height="200" width=160"/>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h5>
                                            Style: ${resJSON[i].Estilo}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="row">
                                <div id="beerName" hidden>${resJSON[i].Nombre}</div>
                                <div class="col-md-6">
                                    <button type="button" class="btn btn-success" id="beerBtnBuy">
                                        Buy
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    
                                    <button type="button" class="btn btn-primary" id="beerBtnAdd">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <hr style="height: 1px; background-color: black"/>
                        </div>
                    </div>`);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function addToShoppingCart(beerName) {
    console.log("1. " + beerName);
    fetch("/api/beers/" + beerName)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(beerResJSON => {
            var data = {
                beerId: beerResJSON._id
            }
            console.log(data);
            $.ajax({
                url: "/api/cart",
                type: 'GET',
                success: function(sessionCartJSON) {
                    console.log(sessionCartJSON);
                    if (sessionCartJSON.ok || sessionCartJSON.cart) {
                        fetch("/api/cart/" + sessionCartJSON.cart, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers:{
                              'Content-Type': 'application/json'
                            }})
                            .then(res => {
                                if(res.ok) {
                                    return res.json();
                                }
                                throw new Error(res.statusText);
                            })
                            .then(resJSON => {
                                alert("Beer added successfuly!");
                            })
                            .catch(err => {
                                $("#error").text(err);
                                $("#error").css("visibility", "visible");
                                console.log(err);
                            });
                    } else {
                        throw new Error("Couldn't retrieve session. Running as user");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(`${xhr.status}: ${thrownError}`);
                    $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
                }
            });
        })
        .catch(err => {
            $("#error").text(err);
            $("#error").css("visibility", "visible");
            console.log(err);
        });
}

function getUser() {
    $("#logout").on("click", function(event) {
        event.preventDefault();
        if ($(this).val() == "Log Out") {
            $.ajax({
                url: "/api/users/logout",
                type: 'POST',
                success: function(responseJSON) {
                    window.location.reload(true);
                }
            });
        } else {
            window.location.href = "/";
        }
    });

    var email;
    $.ajax({
        url: "/api/session",
        type: 'GET',
        success: function(responseJSON) {
            if (responseJSON.ok || responseJSON.email) {
                $.ajax({
                    url: "/api/users/" + responseJSON.email,
                    type: 'GET',
                    success: function(responseJSON) {
                        if (responseJSON.email) {
                            $("#user-welcome").html("Welcome, " + responseJSON.email);
                            $("#logout").val("Log Out");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(`${xhr.status}: ${thrownError}`);
                    }
                });
            } else {
                throw new Error("Couldn't retrieve session. Running as user");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(`${xhr.status}: ${thrownError}`);
            $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
        }
    });
}

function init() {
    getUser();
    getAllBeers();

    $("#beerCatalog").on("click", "#selectBeer", function(e) {
        let beer = $(this).find("h4")["0"].innerText;

        let url = "/static/detail.html?beer=" + beer;
        window.location.href = url;
    });

    $("#beerCatalog").on("click", "#beerBtnBuy", function(e) {
        let beer = $(this).parent().parent().find("#beerName").html();

        var data = {
            beer: beer,
            quantity: 1
        };

        let settings = {
            method : 'post',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(data)
        };

        fetch("/api/tickets/buy", settings)
            .then( response => {
                if (response.ok || response.ticket) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                window.location.href = "/static/receipt.html?r=" + responseJSON.ticket;
            })
            .catch(err => {
                console.log(err);
            })
    });

    $("#beerCatalog").on("click", "#beerBtnAdd", function(e) {
        let beer = $(this).parent().parent().find("#beerName").html();
        addToShoppingCart(beer);
    });


}

init();