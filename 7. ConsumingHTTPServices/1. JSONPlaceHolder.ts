// Most real app we need bunch HTTP Services(APIs) on the server 
// We use these services to get or save data
// As Front-end Developter not need to know how build HTTP Services => Unless FullStack

// Fake HTTP Service we use as the backend of our app
// Go to => jsonplaceholder.typicode.com => scroll down => Resources => /posts /comments /albums /photos /todos /users
// /posts => Bunch of JSON objects => Each object has 4 propteties => userId, id, title and body
// If we get the url https://jsonplaceholder.typicode.com/posts in Angular app => We get all these JSON Objects

// We can send various kind of HTTP Requests to create/update/delete posts 
// But this is a Fake Server => If we create a new post => API responds as if the post was actually created on the server
// But when refresh the page and list de posts again => New post is not going to be there => NOT Databs behind this HTTP Server


