import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsrMain } from 'src/app/shared/models/UsrMain';
import { UsrContact } from 'src/app/shared/models/UsrContact';
import { UsrAbout } from 'src/app/shared/models/UsrAbout';
import { MessageService } from 'src/app/shared/message.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-other',
  templateUrl: './edit-other.component.html',
  styleUrls: ['./edit-other.component.min.css'],
  providers: [DataService]
})
export class EditOtherComponent implements OnInit {

  public formMain: FormGroup;
  public formContacts: FormGroup;
  public formAbout: FormGroup;

  public usrMain = new UsrMain();
  public usrContacts = new UsrContact();
  public usrAbout = new  UsrAbout(); 

  private dataMainSubscribe: Subscription;
  private dataContactsSubscribe: Subscription;
  private dataAboutSubscribe: Subscription;

  private putMainSubscribe: Subscription;
  private putContactsSubscribe: Subscription;
  private putAboutSubscribe: Subscription;

  private postMainSubscribe: Subscription;
  private postContactsSubscribe: Subscription;
  private postAboutSubscribe: Subscription;


  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataMainSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
        this.usrMain = new UsrMain();
        let welcomeText="";
        let photo;
        if(data.datas[5].length>0){
          this.usrMain = data.datas[5][0];
          photo = data.datas[5][0].photo;
          welcomeText = data.datas[5][0].welcomeText;
        } 
        this.formMain = new FormGroup({
          imgDb: new FormControl(photo?true:false),
          photo: new FormControl(),
          welcomeText: new FormControl(welcomeText, Validators.required)
        }, EditOtherComponent.validatePhoto);
      }
    );
    this.dataContactsSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
        this.usrContacts = new UsrContact();
        let phone = null;
        let eMail = null;
        let descAdditionalContact = null;
        let additionalContact = null;
        let srcYMap = null;
        let surname = null;
        let name = null;
        if(data.datas[0].length>0){
          this.usrContacts = data.datas[0][0];
          phone = data.datas[0][0].phone;
          eMail = data.datas[0][0].eMail;
          descAdditionalContact = data.datas[0][0].descAdditionalContact;
          additionalContact = data.datas[0][0].additionalContact;
          srcYMap = data.datas[0][0].srcYMap;
          surname = data.datas[0][0].surname;
          name = data.datas[0][0].name;
        }
        this.formContacts = new FormGroup({
          surname: new FormControl(surname, Validators.required),
          name: new FormControl(name, Validators.required),
          phone: new FormControl(phone, Validators.required),
          eMail: new FormControl(eMail, [Validators.required, Validators.email]),
          descAdditionalContact: new FormControl(descAdditionalContact),
          additionalContact: new FormControl(additionalContact),
          srcYMap: new FormControl(srcYMap, EditOtherComponent.validateYMap)
        }, EditOtherComponent.validateAdditionalContact);
      }
    );
    this.dataAboutSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
        this.usrAbout = new UsrAbout();
        let language = "";
        let city = "";
        let hobby = "";
        if(data.datas[1].length>0){
          this.usrAbout = data.datas[1][0];
          language = data.datas[1][0].language;
          city = data.datas[1][0].city;
          hobby = data.datas[1][0].hobby;
        }
        this.formAbout = new FormGroup({
          language: new FormControl(language, Validators.required),
          city: new FormControl(city, Validators.required),
          hobby: new FormControl(hobby, Validators.required)
        });
      }
    );
  }

  static validatePhoto(form: FormGroup): {[key: string]: boolean} { 
    if (form.controls["photo"].value || form.controls["imgDb"].value){ 
      return null; 
    } 
    return { validatePhoto: true}; 
  } 

  static validateAdditionalContact(form: FormGroup): {[key: string]: boolean} { 
    if(
        ((
          form.controls["descAdditionalContact"].value && 
          !form.controls["additionalContact"].value
        )|| 
        (
          !form.controls["descAdditionalContact"].value && 
          form.controls["additionalContact"].value
        ))
      ){ 
       form.controls["additionalContact"].setErrors({validateAdditionalContact: true});
       form.controls["descAdditionalContact"].setErrors({validateAdditionalContact: true});  
      return { validateAdditionalContact: true}; 
    } 
    form.controls["additionalContact"].setErrors(null);
    form.controls["descAdditionalContact"].setErrors(null);
    return null; 
  } 
  
  static validateYMap(control: FormControl):{[key: string]: boolean}{
    if(control.value){
      let str = control.value as String;
      if(!str.startsWith("https://api-maps.yandex.ru/services/constructor/")){
        return { validateYMap: true}; 
      }
    }
    return null;
  }


  onSelectFile(event){
    if( event.srcElement.files[0]!==undefined){
      const reader = new FileReader();
      reader.onload = () => {
        this.usrMain.photo = reader.result;
        this.usrMain.file = event.srcElement.files[0];  
      }
      reader.readAsDataURL(event.srcElement.files[0]);
    }
  }

  submitMain()
  {
    const formData = new FormData();
    if(this.usrMain.file){
      formData.append('formData', this.usrMain.file);
    }
    let mainData = new UsrMain(
      this.usrMain.usrMainId,
      this.usrMain.photo,
      this.formMain.controls.welcomeText.value
    );
    formData.append('JSON', JSON.stringify(mainData));
    if(mainData.usrMainId){
      this.putMainSubscribe = this.dataService.putMultipartDatas(formData, "main")
      .subscribe(
        (updateData: UsrMain) => {
          this.usrMain.photo = updateData.photo;
          this.usrMain.welcomeText = updateData.welcomeText;
        }
      );
    } else {
      this.postMainSubscribe =  this.dataService.postMultipartDatas(formData, "main").subscribe(
        (updateData: UsrMain) => {
          this.usrMain.usrMainId = updateData.usrMainId; 
          this.usrMain.photo = updateData.photo;
          this.usrMain.welcomeText = updateData.welcomeText;
        }
      );
    }
  }

  submitContacts()
  {
    let contactsData = new UsrContact(
      this.usrContacts.usrContactId,
      this.formContacts.controls.phone.value,
      this.formContacts.controls.eMail.value,
      this.formContacts.controls.descAdditionalContact.value,
      this.formContacts.controls.additionalContact.value,
      this.formContacts.controls.srcYMap.value,
      this.formContacts.controls.surname.value,
      this.formContacts.controls.name.value
    );
    if(contactsData.usrContactId){
      this.putContactsSubscribe = this.dataService.putUserDatas<UsrContact>(contactsData, "contact").subscribe(
        (updateData: UsrContact) =>{
          this.usrContacts.additionalContact = updateData.additionalContact;
          this.usrContacts.descAdditionalContact = updateData.descAdditionalContact;
          this.usrContacts.eMail = updateData.eMail;
          this.usrContacts.name = updateData.name;
          this.usrContacts.phone = updateData.phone;
          this.usrContacts.srcYMap = updateData.srcYMap;
          this.usrContacts.surname = updateData.surname;
        }
      );
    } else{
      this.postContactsSubscribe = this.dataService.postUserDatas<UsrContact>(contactsData, "contact").subscribe(
        (updateData: UsrContact) =>{
          this.usrContacts.usrContactId = updateData.usrContactId;
          this.usrContacts.additionalContact = updateData.additionalContact;
          this.usrContacts.descAdditionalContact = updateData.descAdditionalContact;
          this.usrContacts.eMail = updateData.eMail;
          this.usrContacts.name = updateData.name;
          this.usrContacts.phone = updateData.phone;
          this.usrContacts.srcYMap = updateData.srcYMap;
          this.usrContacts.surname = updateData.surname;
        }
      );
    }
  }
  submitAbout()
  {
    let aboutData = new UsrAbout(
      this.usrAbout.usrAboutId,
      this.formAbout.controls.language.value,
      this.formAbout.controls.city.value,
      this.formAbout.controls.hobby.value,
    );
    if(aboutData.usrAboutId){
      this.putAboutSubscribe = this.dataService.putUserDatas<UsrAbout>(aboutData, "about").subscribe(
        (updateData: UsrAbout) =>{
          this.usrAbout.city = updateData.city;
          this.usrAbout.hobby = updateData.hobby;
          this.usrAbout.language = updateData.language;
        }
      );
    } else{
      this.postAboutSubscribe = this.dataService.postUserDatas<UsrAbout>(aboutData, "about").subscribe(
        (updateData: UsrAbout) =>{
          this.usrAbout.usrAboutId = updateData.usrAboutId;
          this.usrAbout.city = updateData.city;
          this.usrAbout.hobby = updateData.hobby;
          this.usrAbout.language = updateData.language;
        }
      );
    }
  }

}
