import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MyMessage } from "./my-message";

@Injectable()
export class MessageService{
    public getMessage$ = new Subject<MyMessage>();
    constructor(){}
    setMessage(message: MyMessage) {
        this.getMessage$.next(message);
    }
    setOKPutMessage(){
        this.getMessage$.next(new MyMessage(false, "Обновленно!"));        
    }
    setOKPostMessage(){
        this.getMessage$.next(new MyMessage(false, "Добавленно!"));        
    }
    setOKDelMessage(){
        this.getMessage$.next(new MyMessage(false, "Удалено!"));        
    }
    setOKLogoninMessage(){
        this.getMessage$.next(new MyMessage(false, "Вход выполнен!"));        
    }
}
