// If we go to => pages.github.com => read more about github pages and how it  works => simplet hostin we can get for deploy our angular app
// Our app is hosted directly from our github repository => just for pure simple app without backend
//
// In this demo => our backend is list of followers => come from github( where whe make consume http)

// Steps:
// 1. Create new repository e.x followers-app
// 2. we can see how to register our repository => as the origin of our local git repository => git remote add origin http://githu...
// 3. In our project folder  => we already have a git repository(angular-cli initializes git repo => So with the before command => set github repository(new created) as the origin of our local repo
// 4. then we push changes to the remote repository => git push origin master => to origin the master branch 
// 5. Install a node package for deploy our app to github pages => in terminal => sudo npm i -g angular-cli-ghpages
// 6. To build our app => ng build --prod --base-href="https://username.github.io/repositoryName/" =>  .io means the address of our website not of our repo
//                     => this last flag is very importat otherwise our deployment is not gonna work => this means set this to the address of our website on github pages
// In vscode => look dist/index.html => we have element <base href => set to the value we provided when building our app
// 7. One we build our app using angular-cli => we deploy our app using github pages => In terminal => angular-cli-ghpages or use ngh => if error  run: ngh--no-silent
// 8. Now go to the website on github pages => https://username.github.io/repositoryName/

// shortcut
// typing the commands everytime is time consuming
// So, go to package.json => under scripts{"deploy:gh":"ng build --prod --base-href='https://username.github.io/repositoryName/' && ngh" }
// This is to make a custom command => In terminal run => npm run deploy:gh  
