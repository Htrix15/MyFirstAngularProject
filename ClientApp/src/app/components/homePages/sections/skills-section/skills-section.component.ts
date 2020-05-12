import { Component, OnInit } from '@angular/core';
import { UsrSkill } from '../../../../shared/models/UsrSkill';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.min.css'],
})
export class SkillsSectionComponent implements OnInit {
  public skillsData: UsrSkill[];
  private datasSubscribe: Subscription; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      this.skillsData = data.datas[3];
    });
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }

}
