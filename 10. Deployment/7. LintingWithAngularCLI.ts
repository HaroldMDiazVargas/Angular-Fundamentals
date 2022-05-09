// The good practice we have to use to make sure our code has a high degree of readibility and mantainibility is using => a Linter
// a Linter is a program which can be configured by various rules and then it performs a static analysis of our code => to see if it has violated any of these rules
// this way we can ensure => our code is clean and consisten 
// specially importat when working in a team => because people has different style of writing code => e.x some developer use single quotes for string and others double quotes
// then when we have mixed single and double quotes => it looks really ugly => where son people finish JS statement with semicolon other dont


// In typescript world => popular tool we use for linting is => tslint
// we can read about it and its features on github.com/palantir/tslint 
// the good news => project we create with angular-cli =>  automatically have support for linting 

// If we go to package.json => under dependencies => we have a reference for "tslint" => install by default
// Also if we look root of the project => we see tslint.json configuration file => we define all our rules
// e.x rule => "quotemark":[ true, "single"] => this means everyone in the code should use single quotes for strings
//          => if we prefer double quotes => change for "double" => or if we entirely disable this rule => set false

// One simple way to run tslint => is by angular-cli => ng lint => see all the linting issues in our code
// This goes throught all the files of our project=> finds all the errors and reports in one go
// This is not very interactive => but is a good option before commiting our code to a repository

// e.x error in filename..[11,19] => this means line 11 => trailing whitespace 
// e.x error => identifier 'xyz' is never reassigned; use const instead let => suggesting use const => more evaluable rule
// We can fix these rules 1 by 1 => or have angular-cli fix them automatically for us

// Run => ng lint--fix 
// tslint => fix errors that are easy to fix => leave other for us
// fix almost all the errors
// e.x error left =>  selector component should have prefix "app" => we can configurate tslint to apply this rule or not
