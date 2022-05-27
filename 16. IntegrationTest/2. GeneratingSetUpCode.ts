
// Writing all the code for set up to Integration Test
//  is repetitive and time consuming

//--In terminal
// everytimen we're gonna create a componenet => use angular-cli to do that
//                                            => angular-cli will create a basic spec file for writing integration test for that component
// But this basic spec file => created with angular-cli has unnecesary complexity
//                          => file has 2 beforeEach blocks => 1st. Configurate Testing Module
//                                                          => 2nd. Create the component
//                                                          => the reason for this is because our component template is in separate file
//                                                          => we need to instruct angular to compile that template as well as the stylesheet of the component implemenetation
//                                                              => note we have a call of method in the 1st => .compileComponents() inside code block of => async(() =>{}) function
//                                                                                                              => with this we are telling angular to compile 
//                                                                                                              => all the components we declare in declarations:[] 
//                                                                                                              => along with theirs templates and stylesheets
//                                                                                                                 => these files are external, so angular needs to acces to fyle system
//                                                                                                                 => as part of the compilation
//                                                                                                                 => accessing the file system is a bit slow
//                                                                                                                 => thats why -compileComponents() methods does this asyncronus
//                                                                                                              => async() function is one of utility function defined in angular
//                                                         => so once the 1st beforeEach block is done
//                                                            => once the components compile along with their templates and stylesheets
//                                                         => then te 2nd beforeEach is called
//                                                            => at this point we can create an instance of the component
//  However in the last lecture => we didnt have a call to the .compileComponents() method
//                              => because when we use webpack => automatically inlines => the component templates
//                                                                                      => and stylesheet in JS bundle
//                              => so the component implementation, as well as its template and stylesheet are all in the same file(JS file bundle)
//                              => this means => when using webpack(standard builder when using angular-cli)         
//                                            => we dont really need to call => .compileComponents() methods(uneccesary)
//                                            => and add extra noise => remove the 1st beforeEach(copy and paste the code inside to the 2nd beforEach)
//
// All this change  we dont need to do everytime we generate a component with angular-cli
// just quit the default generating spec file 

//--In terminal
//



//--component xx created with angular-cli

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsComponent } from './authors.component';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AuthorsComponent ]
//     })
//     .compileComponents();
//   });

  beforeEach(() => {

    
    TestBed.configureTestingModule({
        declarations: [ AuthorsComponent ]
    });


    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
