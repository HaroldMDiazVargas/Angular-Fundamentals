// In typical web app we have the  concept of environment 
// Quick often in most organizations we have 3 envs:
// Development environment => Used by developers
// Test environment => Used by tester
// Production environment => Where we deploy our app

// Lets take a closer look and how define additional custom environments
// In src/environments folders => we have 2 files:
// environment.prod.ts => For production
// environment.ts => Used for development => We simply export environment object with 1 property => production:false
//                                        => here we can have additional properties 
//                                        => e.x1 change color of navbar depending of the environment 
//                                          this way testers know that they're looking at the actual testing website not the production website 
//                                          so they dont accidentally modify some data in the production
//                                       => e.x2 we maybe want to change the name of the app in the navbar => we want to add the word 'testing'
//                                       => e.x3 perhaphs we want to use different APIendpoint in our testing environment
// So we can add all these properties in this object:
// e.x => navBarBackgroundColor: 'blue'  => So in our development env we want to make this blue(environment.ts)
//     then in our produnction env => we paste this property but change color to 'white' (environment.prod.ts)
// So we can see in environment.ts => Read for this comments that when we build our app using angular-cli and supply --env flag => angular cli will pick one of these envs files and put in our bundle
// So we dont have to write any code to work with a specific env object.

// Lets go to navbar.component.ts => define field called backgrounColor => set to the navb ar  backgroundColor of our env object
// so, backgroundColor = environment (it imports automatically the production env ) => on top see => import { environment } from './../../environments/environment.prod'
// this is dangerous => we dont want to use this => we want to use environment => import { environment } from './../../environments/environment' => MAKE SURE USE THIS
// then we build our app => angular-cli will either pick this environment or environment.prod => depending of the env we specify during building
// Now we set bakcgrounColor = environment. ( we see properties: navBarBackgroundColor) 
// bakcgrounColor = environment.navBarBackgroundColor;

// In navbar.html => apply style binding 
// [style.backgroundColor] = "backgroundColor"

// If we want to see this action => we dont need to build our app => we can still serve our app with => ng serve => but additional define the target environment
// So when run ng serve => the target default is development 
// If we want to load our app in production env => run ng serve --prod (short form for adding env) or  => run ng serve --environment=prod(long form)
// Now angular-cli will build our bundles using the production environment object 

