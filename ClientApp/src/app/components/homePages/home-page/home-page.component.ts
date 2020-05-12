import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  public loadMain = false;
  public loadExperience = false;
  public loadSkills = false;
  public loadEducation = false;
  public loadAboutMe = false;
  public loadContacts = false;

  private datasSubscribe: Subscription;
   
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      if(data.datas[0][0]){this.loadContacts = true;}
      if(data.datas[1][0]){this.loadAboutMe = true;}
      if(data.datas[2][0]){this.loadEducation = true;}
      if(data.datas[3][0]){this.loadSkills = true;}
      if(data.datas[4][0]){this.loadExperience = true;}
      if(data.datas[5][0]){this.loadMain = true;}
    });
  }
  ngOnDestroy(): void {
    this.datasSubscribe.unsubscribe();
  }
}
