import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { MessageService } from "src/app/shared/message.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SetTokenInterceptor implements HttpInterceptor{
    constructor(private messageService: MessageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method!="GET" && !(req.url.endsWith("logon"))){
            const clonedRequest = req.clone({ 
                headers: req.headers.append('token', localStorage.getItem("token")?localStorage.getItem("token"):"") 
            });
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }  
}
