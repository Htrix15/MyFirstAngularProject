import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class MenuService{
    public showMenu$ = new Subject<boolean>();
    constructor(){}
    showMenu(){
        this.showMenu$.next(true);       
    }

}