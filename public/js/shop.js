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
                        <div class="row">
                            <div class="col-md-12">
                                <h4>
                                    ${resJSON[i].Nombre}
                                </h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <img alt="Bootstrap Image Preview" src=${resJSON[i].fotoURL} height="200" width=160"/>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h5>
                                            Style: ${resJSON[i].Estilo}
                                        </h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        
                                        <button type="button" class="btn btn-success">
                                            Buy
                                        </button>
                                    </div>
                                    <div class="col-md-6">
                                        
                                        <button type="button" class="btn btn-success">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                <hr style="height: 1px; background-color: black"/>
                            </div>
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
}

init();


/* <div class="col-md-4">
    <div class="row">
        <div class="col-md-12">
            <h3>
                1.1
            </h3>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
            <div class="row">
                <div class="col-md-6">
                    
                    <button type="button" class="btn btn-success">
                        Button
                    </button>
                </div>
                <div class="col-md-6">
                    
                    <button type="button" class="btn btn-success">
                        Button
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h3>
                h3. Lorem ipsum dolor sit amet.
            </h3>
        </div>
    </div>
</div> */