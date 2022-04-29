// In app.component.ts


import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
   canSave =true;
}

// In app.component.html

<button
[style.backgroundColor]="canSave ? 'blue':'gray'"
[style.color]="canSave ? 'white':'black'"
[style.fontWeight]="canSave ? 'bold':'normal'"
>
Save
</button>

//Button element with three Style Binding => Same expression to use the value for that style
// This template is little noisy => Similar as ngClass for multiples class binding
// Another attribute directive => ngStyle => For multiple style binding
// [ngStyle] = "expression" => "Object" => 1 or more key/value pairs
// Each key represents css style must be in quotes('')

<button
    [ngStyle]="{
        'backgroundColor':canSave ? 'blue':'gray',
         'color': canSave ? 'white':'black',
          'fontWeight': canSave ? 'blue':'gray
    }"
>
Save
</button>



//Not the better way => If using multiples styles is better encapsulated in a css class
// Depending of value of canSave => Render one of these classes