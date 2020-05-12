import { Component, OnInit } from '@angular/core';
import { UsrExperience } from '../../../../shared/models/UsrExperience';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.min.css'],
})
export class ExperienceSectionComponent implements OnInit {
  public experiencesData: UsrExperience[];
  private datasSubscribe: Subscription; 
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
           this.experiencesData = data.datas[4];
    });
  }
  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }
}
