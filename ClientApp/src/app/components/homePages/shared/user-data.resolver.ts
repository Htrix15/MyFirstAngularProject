import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, forkJoin } from "rxjs";
import { Injectable } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { UsrAbout } from "src/app/shared/models/UsrAbout";
import { UsrContact } from "src/app/shared/models/UsrContact";
import { UsrEducation } from "src/app/shared/models/UsrEducation";
import { UsrExperience } from "src/app/shared/models/UsrExperience";
import { UsrMain } from "src/app/shared/models/UsrMain";
import { UsrSkill } from "src/app/shared/models/UsrSkill";

@Injectable()
export class UserDataResolver implements Resolve<any>{
    constructor(private dataService: DataService){}

    public usrAbout: Array<UsrAbout>;
    public usrContacts: Array<UsrContact>;
    public usrEducation: Array<UsrEducation>;
    public loaded = false;

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): any | Observable<any> | Promise<any> 
    {
        return forkJoin (
                    this.dataService.getUserDatas<UsrContact[]>('contact'),
                     this.dataService.getUserDatas<UsrAbout[]>('about'),
                     this.dataService.getUserDatas<UsrEducation[]>('educations'),
                     this.dataService.getUserDatas<UsrSkill[]>('skills'),
                     this.dataService.getUserDatas<UsrExperience[]>('experiences'),
                     this.dataService.getUserDatas<UsrMain[]>('main')
                    ); 

    }
}