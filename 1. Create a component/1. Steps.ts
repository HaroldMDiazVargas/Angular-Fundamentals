
//--------------------------------------------------------------------------------------------------------
//1st Step -Create ts component(courses.component.ts)
//Decorator Component make a class component
import { Component } from '@angular/core'; 

@Component({
    //1 or more properties to tell angular how works(selector,templateUrl,srtyleUrls)
    selector: 'courses', //css selector
    template: '<h2>Courses</h2>', //html markup to render for this component

}) //Decorator function
export class CoursesComponent{  // component-name+Subfix Component

}

//-----------------------------------------------------------------------------------------------------
//2nd Step-Register(not known error in console)
//Go to app.module.ts -> declarations arrays(add all components part of this module) -> add here component.
@NgModule //Decorator function to convert TS plain into module from angular point of view. 

//-----------------------------------------------------------------------------------------------------
//3rd Step-Render
//Render the template of courses.component in app.component.html using <courses>
//The template for app.component.ts is <app-root> includes all other templates and is defined in index.html