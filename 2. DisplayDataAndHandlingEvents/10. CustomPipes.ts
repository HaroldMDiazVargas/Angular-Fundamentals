
import { Component } from '@angular/core';


@Component({
    selector: 'courses',
    template: `
                {{ text | summary }}    //Without arguments
                {{ text | summary:10 }}    //Without arguments(limit)
    
                `
})

export class CoursesComponent{
    text = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, cupiditate?
    `


}

// Steps:
// In app/ add new file => pipename.pipe.ts e.x  summary.pipe.ts and here:
// On TOP => Import Pipe decoration function and Interface that define shape of all pipes in angular
import { Pipe, PipeTransform } from '@angular/core' 

//Pipe decoration with name of pipe(same define in template markup)
@Pipe({
    name: 'summary'
})
//Class implements interface
 export class SummaryPipe implements PipeTransform {
     //(value:any, args?:any)  =>More readable => (value:string, limit?:number, another?:boolean ,...)
    transform(value:string, limit?:number)  { //Method of the PipeTransform interface (same signature here but define value:any(string))
        if (!value)
            return null;
        let actualLimit = (limit) ? limit : 50;
        return value.substring(0,actualLimit)+'...';
    }
}

// THEN=> Register in app.module =>Declarations array:[SummaryPipe]
