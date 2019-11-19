let mongoose = require('mongoose');
const uuid = require('uuidv4').default;

mongoose.Promise = global.Promise;

// Beer SCHEMA and API definition.
let beerSchema = mongoose.Schema({
    Nombre : { type : String },
    Cervecería : { type : String },
	IBU : { type : Number },
	ABV : { type : Number },
	SRM : { type : Number },
	Estilo : { type : String },
	Origen : { type : String },
	fotoURL : { type : String },
});

let Beer = mongoose.model( 'Beer', beerSchema, 'beers' );
let BeerList = {
	get : function(){
		return Beer.find()
				.then( beers => {
					return beers;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newBeer ){
		newBeer.id = uuid()
		return Beer.create(newBeer)
				.then(beer => {
					return beer;
				})
				.catch( error => {
					console.log(newBeer, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return Beer.findOne({_id: id})
					.then(beer=> {
						return beer;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	get_by_name: function( name ) {
		return Beer.findOne({Nombre: name})
					.then(beer=> {
						return beer;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( name, newValue ) {
		return Beer.findOneAndUpdate({Nombre: name}, {$set: newValue}, {new: true})
					.then(beer=> {
						return beer;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(name) {
		return Beer.findOneAndRemove({Nombre: name})
					.then(beer => {
						return beer;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

// Ticket and API definition.
let ticketSchema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId,
		ref: 'User' },
    beer : { type: mongoose.Schema.Types.ObjectId,
		ref: 'Beer' },
    total : { type : Number },
	payment_method : { type: mongoose.Schema.Types.ObjectId,
		ref: 'PaymentMethod' }
});

let Ticket = mongoose.model( 'Ticket', ticketSchema );
let TicketList = {
	get : function(){
		return Ticket.find()
				.then( tickets => {
					return tickets;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newTicket ){
		newTicket.id = uuid()
		return Ticket.create(newTicket)
				.then(beer => {
					return beer;
				})
				.catch( error => {
					console.log(newTicket, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return Ticket.findOne({_id: id})
					.then(ticket=> {
						return ticket;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Ticket.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(ticket=> {
						return ticket;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Ticket.findOneAndRemove({_id: id})
					.then(ticket => {
						return ticket;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

// Review and API definition.
let reviewSchema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId,
		ref: 'User' },
    rating : { type : Number },
	comment: { type : String }
});

let Review = mongoose.model( 'Review', reviewSchema );
let ReviewList = {
	get : function(){
		return Review.find()
				.then( reviews => {
					return reviews;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newReview ){
		newReview.id = uuid()
		return Review.create(newReview)
				.then(review => {
					return review;
				})
				.catch( error => {
					console.log(newReview, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return Review.findOne({_id: id})
					.then(review=> {
						return review;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Review.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(review=> {
						return review;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Review.findOneAndRemove({_id: id})
					.then(review => {
						return review;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}
 
// Provider schema and API definition.
let providerSchema = mongoose.Schema({
    name: { type : String },
	address: { type : String }
});

let Provider = mongoose.model( 'Provider', providerSchema );
let ProviderList = {
	get : function(){
		return Provider.find()
				.then( providers => {
					return providers;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newProvider ){
		newProvider.id = uuid()
		return Provider.create(newProvider)
				.then(provider => {
					return provider;
				})
				.catch( error => {
					console.log(newProvider, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return Provider.findOne({_id: id})
					.then(provider=> {
						return provider;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Provider.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(provider=> {
						return provider;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Provider.findOneAndRemove({_id: id})
					.then(provider => {
						return provider;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

// User schema and API definition.
let userSchema = mongoose.Schema({
    email: { type : String },
	password: { type : String },
	shoppingCart: { type: mongoose.Schema.Types.ObjectId,
					ref: "ShoppingCart" }
});

let User = mongoose.model( 'user', userSchema, 'user' );
let UserList = {
	get : function(){
		return User.find()
				.then( users => {
					return users;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newUser ){
		newUser.id = uuid()
		return User.create(newUser)
				.then(user => {
					return user;
				})
				.catch( error => {
					console.log(newUser, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return User.findOne({_id: id})
					.then(user=> {
						return user;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	get_by_email: function(email) {
		return User.findOne({email: email})
				.then(user => {
					return user;
				})
				.catch(err => {
					throw Error(err);
				});
	},
	put: function( id, newValue ) {
		return User.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(user=> {
						return user;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return User.findOneAndRemove({_id: id})
					.then(user => {
						return user;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

// Payment method schema and API definition.
let paymentMethodSchema = mongoose.Schema({
    card_last_digits: { type : String },
    expiration_month: { type : String },
    expiration_year: { type : String },
});

let PaymentMethod = mongoose.model( 'PaymentMethod', paymentMethodSchema );
let PaymentMethodList = {
	get : function(){
		return PaymentMethod.find()
				.then( paymentMethods => {
					return paymentMethods;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newUser ){
		newUser.id = uuid()
		return PaymentMethod.create(newUser)
				.then(paymentMethod => {
					return paymentMethod;
				})
				.catch( error => {
					console.log(newUser, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return PaymentMethod.findOne({_id: id})
					.then(paymentMethod=> {
						return paymentMethod;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return PaymentMethod.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(paymentMethod=> {
						return paymentMethod;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return PaymentMethod.findOneAndRemove({_id: id})
					.then(paymentMethod => {
						return paymentMethod;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}



// Shopping cart schema and API definition.
let shoppingCartSchema = mongoose.Schema({
    entries: [{
		quantity: Number,
		beer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Beer'
		}
	}]
});

let ShoppingCart = mongoose.model( 'ShoppingCart', shoppingCartSchema );
let ShoppingCartList = {
	get : function(){
		return ShoppingCart.find()
				.then( shoppingCarts => {
					return shoppingCarts;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	post : function( newUser ){
		newUser.id = uuid()
		return ShoppingCart.create(newUser)
				.then(shoppingCart => {
					return shoppingCart;
				})
				.catch( error => {
					console.log(newUser, error);
					throw Error(error);
				});
	},
	get_by_id: function( id ) {
		return ShoppingCart.findOne({_id: id})
					.then(shoppingCart=> {
						return shoppingCart;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return ShoppingCart.findOneAndUpdate({_id: id}, {$set: newValue}, {new: true})
					.then(shoppingCart=> {
						return shoppingCart;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return ShoppingCart.findOneAndRemove({_id: id})
					.then(shoppingCart => {
						return shoppingCart;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}


module.exports = { UserList, PaymentMethodList, ProviderList, BeerList, TicketList, ReviewList, ShoppingCartList };