
// High-level understanding about JSON Web Tokens 
// See jwt.io 
// On this website we have:
// A debugger => for working with JWT => See JWT in action
// A bunch of libraries => to work with JWT => For different languages and platflorms => because we have to work on the client and also on the server side
//                      => for the front-end we use a library for angular => on the server depending what language an dplatform we use for building APIs
//                      => ther're libraries for => .NET, Python, Node.js, Java, JavaScript, Perl, Ruby, Elixir
//                      => With these libraries we can generate a validate JWT very easy

// JWT in action => Under debugger:
// 1. Encoded =>  Long string => Real JWT => token server is going to send to client upon sucessful authentication => 3 parts(colors):
//            => header(red), payload(purple) and digital signature(blue) => see these parts on decoded tap => this JWT is not encrypted => Just encoded using base 64-algorithm => Not sensitive info
// 2. Decoded => We can se:
//            header => JSON object with 2 properties => {"alg":"HS256" and "typ":"JWT"} => standard header
//            payload => JSON object with few properties => attributes about user => {"sub":"1293", "name":"John", "admin":true} => sub identify the subject of the JWT => which is userId
//                    => We can include a few other attributes/properties => these are properties we need to know in alot of places in our app 
//                    => We're going to send this JWT bewteen the client and the server => by including these properties in token => we dont have going the database to find e.x name of user everytime there's request
//                    => Thats why we have a few basic properties about the user in the payload of the JWT
//            signature => We use it to prevent a malicous user for modifying any other properties => This signature is based on a secret that exist on the server
//                      => Unless a malicious user can have acess to secret(on server)  => they wont be able to to generate a digital signature for a token 
//                      => This digital signature is constructed => we get the header and encode it using base64 algorithm and then concatenate it with payload encoded as base64
//                      => we have a long string at this point => then we use the secret => to encrypt it using HMACSHA256 algorithm => 
//                      => So, digital signature is based on the content of this JWT => If we change this payload the signature needs to be regenerate 
//                      => So, a malicious user can not simple modify any of the properties for someone else JWT => if they modify these values => need to regenerate signature
//                      => 