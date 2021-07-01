import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', redirectTo: '/menu', pathMatch: 'full'}
    ]
  },
  { path: 'menu', loadChildren: () => import('./user-layout/user.module').then(m => m.UserModule)},
  //TODO: make 404 { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
