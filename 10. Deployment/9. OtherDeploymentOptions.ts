// Earlier whe saw hot build deployble package of our angular app using angular-cli
// We can simple => Copy-paste /dist folder to a webs erver or use FTP

// A few other deployment options:
// 1. GitHub Pages => It's basiclly super simple web post for static content that is HTML, CSS and JS => Not backend
//    So we can push our code to github repository => then using basic set up => we can see our app in github.io
//    this option is suitable if the team => have only building fron-end of the app => because we can not use GitHub Pages to host APIs
//    the backend should be manage and deploy separately => this is good option
//    e.x => Building awesome front-end for existing API out => API like for browsing movies, news, events, son on
//        => Or our app may consume an API built wheter our team => but manage by different team => API is develop, version and deploy independinlly of the front-end we are building
//        => perhaps is also used as the backend of the mobile app whiting our company 

// 2. Firebase => Cloud-platform provided by Google we used to build a backend for our web and mobile app quickly => Firebase as the backend
//             => with firebase we get a fast, scalable and real-time database and a library to work with this database
//             => So, we dont have to build API from scratch => this increases our productivity significantly
//             => e.x an app in firebase => the same using ASP.NET as backed => will take 4 months to deliver the same app

// 3. Heroku => Want to build backend of our app from scratch  => custom backend
//           => this is a cloud-platform that let build deploy, monitor and scale our app
//           => supported for various languages and frameworks
//           => super clean and elegant => grat documentation
//           => for starter faster 

// 4. Azure by Microsoft => Also if we want to build and deploy backend of the app ourselves => custom backend
//                       => This gives us more sophisticate features than heroku
//                       => But is for larger organizations with complex needs

