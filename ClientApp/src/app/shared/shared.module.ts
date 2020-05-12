import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LazyLoadImageModule } from "src/node_modules/ng-lazyload-image";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
  ],
  declarations: [
    ErrorPageComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorPageComponent,
    LazyLoadImageModule
  ]
})
export class SharedModule { }
