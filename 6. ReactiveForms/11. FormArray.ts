// Sometimes we need to work with an array of objects in our form
// e.x => Text box to enter content/word to cover in a course 
// You enter a word+enter then see below 'stack'=> Add if click in any of the content/word it deletes

// AbstractControl(parent) => FormArray, FormControl and FormGroup are all derivatives
// When dealing with an array of objects instead of FormControl => Use FormArray class 
// FormArray(abstractControlArray) => ([]) => Container

// this.form.get => Return  AbstractControl object => Doesnt have push method
//.push method in FormArray object => Expects an AbstractControl (depending of your app id FormControl or FormGroup object)
//.push(new FormContorl(topic.value))
//                  -----Initilize---- it with the value in the input field(HTMLInputElement object)

// form.get('topics').controls => Property where is all FormControl objects in an array


// Add the remove functionlity => In <li> handle (click) and pass to a method the FormControl object

// In new-course.component.html 

<form>
    <input
        type="text" class="form-control"
        #topic
        (keyup.enter) = "addTopic(topic)">
        <ul class="list-group">
            <li 
            class="list-group-item"
            (click)="removeTopic(topic)"
            *ngFor ="let topic of topics.controls">  //Iterate over all FormControl objects inside the array
            {{ topic.value }}            
            </li>
        </ul>
</form>

// In  new-course.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'


@Component({
selector: 'signup-form',
templateUrl: './new-course-form.component.html',
styleUrls: ['./new-course-form.component.css']
})
export class NewCourseComponent {
    form = new FormGroup({
        topics: new FormArray([])

    })

    addTopic(topic: HTMLInputElement){      //type of HTMLInputElement to avoid think it's a JSON object
        // (this.form.get('topics')  as FormArray).push(new FormControl(topic.value));  //Refactoring
        this.topics.push(new FormControl(topic.value));   
        topic.value = '';               // Clear the input field after press enter
        
    }

    removeTopic(topic: FormControl){
        let index = this.topics.controls.indexOf(topic);
        this.topics.removeAt(index);
    }

    get topics(){
        return this.form.get('topics') as FormArray;
    }


}
