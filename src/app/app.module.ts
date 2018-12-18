import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoverAbilitiesService } from './services/rover-abilities.service';
import { RoverPhotosService } from './services/rover-photos.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListComponent } from './views/photo-list/photo-list.component';
import { SpinnerComponent } from './partials/spinner/spinner.component';
import { RoverPhotoComponent } from './partials/rover-photo/rover-photo.component';
import { IntroComponent } from './views/intro/intro.component';
import { PagerComponent } from './partials/pager/pager.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    SpinnerComponent,
    RoverPhotoComponent,
    IntroComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
    
    
  ],
  providers: [
    RoverAbilitiesService,
    RoverPhotosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
