import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsrAdmin } from 'src/app/shared/models/UsrAdmin';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.min.css'],
  providers: [DataService]
})
export class LogonComponent implements OnInit {
  public form: FormGroup;
  public logoffCheck = true;
  constructor(private dataService: DataService, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.logoffCheck = !this.auth.getCheckLogon();
  }
  
  submit(){
    if(this.form.controls.login.value.trim() && this.form.controls.password.value.trim()){
      let user = new UsrAdmin(this.form.controls.login.value,this.form.controls.password.value)
      this.dataService.postUserDatas<UsrAdmin>(user, "logon").subscribe(
        (data: UsrAdmin) =>{
          if(data.token && data.tokenDateOfDeath!==null){
            localStorage.setItem("token", data.token);
            localStorage.setItem("tokenLifetime", data.tokenDateOfDeath.toString());
            this.logoffCheck = false;
            this.auth.logon();
          }
        }
      );
    }
  }

  logoff(){
    this.auth.logoff();
    this.form.reset();
    this.logoffCheck = true;   
  }
}
