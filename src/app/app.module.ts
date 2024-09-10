import { Injectable, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HomeComponent } from './component/home/home.component';
import { WorksComponent } from './component/works/works.component';
import { BioComponent } from './component/bio/bio.component';
import { CvComponent } from './component/cv/cv.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { FooterComponent } from './component/footer/footer.component';

// Importazione di Hammer
import * as Hammer from 'hammerjs';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  override overrides = {
    pan: { direction: Hammer.DIRECTION_HORIZONTAL }
  };
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'works', component: WorksComponent },
  { path: 'bio', component: BioComponent },
  { path: 'cv', component: CvComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    WorksComponent,
    BioComponent,
    CvComponent,
    ContactsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
