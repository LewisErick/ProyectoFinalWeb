var totals = {};

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

function displayCartItems(items) {
    items.forEach((item, ind, arr) => {
        $.ajax({
            url: "/api/beers/ind/" + item.beer,
            type: 'GET',
            success: function(beerJSON) {
                $("#cartItems").append(
                    `
                    <div class="row cart-item">
                        <div class="ind" hidden>${ind}</div>
                        <div class="index" hidden>${item._id}</div>
                        <div class="col-md-1"></div>
                        <div class="col-md-2">
                            <img alt="Bootstrap Image Preview" src="${beerJSON.fotoURL}" style="width:100%"/>
                        </div>
                        <div class="col-md-2">
                            <p class="name">${beerJSON.Nombre}</p>
                        </div>
                        <div class="col-md-1">
                            <p class="qty">${item.quantity}</p>
                        </div>
                        <div class="col-md-1">
                            <p class="price">${beerJSON.Price}</p>
                        </div>
                        <div class="col-md-2">
                            <p class="sub">${beerJSON.Price * item.quantity}</p>
                        </div>
                        <div class="col-md-2">
                            
                            <button type="button" class="btn btn-danger remove-button">
                                Remove
                            </button>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    `
                );
                totals[parseInt(ind)] = beerJSON.Price * item.quantity;

                if (ind == arr.length - 1) {
                    var total = 0;
                    for (var i = 0; i < Object.keys(totals).length; i+=1) {
                        total += parseFloat(totals[i]);
                    }
                    $("#globalTotal").html(
                        `Total: $${total}`
                    );

                    if (total > 0) {
                        $("#buy").prop( "disabled", false );
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    });
}

function retrieveCart() {
    $.ajax({
        url: "/api/cart",
        type: 'GET',
        success: function(responseJSON) {
            if (responseJSON.ok || responseJSON.cart) {
                $.ajax({
                    url: "/api/cart/" + responseJSON.cart,
                    type: 'GET',
                    success: function(itemsJSON) {
                        if (itemsJSON.ok || itemsJSON.cart) {
                            displayCartItems(itemsJSON.cart);

                            $("#cartItems").on("click", ".remove-button", function(event) {
                                event.preventDefault();
                        
                                let data = {
                                    id: $(this).parent().parent().find(".index").html(),
                                    cart: responseJSON.cart
                                }
                        
                                fetch("api/cart/items", {
                                    method: 'DELETE',
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
                                        $(this).parent().parent().remove();

                                        delete totals[parseInt($(this).parent().parent().find(".ind").html())];

                                        var total = 0;
                                        for (var i = 0; i < Object.keys(totals).length; i+=1) {
                                            total += parseFloat(totals[i]);
                                        }
                                        $("#globalTotal").html(
                                            `Total: $${total}`
                                        );

                                        if (total == 0) {
                                            $("#buy").prop( "disabled", true );
                                        } else {
                                            $("#buy").prop( "disabled", false );
                                        }
                                    })
                                    .catch(err => {
                                        $("#error").text(err);
                                        $("#error").css("visibility", "visible");
                                        console.log(err);
                                    });
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

$(document).ready(function() {
    retrieveCart();
    getUser();

    $("#buy").on("click", function(event) {
        fetch("/api/tickets", {
            method: 'POST'})
            .then( response => {
                if (response.ok || response.ticket) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                fetch("api/cart/clear", {method: 'POST'})
                    .then(clearResponse => {
                        if (clearResponse.ok || clearResponse.statusCode == 200) {
                            window.location.href = "/static/receipt.html?r=" + responseJSON.ticket;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })        
            })
            .catch(err => {
                console.log(err);
            })
    });

    $("#back").on("click", function(event) {
        event.preventDefault();
        window.location.href = "/";
    });
});