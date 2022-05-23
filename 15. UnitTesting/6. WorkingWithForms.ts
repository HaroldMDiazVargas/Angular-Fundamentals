


//--todo-form.component.ts
// In the constructor que are using a FormBuilder object to create a form group with 2 form controls
// we are assuming that template for this component is going to use this Form object(thi.form = ...)
// There're 2 things we need to assert(test):
// 1. when this component is initialized => we will have a form group with 2 form control objects
//                                       => and the name of these form control objects should be called => name and email
//                                       => because this is what our template expects
// 2. Around the validator for name control
//    we want to ensure that this name control(field) is required
// 

//--todo-form.component.spec.ts
// in the beforeEach() => initiliaze the component => new TodoFormComponent(new FormBuilder())
// tests:
//      => 1. it() => 'should create a form with 2 controls'
//                 => in this test we are not gonna have Arrange Act and Assert => because we're verify the initial state of this component
//                                                                              => we are not acting on it
//                 =>  expect(component.form.contains('name)).toBeTruthy();
//                 => expect(component.form.contains('email)).toBeTruthy();
//     => 2. it() => 'should make the name control required'
//                => let control = component.form.get('name') 
//                => control.setValue('');
//                => expect(control.valid).toBeFalsy();
// If insteaf of required we have different validator
// we could potentially have more than 1 test => and test the controls with different inputs



//--todo-form.component.ts


import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export class TodoFormComponent { 
  form: FormGroup; 

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: [''],
    });
  }
}

//--todo-form.component.spec.ts

import { TodoFormComponent } from './todo-form.component'; 
import { FormBuilder} from '@angular/forms';

describe('TodoFormComponent', () => {
  var component: TodoFormComponent; 

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('should create a form with 2 controls', () => {
      expect(component.form.contains('name')).toBeTruthy();
  });

  it('', () => {
      let control = component.form.get('name');

      control.setValue = ('');
      
      expect(control.valid).toBeFalsy();
  });
});