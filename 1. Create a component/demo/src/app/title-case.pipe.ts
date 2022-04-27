import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'title-case'
})

export class TitleCase implements PipeTransform {
    transform(value:string){
        if(!value)
            return null;
        return value.toUpperCase;
    }

}