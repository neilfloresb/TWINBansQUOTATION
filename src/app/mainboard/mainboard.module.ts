import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainboardRoutingModule } from './mainboard-routing.module';
import { MainboardComponent } from './mainboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MainboardComponent],
  imports: [
    CommonModule,
    MainboardRoutingModule,
    SharedModule
  ]
})
export class MainboardModule { }
