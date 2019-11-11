let mongoose = require('mongoose');
const uuid = require('uuidv4').default;

mongoose.Promise = global.Promise;

// Beer SCHEMA and API definition.
let beerSchema = mongoose.Schema({
    name : { type : String },
    barcode : { type : String },
    unit_price : { type : Int },
	provider : { type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider' }
});

let Beer = mongoose.model( 'Beer', beerSchema );
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
		return Beer.findOne({id: id})
					.then(beer=> {
						return beer;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Beer.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(beer=> {
						return beer;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Beer.findOneAndRemove({id: id})
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
    total : { type : Double },
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
		return Ticket.findOne({id: id})
					.then(ticket=> {
						return ticket;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Ticket.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(ticket=> {
						return ticket;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Ticket.findOneAndRemove({id: id})
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
    rating : { type : Int },
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
		return Review.findOne({id: id})
					.then(review=> {
						return review;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Review.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(review=> {
						return review;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Review.findOneAndRemove({id: id})
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
		return Provider.findOne({id: id})
					.then(provider=> {
						return provider;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return Provider.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(provider=> {
						return provider;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return Provider.findOneAndRemove({id: id})
					.then(provider => {
						return provider;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

// Provider schema and API definition.
let userSchema = mongoose.Schema({
    email: { type : String },
    password: { type : String },
});

let User = mongoose.model( 'User', userSchema );
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
		return User.findOne({id: id})
					.then(user=> {
						return user;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return User.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(user=> {
						return user;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return User.findOneAndRemove({id: id})
					.then(user => {
						return user;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}
    
    PaymentMethod {
        cardEnd: string (last 4 digits)
        expirationMonth: string
        expirationYear: string
    }

// Provider schema and API definition.
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
		return PaymentMethod.findOne({id: id})
					.then(paymentMethod=> {
						return paymentMethod;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	put: function( id, newValue ) {
		return PaymentMethod.findOneAndUpdate({id: id}, {$set: newValue}, {new: true})
					.then(paymentMethod=> {
						return paymentMethod;
					})
					.catch( error => {
						throw Error(error);
					});
	},
	delete: function(id) {
		return PaymentMethod.findOneAndRemove({id: id})
					.then(paymentMethod => {
						return paymentMethod;
					})
					.catch( error => {
						throw new Error(error);
					});
	}
}

module.exports = { UserList, PaymentMethodList, ProviderList, BeerList, TicketList, ReviewList };