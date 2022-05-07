// Lets have a quick look at the high-level architecture

// Authentication:
// In order to implement authentication:
// 1. On the client we should build a log-in page
// 2. On the server we should build and API endpoint to validate user
// When user clicks on the log-in button => Our angular app is going to call the API endpoint => pass the username and password
// on the server => we validate these credentials => if they're VALID => we return a JSON Web Token(JWT)
// JWT => JSON Object that includes certain attributes about the log in user => We use this object to identify the user on the client and also on the server
//        these few attributes are like userId, name, email, wheter is admin user or not, and perhaps few others. => vary from 1 app to another
// metaphor => driver license => name, date, address => certain attrb about you

//On the client:
// We get this JWT on the client => then we need to store it somewhere persistent => so it can exists across search restarts
// So, if user closes browser => but then open agains => JWT should be there => We use Local Storage for that 
// Almost all modern browsers have simple stores per website and also provide an API for storing key/value pairs into this storage
// We going to use this native API to store  our JWT inside the broswe Local Storage
// On the client we can use JWT => to identify the user, ex:
// - display the name in navbar 
// - we can show/hide parts of a page
// - we can prevent access to certain routes if they dont have a valid token 

//On the server:
// Now lets say the user wants to get the list of orders from the server  => and this list is only available to authenticated users
// So on the server we have an API endpoint such as /api/orders => In order to get the list of orders on the client we should include the JWT in the request header
// Then on the server => we should extract this JWT and validate it => if is valid => will return the list of orders => otherwise return unauthorize response(status code 401)
