 // Head over firebase.google.com => logg in
 // In navbar => see a button called console => alternativaly head over => condole.firebase.google.com
 // Create a new firebase project

 // In homepage of our new project => we can see:
 // - Add firebase to our iOS app
 // - Add firebase to our Android app
 // - Add firebase to our web app
 // Click on these options => see documentation involves 

 // The documentation for adding to our web app => just a general JS documentation
 // Adding angular to firebase app is slightly different 


 // Remember in general we have 2 types of databases:
 // - Relational => We have tables and relationships
 //              => each table have 1 or more records
 //              => we refer to the combination of these tables and theirs structure as the schema of the database
 // - NoSQL(or document databases) => we dont have schema  
 //                                => we dont have any tables or any columns
 //                                => Our databases are essentially a tree of nodes => each node is a key/value pair
 //                                => this value can be a simple primitive value or it can be a complex object 
 //                                => e.x of NoSQL databse => MongoDB, Firebase, etc

// On the left side bar => Database tab => This is where all our data will be store 
// here we have the root node of our database => fir-demo-d19de:null 
// under this we have a node called courses =>    |----Name courses Value value        => For listing all the courses in our app => each node has a Name and a Value
// we not want to assign primitive value to this node => |--- Name 1 Value course1     => better make a complex object so click on plus(+) => this is a child under courses
// click on ADD => See the tree of nodes in our databse=>|--- Name 2 Value course2    => Add another child under courses
// Look each node of this database can have a different structure  => thats why we refer to this kind of databse as NoSQL o Schemeless database
// We can add another child under courses =>             |---- Name 3 => instead of put a value => we want a complex object => so click on plus(+)
//                                                              |---- Name title  Value course3
// Our 3rd course is an object with a property called title  => |---- Name author Value Harold
//                                                              |---- Name price  Value 150
// So look => each node can have different structure 
// In fact => this is extremely powerful, superfast, superscalable
// But is not optimize for reporting => Unlike traditional Relation Databse where we can joint multiple tables and run complex querys against them => we can't do that here
// If that's what we need in our app => better use a relational database
// Or if we want to use firebase or another NoSQL like Mongo => we can use this like our main database 
// But set up some background job that takes all the data from these NoSQL database => into a Relational Database for reporting
