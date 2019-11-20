function getAllBeers() {
    fetch("/api/beers")
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
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
                                <div class="col-md-6">
                                    
                                    <button type="button" class="btn btn-success">
                                        Buy
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    
                                    <button type="button" class="btn btn-primary">
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

function getUser() {
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
                            $("#logout").show();

                            $("#logout").on("click", function(event) {
                                event.preventDefault();
                                $.ajax({
                                    url: "/api/users/logout",
                                    type: 'POST',
                                    success: function(responseJSON) {
                                        window.location.reload(true);
                                    }
                                });
                            });
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
        console.log(beer);
        let url = "/static/detail.html?beer=" + beer;
        window.location.href = url;
    });
}

init();