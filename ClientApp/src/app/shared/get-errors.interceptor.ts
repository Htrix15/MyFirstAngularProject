import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators'; 
import { MessageService } from "src/app/shared/message.service";
import { Injectable } from "@angular/core";
import { MyMessage } from "./my-message";
import { AuthService } from "../components/adminPages/shared/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class GetErrorsInterceptor implements HttpInterceptor{
    constructor(private messageService: MessageService, private router: Router, private auth: AuthService ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
         .pipe( 
            tap((event)=>{
                if(event instanceof HttpResponse){
                    if(req.method=="POST" && !(req.url.endsWith("logon")) && !(req.url.endsWith("emailMessage")) ){
                        this.messageService.setOKPostMessage();
                    };
                    if(req.method=="PUT"){
                        this.messageService.setOKPutMessage();
                    }
                    if(req.method=="DELETE"){
                        this.messageService.setOKDelMessage();
                    }
                    if(req.url.endsWith("logon")){
                        this.messageService.setOKLogoninMessage();
                    }
                    
                    if(req.url.endsWith("emailMessage")){
                        this.messageService.setMessage(new MyMessage(false, "Письмо отправленно - ждите ответа"));
                    }
                }
                },
                (event: HttpErrorResponse)=>{
                    this.messageService.setMessage(new MyMessage(true, `${event.headers.get("error")} (code: ${event.status.toString()})`));
                    if(event.headers.get("tokenError")=="yes"){
                        this.auth.logoff();
                        this.router.navigate(['/admin/logon']);
                     }
                    }
                )
          ); 
    }  
}
