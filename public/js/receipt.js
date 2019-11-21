const urlParams = new URLSearchParams(window.location.search);
const receiptId = urlParams.get('r');

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
                        <div class="col-md-2"></div>
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
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    });
}

function retrieveTicket(ticketId) {
    $.ajax({
        url: "/api/tickets/" + ticketId,
        type: 'GET',
        success: function(responseJSON) {
            displayCartItems(responseJSON.entries);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(`${xhr.status}: ${thrownError}`);
            $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
        }
    });
}

$(document).ready(function() {
    retrieveTicket(receiptId);
    getUser();

    $("#continue").on("click", function(event) {
        window.location.href = "/shop";
    });
});