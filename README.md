# ProyectoFinalWeb

## Cervezología App
Web application made for the Cervezología business. This web app shows a crafted beer catalog, with a detailed view for each beer and reviews left by other users. You can add beers to your shopping cart and buy them, as well as leave your own review. 

This web page has 5 different pages:

* **Login**
    * Username and password form to login or register a new user
    * *This is the landing page the first time you go to the site, register a new user and login to access*
* **Shop**
    * Beer catalog with the option to instantly buy or add a given number of beers to your shopping cart
* **Detail**
    * Detailed view of a beer information, with the option to instantly buy or add a given number of beers to your shopping cart
    * User reviews
    * Leave your review
* **Cart**
    * Shopping cart with all the beers you've added, the quantity, the unitary price and the total price
    * Remove items from the shopping cart
* **Receipt**
    * After you buy something, you see the receipt with your purchase details

## Endpoints

* **Beers**
   * GET api/beers -> Gets all beers in the database
   * POST api/beers -> Create a new beer in the databse
   * PUT api/beers/:beer
   * GET api/beers/ind/:id
   * GET api/beers/:name
   * DELETE api/beers/:id

* **Tickets**
   * POST api/tickets/buy -> Used for instant purchase
   * POST /api/tickets -> Creates a receipt for the purchase of the items in the current shopping cart for the current user.
   * GET /api/tickets/:id

* **Session**
   * GET /api/session -> Get ID of current user logged in (404 if not logged in)

* **Shopping Cart**
   * POST /api/cart/clear -> Clears current session user's shopping cart
   * GET /api/cart -> Get ID of current shopping cart of current user (or guest)
   * GET /api/cart/:id -> Get beers in the shopping cart with the specified ID
   * POST /api/cart/:id -> Add beers to shopping cart
   * DELETE /api/cart/items -> Remove beer from shopping cart 

Heroku Production Link:
https://intense-forest-79562.herokuapp.com
