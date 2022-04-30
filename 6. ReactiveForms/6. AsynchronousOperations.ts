// Need to call the server to validate a given value
// How simulate the call to the server? 
// Calling the server is what whe classifies an Asynchronous Operation
// When we call the server => going to be a delay => maybe .5s, 3s, 20s- => Depending of connection speed
// In these situations the process that is executing our code doesnt want to block while waiting for the result coming back from the server
// Because if the process bllock  => user cannot interact with browser => So process call server behind scene => when is ready display to user
// Asynchronous => mean Non-Blocking 
// Asynchronous Operations in Jscript => Calling the server(AJAX)
//                                       set the Timer functions => setTimeout(callbackFn, timeINms) || setInterval() => Simulate call to the server

                                        // setTimeout( () =>{
                                        //     console.log('ok');
                                        // }, 2000)             //We want this function executes after 2000ms


//In username.validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms'
export class UsernameValidators{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{
        if ((control.value as string).indexOf(' ') >0) 
            return { cannotContainSpace:true };
        return null;
    } 

    static shouldBeUnique(control: AbstractControl) : ValidationErrors | null{
      
        //Simulate the call server => Simple rule username is =>Mosh assume is taken, otherwise is unique
        setTimeout( () => {

            if (control.value === 'mosh')  //is mosh ? SHOULD BE AN UNIQUE VALUE
                return { shouldBeUnique:true }
            return null;

        }, 2000);

        return null; 
    }
}

// We cant not use this validator function inside the component => The function will always return NULL
 // Because we are dealing with an asynchronous operation 
 // Validator that involves asynchronous operation => Use different signature for our validator 