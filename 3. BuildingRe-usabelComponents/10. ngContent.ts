// Imagine to build a bootstrap panel component
// If you are using reusable components always prefix that (bootstrap-)
// Chances panel is going to clash with other component


// panel.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'bootstrap-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css']
})
export class PanelComponent{
    constructor(){}
}

// In panel.component.html
// To render bootstrap panel need two classes => panel and panel-default classes

<div class="panel panel-default">
    <div class="panel-heading">Heading</div>
    <div class="panel-body">Body</div>
</div>

//Let consumer of this panel component be able to inject text or markup

//In app.component.html
//1stOpt => Use property binding with input properties

<bootstrap-panel [body]="body"></bootstrap-panel> // => syntax weird, go to app.component.ts define property called body and there add markup

//2ndOpt => Use ngContent element => Custom element defined in angular
// In panel.component.html
// Add two injection points => Consumer can provide content into those injection points
// To distinguish ngContent element give some kind identifier => Use select attribute => Set to CSS SELECTOR
// NOT NEED SELECT ANY SELECTOR IS THERE'S ONLY 1 ng-content 
// So if the consumer has an element that MATCHES the selector(with.heading class) => Element replaces instead of ng-content

<div class="panel panel-default">
<div class="panel-heading">
<ng-content select=".heading"></ng-content> 
</div>
<div class="panel-body">
<ng-content select=".body"></ng-content>
</div>
</div>

// app.component-html:
<bootstrap-panel>
    <div class="heading"></div> //Inside can be complex html markup or just write a heading
    <div class="body">
        <h2>Body</h2>
        <p>Some content</p>
    </div>
</bootstrap-panel> 


//PROVIDE CUSTOM CONTENT TO OUR REUsable COMPONENTS 
