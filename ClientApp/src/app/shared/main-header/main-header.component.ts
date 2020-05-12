import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UsrContact } from '../models/UsrContact';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsrEmail } from '../models/UsrEmail';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.min.css'],
  providers: [DataService]
})


export class MainHeaderComponent implements OnInit {
  public chechMessage = false;
  public textMessage = "";
  public contactData: UsrContact;
  public typeMessageError = true;
  private datasSubscribe: Subscription; 
  private messageSubscribe: Subscription; 
  private emailSubscribe: Subscription; 

  public showEmailWindow = false;
  public formEmailWindow: FormGroup;
  

  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService, private menuService: MenuService) { }

  ngOnInit(): void {

    this.formEmailWindow = new FormGroup({
      eMail: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null),
      textMessage: new FormControl(null, Validators.required)
    });

    this.messageSubscribe =  this.messageService.getMessage$.subscribe((message)=>{ 
        this.textMessage = message.messageText;
        this.typeMessageError = message.error;
        this.chechMessage = true;
        setTimeout(()=>{this.chechMessage=false;},3000);
    });

    this.datasSubscribe = this.route.data.subscribe(data =>{
      if(data.datas[0][0]){
        this.contactData = data.datas[0][0];
      } else{
        this.contactData = new UsrContact();
      }      
    });
  }

  showMenu(){
    this.menuService.showMenu();
  }
  
  submit(){
    let emailData = new UsrEmail(
      this.formEmailWindow.controls.eMail.value,
      this.formEmailWindow.controls.name.value,
      this.formEmailWindow.controls.textMessage.value
    );
      this.emailSubscribe = this.dataService.postUserDatas<UsrEmail>(emailData, "emailMessage").subscribe();
      this.showEmailWindow = false;
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
    if (this.messageSubscribe){ 
      this.messageSubscribe.unsubscribe(); 
    } 
    if (this.emailSubscribe){ 
      this.emailSubscribe.unsubscribe(); 
    } 
  }

}
