
import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    template: `app.component.html
  
    `
})

export class AppComponent{
    post = {
        title: 'title',
        isFavorite: true
    }


}

//The favorite.component implemented before doesn't have any property and event-binding. 
// Ideally we can set Initial state of this component using some object of Host.component(app.component)

//app.component.ts => Lets imagine we can object in memory(post) => Now in app.component.html

<favorite [isFavorite] ="post.isFavorite" (change)="onFavoriteChange()"></favorite>  //error can't bind unknown property of 'favorite'

// Add support for property and event-binding in favorite component => Add special property => Output property
// To make a component more re-usable we add a bunch of input and output properties
//Input properties => Pass input or state to a component
//Output propertie => Raise events from custom component.
// Combination of both make Component API(Application Programming Interface)

<favorite [isFavorite] ="post.isFavorite" (change)="onFavoriteChange()"></favorite>  //error can't bind unknown property of 'favorite'
//        InputProperty                  OutputProperty