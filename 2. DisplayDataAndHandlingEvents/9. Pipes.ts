// Built-in block in Angular is pipe: Pipes are used to format data
// Built-in pipes => Uppercase, Lowercase, Decimal, Currency, Percent


import { Component } from '@angular/core';


@Component({
    selector: 'courses',
    template: `
    // To format: Apply pipe operator(|) + nameOfPipe(or keyword)

    {{ course.title | uppercase | lowercase}} <br/>     //uppercase and lowercase pipe
    {{ course.students | number }} <br/>                //keyword of decimal pipe is number  

    // number:'argument' => 1st Number of int digits =>.=>Min and max number of digits after decimal points => 2-2
    // if define 1-1(min-max) => Round the number
    {{ course.rating | number:'1.2-2' }} <br/>      
    
    //currency pipe can supply multiple arguments 
    // currency:'currencyName':BooleanDisplayCurrencySymbol:'IntDigits.Max-Min'
    {{ course.price | currency:'AUD':true:'3.2-2'}} <br/>          //currency pipe by defaults is USD

    //date:'format'
    {{ course.releaseDate | date:'shortDate'}}                  //Date pipe
    
    See => pipe in angular.io/api/common/pipename
    /order and filter pipes were removed since angular 2 => high costo comp.
    `
})

export class CoursesComponent{
    course = {
        title: "The Complete Angular Course",
        rating: 4.9745,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2022,3,1)
    }


}