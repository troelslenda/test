import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './views/photo-list/photo-list.component';
import { IntroComponent } from './views/intro/intro.component';

const routes: Routes = [
  { path: 'photos', component: IntroComponent },
  { path: 'photos/:id', component: PhotoListComponent },
  { path: 'photos/:id/:camera', component: PhotoListComponent },
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
