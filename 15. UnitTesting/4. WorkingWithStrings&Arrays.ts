// Test Strings and Arrays

//--greet.ts
// very simple function => give a name
//                      => return 'welcome' + name
//--greet.spec.ts
// We want to test => ensure that the name we give to the function is in the output 
// so create describe() => name it => 'greet'
//                      => create it() => name it
//                      => it('should include the name in the message', () => {})
//                      => call greet() => pass a string and see the expect.toBe('Welcome ...')
// There is a problem with this test => is too specific
//                                   => if one day a go to function greet(name) => and in return => add ex. 
//                                                                                               => return 'Welcome' + name + '!'
//                                   => the test will break => we dont want fragile test that break often
// So => instead of checking in the expect().toBe() => for the exact message
//                                                  => check for the existence of our name in the output
// 

// Arrays
// The same principle happen when testing array 
//--In getCurrencies.ts
// is a simple function that returns an array of 3 strings


// In the test => we want just assert that the result includes these items(strings) => 'USD' 'AUD' and 'EUR'
//             => but we dont care about the exact position
//             => in th efuture we may sort array items alphabetically => test should not break 


//greet.ts

export function greet(name) { 
    return 'Welcome ' + name; 
  }
  


// greet.spec.ts

import {greet} from './greet'

describe('greet', () => {
    it('should include the name in the message', () => {
        const result = greet('Harold');
        // expect(result).toBe('Welcome Harold');
        expect(result).toContain('Harold');
    })


} )



//getCurrencies.ts

export function getCurrencies() { 
    return ['USD', 'AUD', 'EUR'];
  }

//getCurrencies.spec.ts

import {getCurrencies} from './getCurrencies'

describe('getCurrencies', () => {
    it('should include the supported currencies', () => {
        const result = getCurrencies();
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
    })


} )
