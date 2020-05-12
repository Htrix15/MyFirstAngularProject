import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/shared/menu.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html'
})
export class AdminNavigationComponent implements OnInit {

  public show_menu = false;
  private menuSubscribe: Subscription;

  constructor( public menuService: MenuService) { }

  ngOnInit(): void {
    this.menuSubscribe = this.menuService.showMenu$.subscribe((data)=>{
      this.show_menu=data});
  }

  close(){
    setTimeout(() => { 
      this.show_menu=false;
    }, 100);
  }

  ngOnDestroy(): void {
    if(this.menuSubscribe){
      this.menuSubscribe.unsubscribe();
    }
  }
}
