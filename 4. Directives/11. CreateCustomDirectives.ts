// Control over the behaviour of DOM elements
// e.x Input field for the user to enter full number
// 1234567890 => (123)456-7890 As the user type number and moves away format this value using standar american number format
// In these situation we use directives

//example of input-format directive created using cli
import { Directive, HostListener, ElementRef, Input } from '@angular/core'

@Directive({
    // Good to prefix(app) directive selector to avoid clash
    selector: '[appInputFormat]'  //Any elements that has thsi attr => Angular applys this directive on that elements
})
export class InputFormatDirective{
    
    // @Input('format') format;
    @Input('appInputFormat') format;                        //Use the same selector for alias name  
    

    constructor(private el:ElementRef){                     //Inject an element reference object

            }

    // @HostListener('nameOfDOMevent')
    @HostListener('focus') onFocus(){                      //When focus our input field, this method will called
        console.log("on Focus");
    }

    @HostListener('blur') onBlur(){                         //When loses focus( user leaves of our form field)
        let value: string = this.el.nativeElement.value;        // Read value of input field => nativaElement property give us access to actual DOM Object
        this.el.nativeElement.value = value.toLowerCase();
        
        if (this.format == 'lowercase')
            this.el.nativeElement.value = value.toLowerCase();
        
        else
            this.el.nativeElement.value = value.toUpperCase();    
    }


}

// HostListener Decorator function => allow us to subscribe to events raised from DOM element(DOM element hosted this directive)
// or in other word is the DOM elment has this attribute.

// In onBlur() I need to get the value from the input field => First need reference of our Host Element
// In constructor need inject and Element Reference Object => Service defined in Angular gives us access to the DOM Object



//In app.component.html => Add attribute
<input type="text" appInputFormat> 


//Would be nice to have flexibility tell Directive about target format => Maybe we cant uppercase or lowecase
//We have to use property binding
//'uppercase' => in quotes(string) => Not a property of app.component
//Only issue => Apply this Directive as attribute and then use property binding to set target format

<input type="text" appInputFormat [format]="'uppercase'"> 

//Since we only have 1 input property here, would be nicer to set target format one apply the directive as an attribute

<input type="text" [appInputFormat]="'uppercase"> //Cleaner than before 

// Just change the alias of input property to the same name of our selector => appInputFormat


//We can use Custom Directives to have more control over behaviour of DOM elements
// Pass data to directives using input properties
// If we have only one property => Use the selector of directive as alias of the property
// Use HostListener Decorator to subscribate to events raised from the DOM object