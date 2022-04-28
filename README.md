# 🚀 Command line to setting up the development env!

To create a new project just use the instructions as follows:

1. Install angular cli(command line interface)

```
npm install -g @angular/cli
```

2. Create new project

```
ng new projectName
```

3. Load app in web server. This ng use webpack tool(transpiler, bundler->minimize) in watch state(HotModuleReplacement) and also inject all bundles in index.html in runtime.

```
ng serve
```

- main.bundle.js -> All source code of our app-
- styles.bundle.js -> All our tylesheet stored/compiled into JS bundle.
- vendor.bundle.js -> Third party libraries.

# Files and folders in Angular project:

- e2e: Where write end to end test for our apps.
- node_modules: Store all third party libraries(development).
- src/app: Actual source code of our app. Module(module.ts) and its components(.ts,.html,.css)
- src/assets: Store static acces of our apps(img, icons, etc)
- src/environment: Configuration setting for different env(1->development env, 1->production env)
- src/favicon.ico file: Icon display in browser
- src/index.html file: Contains angular app, not references for .js or .css.
- src/main.ts file: Starting point of our app. Bootstrapping our main module of our app(AppModule)
- src/polyfills.ts file: Import some scripts required for running angular. Fill gaps.
- src/styles.css file: Add global styles for our app.
- src/test.ts: Setting our testing environment.
- .angular-cli.json file: Configuration for angular
- .editorconfig: Use same setting in editors
- karma.config.js file: Config file test runner.
- package.json: Bunch of setting. Dependencies->Libraries app need(RUN). devDependencies->Need for develop app(DEV).
- protractor.conf.js file: end to end test for angular.
- tsconfig.json: Bunch of setting for typescript compiler(tsc)
- tslint.json: Includes number of setting for static analysis tool for typescript(tslint).
