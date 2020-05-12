import { Injectable } from "@angular/core";
import { UsrAdmin } from "src/app/shared/models/UsrAdmin";

@Injectable()
export class AuthService {
    private checkLogon = false;

    logoff(){
        localStorage.clear();
        this.checkLogon = false;
    }
    getCheckLogon(): boolean
    {
        this.checkToken();
        return this.checkLogon
    }

    checkToken()
    {
        let tokenData = new UsrAdmin(null,null, localStorage.getItem("token"), new Date(localStorage.getItem("tokenLifetime")))
        if(tokenData.token && tokenData.tokenDateOfDeath)
        {
            if(tokenData.tokenDateOfDeath<new Date(new Date().getTime())){
                this.logoff();
            }
            else
            {
                this.logon();
            }
        } 
        else{
            this.logoff();
        }
    }
    logon()
    {
        this.checkLogon = true;
    }
}