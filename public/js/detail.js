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

function loadDetail(beer) {
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

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('beer');
    loadDetail(myParam);
    $("#backBtn").on("click", function(e) {
        e.preventDefault();
        window.history.back();
    })
}

init();