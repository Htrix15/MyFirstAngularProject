import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { FormArray, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { UsrExperience } from 'src/app/shared/models/UsrExperience';
import { DatePipe } from '@angular/common';
import { MyFunction } from 'src/app/shared/myFunctions';
import { MyMessage } from 'src/app/shared/my-message';
import { MessageService } from 'src/app/shared/message.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  providers: [DataService, DatePipe]
})
export class EditExperienceComponent implements OnInit {
  public maxNumberInTurn = 0;
  public forms = new FormArray([]);
  public mixing = false;
  public experiences = new Array<UsrExperience>();

  private datasSubscribe: Subscription;
  private deleteDatasSubscribe: Subscription;
  private postDatasSubscribe: Subscription;
  private putDatasSubscribe: Subscription;
  private mixDatasSubscribe: Subscription;
 

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private datepipe: DatePipe,
              private message: MessageService) { }

  ngOnInit(): void {
    
    this.datasSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
        if(data.datas[4].length>0){
        this.experiences = data.datas[4];
        for(let item of data.datas[4]) {
          this.forms.push(new FormGroup({
            job: new FormControl(item.job, Validators.required),
            dateStart: new FormControl( this.datepipe.transform(item.dateStart, 'yyyy-MM'), Validators.required),
            dateEnd: new FormControl( this.datepipe.transform(item.dateEnd, 'yyyy-MM')),
            website: new FormControl(item.website),
            duties: new FormControl(item.duties, Validators.required),
            skills: new FormControl(item.skills, Validators.required),
            gitHub: new FormControl(item.gitHub),
            position: new FormControl(item.position)
          }));
        }
        this.maxNumberInTurn = this.experiences[this.experiences.length-1].numberInTurn;
      } 
      });
  }
  
  deleteExperiences(iForm: number){
    if(this.experiences[iForm].usrExperienceId){
    this.deleteDatasSubscribe = this.dataService.delUserDatas<number>(this.experiences[iForm].usrExperienceId,"experiences").subscribe(
      (data:number) => {
        this.experiences.splice(iForm,1);
        this.forms.controls.splice(iForm,1);
      }
    )}
    else{
      this.experiences.splice(iForm,1);
      this.forms.controls.splice(iForm,1);
    }
  }

  saveMixing()
  {
    this.mixDatasSubscribe = this.dataService.putUserDatas<Array<UsrExperience>>(this.experiences, "mixExperiences").subscribe();
  }
  
  addExperiences(){
    this.maxNumberInTurn++;
    this.experiences.push(new UsrExperience(null,null,null,null,null,null,null,null,null,this.maxNumberInTurn));
    this.forms.push(new FormGroup({
      job: new FormControl(null, Validators.required),
      dateStart: new FormControl(null, Validators.required),
      dateEnd: new FormControl(),
      website: new FormControl(),
      duties: new FormControl(null, Validators.required),
      skills: new FormControl(null, Validators.required),
      gitHub: new FormControl(null),
      position: new FormControl(null)
    }));
    this.message.setMessage(new MyMessage(false, "Перед тем как перемещать опыт работы - сохраните новую запись!"));  
  }

  submit(iForm:number) {
    let dataStart = this.forms.controls[iForm].value.dateStart?new Date(this.forms.controls[iForm].value.dateStart):null;
    let dataEnd = this.forms.controls[iForm].value.dateEnd?new Date(this.forms.controls[iForm].value.dateEnd):null;
    let experiencesData = new UsrExperience(
      this.experiences[iForm].usrExperienceId,
      this.forms.controls[iForm].value.job,
      dataStart,
      dataEnd,
      this.forms.controls[iForm].value.website,
      this.forms.controls[iForm].value.duties,
      this.forms.controls[iForm].value.skills,
      this.forms.controls[iForm].value.position,
      this.forms.controls[iForm].value.gitHub,
      this.experiences[iForm].numberInTurn
    );
    if(experiencesData.usrExperienceId){
      this.putDatasSubscribe = this.dataService.putUserDatas<UsrExperience>(experiencesData, "experiences").subscribe(
        (updateData: UsrExperience) =>{
          this.experiences[iForm].usrExperienceId = updateData.usrExperienceId;
          this.experiences[iForm].dateEnd = updateData.dateEnd;
          this.experiences[iForm].dateStart = updateData.dateStart;
          this.experiences[iForm].duties = updateData.duties;
          this.experiences[iForm].job = updateData.job;
          this.experiences[iForm].numberInTurn = updateData.numberInTurn;
          this.experiences[iForm].position = updateData.position;
          this.experiences[iForm].skills = updateData.skills;
          this.experiences[iForm].gitHub = updateData.gitHub;
          this.experiences[iForm].website = updateData.website;
        }
      );
    } else {
      this.postDatasSubscribe =  this.dataService.postUserDatas<UsrExperience>(experiencesData, "experiences").subscribe(
        (updateData: UsrExperience) =>{
          this.experiences[iForm].usrExperienceId = updateData.usrExperienceId;
          this.experiences[iForm].dateEnd = updateData.dateEnd;
          this.experiences[iForm].dateStart = updateData.dateStart;
          this.experiences[iForm].duties = updateData.duties;
          this.experiences[iForm].job = updateData.job;
          this.experiences[iForm].numberInTurn = updateData.numberInTurn;
          this.experiences[iForm].position = updateData.position;
          this.experiences[iForm].skills = updateData.skills;
          this.experiences[iForm].gitHub = updateData.gitHub;
          this.experiences[iForm].website = updateData.website;
        }
      );
    }
  }

  move(iForm: number, step:number){
    let swap = this.experiences[iForm + step].numberInTurn;
    this.experiences[iForm + step].numberInTurn =  this.experiences[iForm].numberInTurn ;
    this.experiences[iForm].numberInTurn  = swap;
    MyFunction.swapArray<UsrExperience[]>(this.experiences, iForm, step);
    MyFunction.swapArray<AbstractControl[]>( this.forms.controls, iForm, step);
    this.mixing = true;
  }

  toUp(iForm: number){
    if(iForm!==0){
      this.move(iForm,-1);
    }
  }

  toDown(iForm: number){
    if(iForm!==this.forms.length-1){
      this.move(iForm,1);
    }
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    }
    if (this.deleteDatasSubscribe){ 
      this.deleteDatasSubscribe.unsubscribe(); 
    }
    if (this.postDatasSubscribe){ 
      this.postDatasSubscribe.unsubscribe(); 
    }
    if (this.putDatasSubscribe){ 
      this.putDatasSubscribe.unsubscribe(); 
    }
    if (this.mixDatasSubscribe){ 
      this.mixDatasSubscribe.unsubscribe(); 
    }
  }


}
