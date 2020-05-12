import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable, Component } from "@angular/core";
import { MessageService } from "src/app/shared/message.service";
import { MyMessage } from "src/app/shared/my-message";
import { AuthService } from "./auth.service";

@Injectable()
export class ChangeUserData implements CanActivate{
    private check = false;
    constructor(private router: Router, private messageService: MessageService, private auth: AuthService){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean
    {
        if (this.auth.getCheckLogon()) return true;
        this.messageService.setMessage(new MyMessage(true, "Не админам сюда нельзя"));
        this.router.navigate(['/admin/logon']);
    }
    
}