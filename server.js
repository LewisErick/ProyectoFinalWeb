
let express = require( "express" );
let morgan = require( "morgan" );
let mongoose = require( "mongoose" );
let bodyParser = require( "body-parser" );
let { UserList, PaymentMethodList, ProviderList, BeerList, TicketList, ReviewList, ShoppingCartList } = require('./model');
const {DATABASE_URL, PORT} = require('./config');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const bcrypt = require('bcrypt');
const saltRounds = 10;

let app = express();
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use('/static', express.static('public'));
app.use( morgan( "dev" ) );

mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(session({
    secret: 'my-secret',
    resave: false,
	saveUninitialized: true,
	maxAge: 1000 * 60,
    store: new MongoStore({ mongooseConnection: db })
}));

// Routes

app.get("/", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	sess = req.session;
	if (sess.email) {
		res.sendFile("shop.html", {root: "public"});
	} else {
		res.sendFile("login.html", {root: "public"});
	}
})

app.get("/shop", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	res.sendFile("shop.html", {root: "public"});
});

app.get("/cart", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	res.sendFile("cart.html", {root: "public"});
});

// API

app.get( "/api/beers", ( req, res, next ) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	BeerList.get()
		.then( beers => {
			return res.status( 200 ).json( beers );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/beers", jsonParser, ( req, res, next ) => {
	let newBeer = req.body;
	BeerList.post(newBeer)
		.then( beer => {
			return res.status( 201 ).json({
				message : "Beer added to database.",
				status : 201,
				beer : beer
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});

});

app.put( "/api/beers/:beer", jsonParser, ( req, res, next ) => {
	let beerName = req.params.beer;

	if ( !beerName ){
		res.statusMessage = "Missing 'beer' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'beer' field in params!",
			status : 406
		});
	}

	BeerList.addReview(beerName, req.body.review)
		.then( beer => {
			return res.status( 201 ).json({
				message : "Review added to beer",
				status : 201,
				beer : beer
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get("/api/beers/ind/:id", (req, res, next) => {
	if (!req.params.id) {
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	BeerList.get_by_id(req.params.id)
		.then( beer => {
			return res.status( 200 ).json( beer );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/beers/:name", ( req, res, next ) => {
	let name = req.params.name;
	if ( !name ){
		res.statusMessage = "Missing 'name' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'name' field in params!",
			status : 406
		});
	}

	BeerList.get_by_name(name)
		.then( beer => {
			return res.status( 200 ).json( beer );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete( "/api/beers/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	BeerList.delete(id)
		.then( beer => {
			return res.status( 200 ).json( beer );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/tickets", ( req, res, next ) => {
	TicketList.get()
		.then( tickets => {
			return res.status( 200 ).json( tickets );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/tickets", jsonParser, ( req, res, next ) => {
	let newTicket = req.body;
	TicketList.post(newTicket)
		.then( ticket => {
			return res.status( 201 ).json({
				message : "Ticket added to database.",
				status : 201,
				ticket : ticket
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.put( "/api/tickets/:id", jsonParser, ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	TicketList.put(id, req.body.newValue)
		.then( ticket => {
			return res.status( 201 ).json({
				message : "Ticket updated",
				status : 201,
				ticket : ticket
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get( "/api/tickets/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	TicketList.get_by_id(id)
		.then( ticket => {
			return res.status( 200 ).json( ticket );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete( "/api/tickets/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	TicketList.delete(id)
		.then( ticket => {
			return res.status( 200 ).json( ticket );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/reviews", ( req, res, next ) => {
	ReviewList.get()
		.then( reviews => {
			return res.status( 200 ).json( reviews );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/reviews", jsonParser, ( req, res, next ) => {
	let newReview = req.body;
	ReviewList.post(newReview)
		.then( review => {
			return res.status( 201 ).json({
				message : "Review added to database.",
				status : 201,
				review : review
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.put( "/api/reviews/:id", jsonParser, ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ReviewList.put(id, req.body.newValue)
		.then( review => {
			return res.status( 201 ).json({
				message : "Review updated",
				status : 201,
				review : review
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get( "/api/reviews/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ReviewList.get_by_id(id)
		.then( review => {
			return res.status( 200 ).json( review );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete( "/api/reviews/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ReviewList.delete(id)
		.then( review => {
			return res.status( 200 ).json( review );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/users", ( req, res, next ) => {
	UserList.get()
		.then( users => {
			return res.status( 200 ).json( users );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/users", jsonParser, ( req, res, next ) => {
	let newUser = req.body;

	bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
		if (err) {
			return res.status(500).json(err);
		} else {
			newUser.password = hash;

			// Create the unique shopping cart that belongs to the user.
			ShoppingCartList.post({})
			.then( shoppingCart => {
				newUser["shoppingCart"] = shoppingCart;
				UserList.post(newUser)
					.then( user => {
						return res.status( 201 ).json({
							message : "User added to database.",
							status : 201,
							user : user
						});
					})
					.catch( error => {
						res.statusMessage = "Something went wrong with the DB. Try again later.";
						return res.status( 500 ).json({
							status : 500,
							message : "Something went wrong with the DB. Try again later.",
							err: error
						})
					});
			})
			.catch( error => {
				res.statusMessage = "Something went wrong with the DB. Try again later.";
				return res.status( 500 ).json({
					status : 500,
					message : "Something went wrong with the DB. Try again later.",
					err: error
				})
			});
		}
	});
});

app.put( "/api/users/:id", jsonParser, ( req, res, next ) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	UserList.put(id, req.body.newValue)
		.then( user => {
			return res.status( 201 ).json({
				message : "User updated",
				status : 201,
				user : user
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get("/api/users/:id", ( req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	sess = req.session;

	if (sess.email == req.params.id) {
		UserList.get_by_id(sess.email)
			.then( user => {
				return res.status( 200 ).json( user );
			})
			.catch( error => {
				res.statusMessage = "Something went wrong with the DB. Try again later.";
				return res.status( 500 ).json({
					status : 500,
					message : "Something went wrong with the DB. Try again later."
				})
			});	
	}
});

app.post( "/api/users/login", jsonParser, ( req, res, next ) => {
	let email = req.body.email;

	if ( !email ){
		res.statusMessage = "Missing 'email' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'email' field in params!",
			status : 406
		});
	}

	UserList.get_by_email(email)
		.then( user => {
			bcrypt.compare(req.body.password, user.password, function(err, compRes) {
				if (compRes) {
					sess = req.session;
					sess.email = user._id;
					sess.cart = user.shoppingCart._id;

					return res.status(200).json( user );
				} else {
					return res.status(401).json("Incorrect password.");
				}
			});
		})
		.catch( error => {
			console.log(error);
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post("/api/users/logout", (req, res, next) => {
	console.log("Log out");
	req.session.destroy();

	return res.status(200).json("Successful log out.");
});

app.delete( "/api/users/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	if (session.email == id) {
		session.destroy();
	}

	UserList.delete(id)
		.then( user => {
			ShoppingCartList.delete(user.shoppingCart._id)
				.then(cart => {
					return res.status( 200 ).json( { user: user, cart: cart } );
				})
				.catch( error => {
					res.statusMessage = "Something went wrong with the DB. Try again later.";
					return res.status( 500 ).json({
						status : 500,
						message : "Something went wrong with the DB. Try again later."
					})
				});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/providers", ( req, res, next ) => {
	ProviderList.get()
		.then( providers => {
			return res.status( 200 ).json( providers );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/providers", jsonParser, ( req, res, next ) => {
	let newProvider = req.body;
	ProviderList.post(newProvider)
		.then( provider => {
			return res.status( 201 ).json({
				message : "Provider added to database.",
				status : 201,
				provider : provider
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.put( "/api/providers/:id", jsonParser, ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ProviderList.put(id, req.body.newValue)
		.then( provider => {
			return res.status( 201 ).json({
				message : "Provider updated",
				status : 201,
				provider : provider
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get( "/api/providers/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ProviderList.get_by_id(id)
		.then( provider => {
			return res.status( 200 ).json( provider );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete( "/api/providers/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	ProviderList.delete(id)
		.then( provider => {
			return res.status( 200 ).json( provider );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get( "/api/payments", ( req, res, next ) => {
	PaymentMethodList.get()
		.then( payments => {
			return res.status( 200 ).json( payments );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post( "/api/payments", jsonParser, ( req, res, next ) => {
	let newPaymentMethod = req.body;
	PaymentMethodList.post(newPaymentMethod)
		.then( paymentMethod => {
			return res.status( 201 ).json({
				message : "PaymentMethod added to database.",
				status : 201,
				paymentMethod : paymentMethod
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.put( "/api/payments/:id", jsonParser, ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	PaymentMethodList.put(id, req.body.newValue)
		.then( paymentMethod => {
			return res.status( 201 ).json({
				message : "PaymentMethod updated",
				status : 201,
				paymentMethod : paymentMethod
			});
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later.",
				err: error
			})
		});
});

app.get( "/api/payments/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	PaymentMethodList.get_by_id(id)
		.then( paymentMethod => {
			return res.status( 200 ).json( paymentMethod );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete( "/api/payments/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	PaymentMethodList.delete(id)
		.then( paymentMethod => {
			return res.status( 200 ).json( paymentMethod );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.get("/api/session", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	sess = req.session;

	if (sess.email) {
		return res.status(200).json({
			email: sess.email
		});
	} 
	return res.status(404).json("Session not found");
});

app.get("/api/cart", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	sess = req.session;

	if (sess.cart) {
		return res.status(200).json({
			cart: sess.cart
		});
	} else {
		ShoppingCartList.post({})
			.then(cart => {
				sess.cart = cart._id;
				return res.status(200).json( {cart: cart._id} );
			})
			.catch( error => {
				res.statusMessage = "Something went wrong with the DB. Try again later.";
				return res.status( 500 ).json({
					status : 500,
					message : "Something went wrong with the DB. Try again later."
				})
			});
	}
});

// Get beers in cart.
app.get("/api/cart/:id", (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	if (!req.params.id) {
		return res.status(406).json({
			message: "Missing 'id' field in params.",
			status: 406
		});
	}
	
	ShoppingCartList.get_by_id(req.params.id)
		.then(cart => {
			return res.status(200).json({ cart: cart.entries });
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.post("/api/cart/:id", jsonParser, (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	if (!req.params.id) {
		return res.status(406).json({
			message: "Missing 'id' field in params.",
			status: 406
		});
	}

	if (!req.body.beerId) {
		return res.status(406).json({
			message: "Missing 'beerId' field in body.",
			status: 406
		});
	}

	ShoppingCartList.add_beer(req.params.id, req.body.beerId)
		.then(cart => {
			return res.status(200).json({
				message: "Successfully added beer to cart.",
				status: 200
			})
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

app.delete("/api/cart/items", jsonParser, (req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
	if (!req.body.id) {
		return res.status(406).json("Missing id in request body.");
	}
	if (!req.body.cart) {
		return res.status(406).json("Missing cart in request body.");
	}

	return ShoppingCartList.remove_beer(req.body.cart, req.body.id)
		.then(cart => {
			return res.status(200).json({
				message: "Successfuly removed beer from cart.",
				cart: cart,
				status: 200
			})
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
});

let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
		mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL)
	.catch( err => {
		console.log( err );
	});

module.exports = { app, runServer, closeServer };