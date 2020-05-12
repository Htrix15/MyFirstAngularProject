import {Component, OnInit} from '@angular/core';
import { UsrContact } from '../../../../shared/models/UsrContact';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-section',
  templateUrl: './contacts-section.component.html',
  styleUrls: ['./contacts-section.component.min.css'],
})

export class ContactsSectionComponent implements OnInit {
  public contactData: UsrContact;
  public getMap = false;
  private datasSubscribe: Subscription; 
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasSubscribe = this.route.data.subscribe(data =>{
     if(data.datas[0][0]){
            this.contactData = data.datas[0][0];
            if(data.datas[0][0].srcYMap){
              this.getMap = true;
            }
          } else{
            this.contactData= new UsrContact();
          }     
      }
    );
  }

  ngAfterViewInit(): void{
    if(this.getMap){
      this.setMap(this.contactData.srcYMap.toString());
    }
  }

  ngOnDestroy(): void { 
    if (this.datasSubscribe){ 
      this.datasSubscribe.unsubscribe(); 
    } 
  }
  
  private setMap(srcYMap: string) {
    const map = document.createElement('script');
    map.type = 'text/javascript';
    map.async = true;
    map.src = srcYMap;
    document.getElementById('map').appendChild(map);
  }
}
