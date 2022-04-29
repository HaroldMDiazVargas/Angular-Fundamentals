// There's also another way to deal with multiple binding classes
// Instead of using twice class binding => Use ngClass directive

//First approach
<span 
class="fa-star" 
[class.fa-solid]="isFavorite" 
[class.fa-regular]="!isFavorite"  
(click)="clicked()">
</span>


//Using ngClass
// [ngClass] = "Expression" => "Object with 1 or more key:value pairs"
// Each key represent a css class and the value for that key determines if that class should be render or not
// key must be in quotes('')
// ngClass is an example of Atributte Directive => Modify attribute of existing DOM element
<span 
class="fa-star" 
[ngClass]="{
    'fa-solid': isFavorite,
    'fa-regular': !isFavorite
}"
(click)="clicked()">
</span>
