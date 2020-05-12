import { Component, OnInit } from '@angular/core';
import { UsrEducation } from '../../../../shared/models/UsrEducation';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
})
export class EducationSectionComponent implements OnInit {
  public educationsData: UsrEducation[];
  private datasSubscribe: Subscription; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      this.educationsData = data.datas[2];
    });
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }
}
