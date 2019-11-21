const urlParams = new URLSearchParams(window.location.search);
const beer = urlParams.get('beer');

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

function loadReviews(reviews) {
    let len = reviews.length;
    for(let i = 0; i < len; i++) {
        let url = "/api/reviews/" + reviews[i];
        fetch(url)
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then(resJSON => {
                $("#beerReviews").append(
                    `<li>
                        <div class="row">
                            <div class="col-md-12">
                                <blockquote class="blockquote">
                                    <p class="mb-0">
                                        ${resJSON.comment}
                                    </p>
                                    <p> Rating: ${resJSON.rating} </p>
                                    <footer class="blockquote-footer">
                                        ${resJSON.user}
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </li>`);
            })
    }
}

function postReview(comment, rating, user) {
    let data = {
        user : user,
        comment : comment,
        rating : rating
    }

    let settings = {
        method : 'post',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(data)
    }

    fetch("/api/reviews", settings)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            let reviewData = {
                review : resJSON.review._id
            }

            let settings = {
                method : 'put',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify(reviewData)
            }

            let url = "/api/beers/" + beer;

            fetch(url, settings)
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    } 
                    throw new Error(res.statusText);
                })
                .then(_ => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

function loadDetail() {
    let url = "/api/beers/" + beer;
    fetch(url)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJSON => {
            if(resJSON.reviews) {
                loadReviews(resJSON.reviews);
            }

            $("#beerName").text(resJSON.Nombre);
            console.log(resJSON);
            $("#beerDetailImg").attr({"src": resJSON.fotoURL, "height":200, "width":160});
            $("#style").html(`<b>Style: </b> ${resJSON.Estilo}`);
            $("#brewery").html(`<b>Brewery: </b> ${resJSON.Cervecería}`);
            $("#origin").html(`<b>Origin: </b> ${resJSON.Origen}`);
            if(!resJSON.IBU) {
                $("#ibu").html(`<b>IBU: </b> -`);
            } else {
                $("#ibu").html(`<b>IBU: </b> ${resJSON.IBU}`);
            }

            if(!resJSON.SRM) {
                $("#srm").html(`<b>SRM: </b> -`);
            } else {
                $("#srm").html(`<b>SRM: </b> ${resJSON.SRM}`);
            }

            if(!resJSON.ABV) {
                $("#abv").html(`<b>ABV: </b> -`);
            } else {
                $("#abv").html(`<b>ABV: </b> ${resJSON.ABV}`);
            }
        })
        .catch(err => {
            console.log(err);
        })
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
    loadDetail();
    getUser();

    $("#backBtn").on("click", function(e) {
        e.preventDefault();
        window.history.back();
    });

    $("#beerRating").on("change", function(e) {
        $("#showRating").val($("#beerRating").val()/10);
    });

    $("#newReview").on("submit", function(e) {
        e.preventDefault();
        let comment = $("#reviewComment").val();
        let rating = $("#beerRating").val()/10;
        let user = "test5@test.com";

        postReview(comment, rating, user);
    });

    $("#beerBtnAdd").on("click", function(e) {
        addToShoppingCart($("#beerName").text());
    });
}

init();