import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecognizeComponent } from './components/recognize/recognize.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatiscticsComponent } from './components/statisctics/statisctics.component';



@NgModule({
  declarations: [
    StatiscticsComponent
  ],
  imports: [
    CommonModule,
    //TODO: make links
    RouterModule.forChild([
      {path: '', component: MenuComponent},
      {path: 'recognize', component: RecognizeComponent},
      {path: 'statistics', component: StatiscticsComponent}
    ])
  ]
})
export class UserModule { }
