import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/shared/menu.service';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html'
})
export class HomeNavigationComponent implements OnInit {
  public loadMain = false;
  public loadExperience = false;
  public loadSkills = false;
  public loadEducation = false;
  public loadAboutMe = false;
  public loadContacts = false;

  public show_menu = false;

  private datasSubscribe: Subscription;
  private menuSubscribe: Subscription;
  
  constructor(private route: ActivatedRoute, public menuService: MenuService) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      if(data.datas[0][0]){this.loadContacts = true;}
      if(data.datas[1][0]){this.loadAboutMe = true;}
      if(data.datas[2][0]){this.loadEducation = true;}
      if(data.datas[3][0]){this.loadSkills = true;}
      if(data.datas[4][0]){this.loadExperience = true;}
      if(data.datas[5][0]){this.loadMain = true;}
    });
    this.menuSubscribe = this.menuService.showMenu$.subscribe((data)=>this.show_menu=data);
  }
  
  ngOnDestroy(): void {
    if(this.datasSubscribe){
      this.datasSubscribe.unsubscribe();
    }
    if(this.menuSubscribe){
      this.menuSubscribe.unsubscribe();
    }
  }

  close(){
    setTimeout(() => { 
      this.show_menu=false;
    }, 100);
  }
}
