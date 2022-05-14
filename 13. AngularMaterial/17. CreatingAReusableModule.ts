
// We have used a lot of AngularMaterialComponents

// In app.module.ts
// We see the imports:[] => is growing => fat
//                       => as we use more Angular Material Components => even worse
//                       => So in this implementation => we ware missing the Cohesion Principle

// Refactor this code => cleaner and maintainable


// In software Engineering:
// Concept called => Cohesion => means things that are related should be together 
//                            => and things that are not related should no be together
//                            => Help us to organize our app code propertly

// So look once the modules on imports[] => we see all modules MdCheckboxModule, MdRadioModule, Md..,Md.., ...
//                                       => All these modules are highly related => all about Angular Material Components
//                                       => But we have also FormsModule => completely separate from Angular Material Components

// So => we need to put All the Angular Material modules  => inside a new Module => e.x MdComponentsModule
//    => will be better we have only 1 module instead all others module

// Creating new Module
// Use angular cli => run => ng g m md-components => create a file .ts inside a folder
//                 => we know with this => creates a /md-components/ folder => But here we dont really need to put the file inside a folder
//                 => take this file out => and put it under src/app
//                 => remove the md-components directory



// In md-components.module.ts
// We have a class called MdComponentsModule  => decorated with @NdModule decorator function
// In this module we are not going to have:
//  - Any components, any directives, any pipes  => we dont really this decorations:[] property => remove it 
//  - Also, we are not gonna have any templates, use directives define somewhere else => we dont really need imports:[] => remove it

// In @NgModule decorator function => we have another property called exports:[]
//                                 => what we add in this exports array => will be exported out of this module
//                                 => so, we can move all those Angular Material Modules here => then when we import this MdComponentsModule
//                                                                                            => All Angular Material Modules will come with this new module
//

// Remember in app.module.ts => imports:[] => MdComponentsModule


// Lesson:
// Our app has better organization => on imports[] => we only have HIGH LEVEL modules




// md-components.module.ts


import { NgModule } from ..
// import { CommonModule } from ...

@NgModule({
    // imports:[
    //     CommonModule
    // ],

    // declarations:[]

    exports:[
        MdCheckboxModule,
        MdRadioModule,
        MdSelectModule,
        MdInputModule,
        MdDatepickerModule,
        MdNativaDateModule,
        MdInconModule,
        MdButtonModule,
        MdChipsModule,
        MdProgressSpinnerModule,
        MdTooltipModule,
        MdTabsModule,
        MdDialogModule
    ]
})
export class MdComponentsModule {}