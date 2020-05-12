import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { UsrEducation } from '../../../shared/models/UsrEducation';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { MyFunction } from 'src/app/shared/myFunctions';
import { MessageService } from 'src/app/shared/message.service';
import { MyMessage } from 'src/app/shared/my-message';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  providers: [DataService]
})

export class EditEducationComponent implements OnInit {
  public maxNumberInTurn = 0;
  public forms = new FormArray([]);
  public mixing = false;
  public educations = new Array<UsrEducation>();

  private datasSubscribe: Subscription;
  private deleteDatasSubscribe: Subscription;
  private postDatasSubscribe: Subscription;
  private putDatasSubscribe: Subscription;
  private mixDatasSubscribe: Subscription;

  constructor(private route: ActivatedRoute, private dataService: DataService, private message: MessageService) { }

  ngOnInit(): void {

    this.datasSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
      if(data.datas[2].length>0){
        this.educations = data.datas[2];
        for (let item of data.datas[2]) {
          this.forms.push(new FormGroup({
            institution: new FormControl(item.institution, Validators.required),
            dateCompletion: new FormControl(item.dateCompletion, Validators.required),
            specialty: new FormControl(item.specialty, Validators.required),
            gradePoint: new FormControl(item.gradePoint),
          }));
        }
        this.maxNumberInTurn = this.educations[this.educations.length-1].numberInTurn;
      }
      })
  }
  
  saveMixing()
  {
    this.mixDatasSubscribe = this.dataService.putUserDatas<Array<UsrEducation>>(this.educations, "mixEducations").subscribe();
  }

  addEducation(){
    this.maxNumberInTurn++;
    this.educations.push(new UsrEducation(null,null,null,null,null,this.maxNumberInTurn));
    this.forms.push(new FormGroup({
      institution: new FormControl(null, Validators.required),
      dateCompletion: new FormControl(null, Validators.required),
      specialty: new FormControl(null, Validators.required),
      gradePoint: new FormControl(),
    
    }));  
    this.message.setMessage(new MyMessage(false, "Перед тем как перемещать образование - сохраните новую запись!"));
  }

  deleteEducation(iForm: number){
    if(this.educations[iForm].usrEducationId){
    this.deleteDatasSubscribe = this.dataService.delUserDatas<number>(this.educations[iForm].usrEducationId,"educations").subscribe(
      (data:number) => {
        this.educations.splice(iForm,1);
        this.forms.controls.splice(iForm,1);
      }
    )}
    else{
      this.educations.splice(iForm,1);
      this.forms.controls.splice(iForm,1);
    }
  }

  submit(iForm:number) {
    let educationData = new UsrEducation(
      this.educations[iForm].usrEducationId,
      this.forms.controls[iForm].value.institution,
      this.forms.controls[iForm].value.dateCompletion,
      this.forms.controls[iForm].value.specialty,
      this.forms.controls[iForm].value.gradePoint,
      this.educations[iForm].numberInTurn
    );
    if(educationData.usrEducationId){
      this.putDatasSubscribe =  this.dataService.putUserDatas<UsrEducation>(educationData, "educations").subscribe(
        (updateData: UsrEducation) => {
          this.educations[iForm].institution = updateData.institution;
          this.educations[iForm].dateCompletion = updateData.dateCompletion;
          this.educations[iForm].gradePoint = updateData.gradePoint;
          this.educations[iForm].numberInTurn = updateData.numberInTurn;
          this.educations[iForm].specialty = updateData.specialty;
        }       
      );
    } else {
      this.postDatasSubscribe = this.dataService.postUserDatas<UsrEducation>(educationData, "educations").subscribe(
        (updateData: UsrEducation) =>{
          this.educations[iForm].usrEducationId = updateData.usrEducationId;
          this.educations[iForm].institution = updateData.institution;
          this.educations[iForm].dateCompletion = updateData.dateCompletion;
          this.educations[iForm].gradePoint = updateData.gradePoint;
          this.educations[iForm].numberInTurn = updateData.numberInTurn;
          this.educations[iForm].specialty = updateData.specialty;
        }
      );
    }
  }

  move(iForm: number, step:number){
    let swap = this.educations[iForm + step].numberInTurn;
    this.educations[iForm + step].numberInTurn =  this.educations[iForm].numberInTurn ;
    this.educations[iForm].numberInTurn  = swap;
    MyFunction.swapArray<UsrEducation[]>(this.educations, iForm, step);
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
      let step = 1;
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
