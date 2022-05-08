// Lets quick recap key points
// We use JWT  => Implement Authentication and Authorization in our Angular app
// This JWT => have header, payload and a digital signature(based on the combination of header and payload) => and generate based on a secret
// We see jwt.io => We have JWT debugger as well as libraries we can use both on the client and on the server
// In angular apps => we use a node package => angular2-jwt

// As well as authorization goes there are two things we need to look for on the client:
// 1. Show or hide various elements on the page depending of authentication status of the user
//     whether are logged in or not => may they are logged in but not part of specific role => we need to use ngIf to show/hide => never ever have sensitive info on client
//     because malicious user can alway look DOM => things we have hidden(e.x links)
// 2. We also protect our routes => we use guards to achieve that 
//these are the thing we should watch on the client

// On the server:
// We want to protect all or a subset of our APIendpoints for unauthorizate access => to do this we use JWT
// At this API endpoint => we should expect an authorization header with a valid JWT in the request 