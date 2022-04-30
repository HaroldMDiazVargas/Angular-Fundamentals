// Let's add all derivaties in form fiel => FormGroup, FormControl and FormArray => Let's add complexity

// In angular we have a class called FormBuilder => Use  for building forms in a easier/shorter way
// 1.Inject FormBuilder object to constructor()
// FormBuilder object has three methods => 1.group, 2.control and 3.array
// 1- .group({}) => Pass an object
// 1.2 - name: .control() => instead if want to create controls => name: [argumentsOfFormControlObject]
//   name: ['',Validators.required]
// 1.1 - contact: .group({}) => Pass key:values (email: [argumentsOfFormControlObject])
// 1.3 - topics:fb.array([])



// In new-course.component.html 

<form>
    <input
        type="text" class="form-control">
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
    form;

    // form = new FormGroup({   
    //     name: new FormControl(),
    //     contact: new FormGroup({
    //         email: new FormControl(),
    //         phone: new FormControl()
    //     })
    //     topics: new FormArray([])

    // })

    constructor(fb: FormBuilder){
        this.form = fb.group({
            // name : fb.control()     //Is not cleaner thant formal syntax
            name: ['',Validators.required], //Control
            contact: fb.group({             //Group
                email: [],                  //Control
                phone: []
            }),
            topics: fb.array([])
        })

    }

}
