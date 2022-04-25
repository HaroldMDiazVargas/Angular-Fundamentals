import { Component } from '@angular/core'; 

@Component({
    selector: 'courses', 
    template: `
            <h2>{{ title }}</h2>
            <ul>
                <li *ngFor="let course of courses">
                    {{ course }}
                </li> 
            </ul>
            ` //BackTick                            
    

}) 
// Real-app we have service to get the list of courses from the server(http)
// instead of an simple array courses
export class CoursesComponent{
    title = "List of Courses";
    courses; // = ["course1", "course2", "course3"];

    constructor(){
        let service = new CoursesServices();  //Instance of courses server inside class->Coupling, fragile
        this.courses = service.getCourse();
    }

}
//INSTEAD new operator, we pass parameter to constructor. Angular creates the instance
export class CoursesComponent{
    title = "List of Courses";
    courses; // = ["course1", "course2", "course3"];

    constructor(service:CoursesServices){  //Decoupling class from dependency, no fragile(allow unit testing)
        this.courses = service.getCourse();
    }

}

// Dependency Injection-> Instruct angular to inject the dependencies of the component to its constructor
// Angular has dependency injection framework build-in 
// We need to register dependencies somewhere in our module to make it works.
@NgModule // In provides[] -> Register all dependencies that component in this module are dependts upon
providers :[
    CoursesService;
]
// Angular creates a SINGLE instance of this class(CoursesServices) for the entire module. 
// SINGLETON pattern -> Single instance of a given object exist in the memory
// Angular -> 1.Instance the dependencies 2.Inject dependencies into constructor of the class