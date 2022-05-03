// We have assumed that in our implementation => Call to the server alway success

// In ngOnInit() => Callind the get method to the service
// Simulate where call to the server fails:
// Cahnge the url to  => invalid URL
// In browser => List of Post disappear => User doesnt see clue waht going on
// Handling errors => Give a proper message to user
// Two types of erros:

// 1.Unexpected: Three types
// 1.1 Server is offline => Client send a request => Server is not open runing to respond
// 1.2 Network is down => Server is online => Client not reached(Simulate change url)
// 1.3 Unhandled exceptions in our API=> Server is opening running => Network is fine => But there is Bug => Fails 

// 2.Expected: Two types we need to handle 
// 2.1 "Not Found" errors(404) => HTTP Protocolo means status code 404
// Imagine two user looking uo same page at same time:
// userA => Delete a post => Post still visible on userB still => Try to delete it => Server responds with a "NotFound"(404)
// 2.2 => "Bad request" errors(400)
// Imagine a sign-form => Create new account => It's possible we have account with same username => Server responds "Bad request"
// If there is a problem with the data that client sent to the server=> Server is going to respond with Bad rquest

