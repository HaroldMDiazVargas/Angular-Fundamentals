//Leading Asterisk => Telling Angulart to rewriting this block using ng-template element
//1. Creat <ng-template>
//2.Put <div> inside <ng-template> => Content od that <div> is List of Courses
//3. Then apply ngIf as property binding of the <ng-template>
//4. For the else part is goin to apply similar property binding on the other <ng-template> take same expression with not operatot(!)



//--------------------------------------------------
<div *ngIf="courses.length>0:else noCourses">   
    List of Courses
</div>
//----------------------------------------------------
<ng-template #noCourses>
    No courses yet
</ng-template>




//--------------------------------------------------
<ng-template [ngIf]="courses.length > 0">   //1. => 3.
    <div>                                   //2.
        List of Courses
    </div>
</ng-template>
//----------------------------------------------------
<ng-template [ngIf]="!courses.length > 0">  //4. Not expression
    No courses yet
</ng-template>

//When we use *(leading asterisk) with our structural directive(ngFor,ngIf,ngSwitchCase)
//Angular rewrites the block using <ng-template> => Much easier hard work to angular