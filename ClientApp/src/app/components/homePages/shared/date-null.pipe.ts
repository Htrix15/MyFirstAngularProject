import {Pipe, PipeTransform} from '@angular/core'; 


@Pipe({ name: 'dateNull' })
export class DateNullPipe implements PipeTransform {

    transform(date: string, addString: string): string {
       if(date){
        return addString + date;
       }
        return null;
    }
}