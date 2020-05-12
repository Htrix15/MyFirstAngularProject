import { Component, OnInit } from '@angular/core';
import { UsrMain } from '../../../../shared/models/UsrMain';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.min.css'],
})
export class MainSectionComponent implements OnInit {
  public mainData: UsrMain;
  private datasSubscribe: Subscription; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
      if( data.datas[5][0]){
        this.mainData = data.datas[5][0];
      }
      else
      this.mainData = new UsrMain();
    });
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }
}
