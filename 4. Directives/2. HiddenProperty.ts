//In app.component.html
<div>   
    List of Courses
</div>
<div> 
    No courses yet
</div>

//Another way to show/hide part of a page instead of using ngIF => use hidden attribute in html
//This attribute in html existe as property in DOM object
// Use as property to binding to underline DOM object to some expression
// However both div exist => While use ngIF the element is removed
// Better to use ngIF is work with large tree(large child) => Memory
// Angular continuos change tracking to elements even if they are hidden 
// Exception => Built-in large element tree in the right state may be costly 
// => Page with element subtree, in that case ngIF may will have negative impact on the performance of the page
// => User click button to toggle something to show/hide part of page => If build element is costly shouldn't use ngIF

// For small trees of objects => Personal preference
// For large treees => If tree is costyly use HIDDEN/ otherwise use ngIF
<div [hidden]="courses.length == 0">   //BUILD COST ELEMENT? USE THIS
    List of Courses  
</div>
<div [hidden]="course.length > 0"> 
    No courses yet
</div>