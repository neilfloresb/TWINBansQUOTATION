import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainboardComponent } from './mainboard.component';

const routes: Routes = [
  {
    path: 'supplier', component: MainboardComponent, children: [
      { path: 'supplier', loadChildren: () => import('../modules/supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'kustomer', loadChildren: () => import('../modules/kustomer/kustomer.module').then(m => m.KustomerModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainboardRoutingModule { }
