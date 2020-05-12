import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { UsrSkill } from '../../../shared/models/UsrSkill';
import { MyFunction } from 'src/app/shared/myFunctions';
import { MessageService } from 'src/app/shared/message.service';
import { MyMessage } from 'src/app/shared/my-message';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.min.css'],
  providers: [DataService]
})
export class EditSkillsComponent implements OnInit {
  public maxNumberInTurn = 0;
  public mixing = false;
  public forms = new FormArray([]);
  public skills = new Array<UsrSkill>();

  private datasSubscribe: Subscription;
  private deleteDatasSubscribe: Subscription;
  private postDatasSubscribe: Subscription;
  private putDatasSubscribe: Subscription;
  private mixDatasSubscribe: Subscription;


  constructor(private route: ActivatedRoute, private dataService: DataService, private message: MessageService) { }

  ngOnInit(): void {

    this.datasSubscribe = this.route.parent.parent.parent.data.subscribe(data =>{
      if(data.datas[3].length>0){
        this.skills = data.datas[3];
        for (let item of data.datas[3]) 
        {
          this.forms.push(new FormGroup({
            imgDb: new FormControl(item.skillImg?true:false),
            skill: new FormControl(item.skill, Validators.maxLength(20)),
            img: new FormControl()
          }, EditSkillsComponent.validateSkill));
        }
      this.maxNumberInTurn = this.skills[this.skills.length-1].numberInTurn;
    }
    })
  }

  static validateSkill(form: FormGroup): {[key: string]: boolean} { 
    if ((form.controls["skill"].value && form.controls["skill"].value.trim()) ||
      (form.controls["img"].value || form.controls["imgDb"].value)) { 
      return null; 
    } 
    return { validateSkill: true}; 
  } 

  onSelectFile(event, iForm: number){
    if( event.srcElement.files[0]!==undefined){
      const reader = new FileReader();
      reader.onload = () => {
        this.skills[iForm].skillImg = reader.result;
        this.skills[iForm].file = event.srcElement.files[0];  
      }
      reader.readAsDataURL(event.srcElement.files[0]);
    }
  }

  addSkill(){
    this.maxNumberInTurn++;
    this.skills.push(new UsrSkill(null,null,null, this.maxNumberInTurn));
    this.forms.push(new FormGroup({imgDb: new FormControl(false), skill: new FormControl(), img: new FormControl()}, EditSkillsComponent.validateSkill));  
    this.message.setMessage(new MyMessage(false, "Перед тем как перемещать навыки - сохраните новый навык!"));
  }

  deleteSkill(iForm: number){
    if(this.skills[iForm].usrSkillId){
    this.deleteDatasSubscribe = this.dataService.delUserDatas<number>(this.skills[iForm].usrSkillId,"skills").subscribe(
      (data:number) => {
        this.skills.splice(iForm,1);
        this.forms.controls.splice(iForm,1);
      }
    )}
    else{
      this.skills.splice(iForm,1);
      this.forms.controls.splice(iForm,1);
    }
  }

  submit(iForm: number) {
    const formData = new FormData();
    if(this.skills[iForm].skillImg){
      formData.append('formData', this.skills[iForm].file);
    } else{
      this.skills[iForm].skillImg = null;
    }
    let skillData = new UsrSkill(
      this.skills[iForm].usrSkillId,
      this.skills[iForm].skillImg,
      this.forms.controls[iForm].value.skill,
      this.skills[iForm].numberInTurn
    );
    formData.append('JSON', JSON.stringify(skillData));
    if(skillData.usrSkillId){
      this.putDatasSubscribe = this.dataService.putMultipartDatas(formData, "skill").subscribe(
        (updateData: UsrSkill) => {
          this.skills[iForm].skillImg = updateData.skillImg;
          this.skills[iForm].numberInTurn = updateData.numberInTurn;
          this.skills[iForm].skill = updateData.skill;
        }
      );
    } else {
      this.postDatasSubscribe = this.dataService.postMultipartDatas(formData, "skill").subscribe(
        (updateData: UsrSkill) => {
           this.skills[iForm].usrSkillId = updateData.usrSkillId; 
           this.skills[iForm].skillImg = updateData.skillImg;
           this.skills[iForm].numberInTurn = updateData.numberInTurn;
           this.skills[iForm].skill = updateData.skill;
        }
      );
    }
  }

  saveMixing()
  {
    this.mixDatasSubscribe = this.dataService.putUserDatas<Array<UsrSkill>>(this.skills, "mixSkill").subscribe();
  }

  move(iForm: number, step:number){
    let swap = this.skills[iForm + step].numberInTurn;
    this.skills[iForm + step].numberInTurn =  this.skills[iForm].numberInTurn ;
    this.skills[iForm].numberInTurn  = swap;
    MyFunction.swapArray<UsrSkill[]>(this.skills, iForm, step);
    MyFunction.swapArray<AbstractControl[]>( this.forms.controls, iForm, step);
    this.mixing = true;
  }

  toLeft(iForm: number){
    if(iForm!==0){
      this.move(iForm,-1);
    }
  }

  toRight(iForm: number){
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
