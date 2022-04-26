import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
            
            <h2>{{ title }}</h2>             //StringInterpolation -> Well for heading, div, span,parag
            <h2 [textContent]="title"></h2>  //SquareBracketSintax/PropertyBinding(UnderHood)
                                            //PropertyBingind only works for One way: from component to the DOM
                                            //Fields in Component change -> DOM update, but Input field in DOM
                                            //And User type(chang DOM) -> Fields will not be update
            <img src="{{ imageUrl }}" />
            <img [src]="imageUrl" />         //Cleaner   
    `
})
export class CoursesComponent {
    title = "List of courses";
    imageUrl = "http://AnImageUrl.com";
}