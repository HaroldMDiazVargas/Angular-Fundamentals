
// app.component-html:
<bootstrap-panel>
    <div class="heading">Heading</div> 
    <div class="body">
        <h2>Body</h2>
        <p>Some content</p>
    </div>
</bootstrap-panel> 

//panel.component.html
<div class="panel panel-default">
    <div class="panel-heading">
        <ng-content select=".heading"></ng-content>     // ng-content  will be now replace but with extra div
    </div>
    <div class="panel-body">
        <ng-content select=".body"></ng-content>
    </div>
</div>


//To achieve this (remove extra div ) => Replace the <div> with <ng-container>
//app.component.html
<bootstrap-panel>
    <ng-container class="heading">Heading</ng-container>  
    <div class="body">
        <h2>Body</h2>
        <p>Some content</p>
    </div>
</bootstrap-panel> 
        

// ng-container => Custom element in angular=> In runtime angular only take the content of ng-container
// Not render the ng-container element just take the content.
// What put in container(app) goes to content(panel.component)
//---------------------
// ONLY USE IF WANT TO RENDER RENDER SOMETHING WITHOUT PUTTING INSIDE A <div> OR any kind of HTML element
//----------------------