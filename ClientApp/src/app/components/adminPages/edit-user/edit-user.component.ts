import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { UsrChangeUser } from 'src/app/shared/models/UsrChangeUser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  providers: [DataService]
})
export class EditUserComponent implements OnInit {
    public login: UsrChangeUser;
    public password: UsrChangeUser;

    public formLogin: FormGroup;
    public formPassword: FormGroup;

    constructor(private dataService: DataService) { }
    
    ngOnInit(): void {
        this.formLogin = new FormGroup({
            oldLogin: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            newLogin: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          });
        this.formPassword = new FormGroup({
            oldPassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            newPassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          });
    }

    submitLogin(){
        let loginData = new UsrChangeUser(
            this.formLogin.controls.oldLogin.value,
            this.formLogin.controls.newLogin.value
        );
        this.dataService.putUserDatas<UsrChangeUser>(loginData,"login").subscribe();
    }

    submitPassword(){
        let passwordData = new UsrChangeUser(
            this.formPassword.controls.oldPassword.value,
            this.formPassword.controls.newPassword.value
        );
        this.dataService.putUserDatas<UsrChangeUser>(passwordData,"password").subscribe();
    }
}