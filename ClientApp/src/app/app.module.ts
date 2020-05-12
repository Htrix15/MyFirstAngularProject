import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { HomePageComponent } from './components/homePages/home-page/home-page.component';
import { HomeNavigationComponent } from './components/homePages/shared/home-navigation/home-navigation.component';
import { MainSectionComponent } from './components/homePages/sections/main-section/main-section.component';
import { ExperienceSectionComponent } from './components/homePages/sections/experience-section/experience-section.component';
import { SkillsSectionComponent } from './components/homePages/sections/skills-section/skills-section.component';
import { EducationSectionComponent } from './components/homePages/sections/education-section/education-section.component';
import { AboutMeSectionComponent } from './components/homePages/sections/about-me-section/about-me-section.component';
import { ContactsSectionComponent } from './components/homePages/sections/contacts-section/contacts-section.component';
import { FooterSectionComponent } from './components/homePages/sections/footer-section/footer-section.component';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, DatePipe } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { Provider } from '@angular/compiler/src/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetTokenInterceptor } from './components/adminPages/shared/set-token.interceptor';
import { SharedModule } from './shared/shared.module';
import { MessageService } from './shared/message.service';
import { GetErrorsInterceptor } from './shared/get-errors.interceptor';
import { DateNullPipe } from './components/homePages/shared/date-null.pipe';
import { AuthService } from './components/adminPages/shared/auth.service';
import { MenuService } from './shared/menu.service';


registerLocaleData(
  ruLocale, 'ru'
)
const INERCEPTOR_TOKEN_PROVIDER: Provider ={
  provide: HTTP_INTERCEPTORS,
  useClass: SetTokenInterceptor,
  multi: true
}

const INERCEPTOR_ERROR_PROVIDER: Provider ={
  provide: HTTP_INTERCEPTORS,
  useClass: GetErrorsInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeNavigationComponent,
    MainSectionComponent,
    ExperienceSectionComponent,
    SkillsSectionComponent,
    EducationSectionComponent,
    AboutMeSectionComponent,
    ContactsSectionComponent,
    FooterSectionComponent,
    MainHeaderComponent,
    DateNullPipe
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
            
    ],
  providers: [MessageService, INERCEPTOR_TOKEN_PROVIDER, INERCEPTOR_ERROR_PROVIDER, AuthService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
