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

function init() {
    getAllBeers();

    $("div").on("click", "#selectBeer", function(e) {
        let beer = $(this).find("h4")["0"].innerText;
        console.log(beer);
        let url = "detail.html?beer=" + beer;
        window.location.href = url;
    })
}

init();