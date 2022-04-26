// ----------------------------------------------------------------------------------------------
// In current project path:
//------------------------------------------------------------------------------------------------

//  > npm install bootstrap --save => Store in node_modules folder and add to Dependencies y package.json
// ^ -> major.minor.patch 
// Indicates we can use the most recent major version e.g 3.4,3.4,3.9 but not install newer major e.g 4.0


//npm install  => looks package.json and download all dependencies.

//--------------------------------------------------------------------------------------------------

// In src/styles.css =>global styles => Import bootstrap.css
@import "~bootstrap/dist/css/boostrap.css"

body {padding:20px;}

//---------------------------------------------------------------------------------------------------


// In a particular.component.ts any bootstrap class
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        <button class="btn btn-primary">Save</button>
    `
})
export class CoursesComponent {

}
//-----------------------------------------------------------------------------------------------------