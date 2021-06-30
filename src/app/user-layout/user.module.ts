import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RecognizeComponent } from './components/recognize/recognize.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //TODO: make links
    RouterModule.forChild([
      {path: 'recognize', component: RecognizeComponent}
    ])
  ]
})
export class UserModule { }
