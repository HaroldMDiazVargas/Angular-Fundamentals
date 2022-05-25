// We have looked various Patterns when unit testing our components:
// - State changes => methods that modify the value of 1 or more properties => easy to test
// - Forms 
// - Events(output properties)
// - Services
// These are really easy to unit test


// However there're couple of limitations of unit test:
// - If our component is using a Router => is not easy to unit test that using the tecnhiques we have seen
//                                      => we have to run our component in the Angular environment
//                                      => which for this course => refer to these kind of tests as integration tests
// - Around template bindings => if we set a property in the component
//                            => with unit test we can nto ensure => if that component render that property or not
//                            => similarly => if we click on a button in the view 
//                                         => we can not ensure if the corresponding method in the component is called or not
// For these escenerarios we are going to load our component in => an Angular environment
//                                                              => Angular is going to compile the component with template
//                                                              => Angular is going to inject dependencies
//                                                              => and then we can get that router => and put onSpy to change its implementation

