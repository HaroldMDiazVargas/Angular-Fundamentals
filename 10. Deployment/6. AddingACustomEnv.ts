// What if we want to additional env => like testing env or staging env
// These are common set up in a lot of organizations

// So in src/environments/ folder => duplicate one of these env file => rename to environment.test.ts
// In our env object:
// change production property to false => because we are not in production env
// change de color of navbar to purple 
// Then, we need to register this env using angular-cli 
// in the root of our project => angular-cli.json => this is configurtion for angular-cli 
// here we have a property called "environments" => this is an object where we can register all our environments
// add new => "test": "environments/environment.test.ts" => all we have to do is this

// Now in terminal => ng build --test or use => ng serve  --environment=test => to see the testing env in action
// You can see navbar is purple => indicated test env

// Something we need to aware of when working with not development env=> we dont have HotModuleReplacement => if we make any changes in our code or in env object => changes are not visible inmediatly
// We need to go to terminal => stop web server => run ng serve again
// The HotModuleReplacement => only available when we run our app in the development env
