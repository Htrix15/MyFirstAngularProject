import { Component, OnInit } from '@angular/core';
import { UsrAbout } from '../../../../shared/models/UsrAbout';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-me-section',
  templateUrl: './about-me-section.component.html',
})
export class AboutMeSectionComponent implements OnInit {
  public aboutMeData: UsrAbout;
  private datasSubscribe: Subscription; 
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      if(data.datas[1][0]){
        this.aboutMeData = data.datas[1][0];
      } else {
        this.aboutMeData = new UsrAbout();
      }
    });
  }
  
  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }

}
