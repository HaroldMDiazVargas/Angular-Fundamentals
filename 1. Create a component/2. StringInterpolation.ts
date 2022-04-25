import { Component } from '@angular/core'; 

@Component({
    selector: 'courses', 
    template: '<h2>{{ getTitle() }}</h2>' // String Interpolation  {{}}
                                          //Data binding(update DOM) if field change

}) 
export class CoursesComponent{
    title = "List of Courses";


    getTitle() {
        return this.title;
    }

}
