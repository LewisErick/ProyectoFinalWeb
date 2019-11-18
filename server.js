
let express = require( "express" );
let morgan = require( "morgan" );
let mongoose = require( "mongoose" );
let bodyParser = require( "body-parser" );
let { UserList, PaymentMethodList, ProviderList, BeerList, TicketList, ReviewList } = require('./model');

let app = express();
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use( express.static( "public" ) );

app.use( morgan( "dev" ) );

app.get( "/api/beers", ( req, res, next ) => {
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

app.put( "/api/beers/:id", jsonParser, ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	BeerList.put(id, req.body.newValue)
		.then( student => {
			return res.status( 201 ).json({
				message : "Beer updated",
				status : 201,
				student : student
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

app.get( "/api/beers/:id", ( req, res, next ) => {
	let id = req.params.id;

	if ( !id ){
		res.statusMessage = "Missing 'id' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'id' field in params!",
			status : 406
		});
	}

	BeerList.get_by_id(id)
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
});

app.put( "/api/users/:id", jsonParser, ( req, res, next ) => {
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

app.post( "/api/users/login", bodyParser, ( req, res, next ) => {
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
			if (req.body.password != user.password) {
				return res.status(401).json("Incorrect password.");
			}
			return res.status( 200 ).json( user );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});
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

	UserList.delete(id)
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

runServer( 8080, "mongodb+srv://root:rootpass@sandbox-gxlks.mongodb.net/CervezologiaDB?retryWrites=true&w=majority" )
	.catch( err => {
		console.log( err );
	});

module.exports = { app, runServer, closeServer };