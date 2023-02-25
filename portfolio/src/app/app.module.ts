import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectCardComponent } from './components/proyect-card/proyect-card.component';
import { ProyectCardListComponent } from './components/proyect-card-list/proyect-card-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { HomeComponent } from './components/home/home.component';
import { ProyectDetailComponent } from './components/proyect-detail/proyect-detail.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsCardListComponent } from './components/news-card-list/news-card-list.component';
import { FrontendComponent } from './components/frontend/frontend.component';
import { FrontendListComponent } from './components/frontend-list/frontend-list.component';
import { FacebookComponent } from './components/frontendProyects/facebook/facebook.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LibraryComponent } from './components/backendProyects/library/library.component';
import { BackendComponent } from './components/backend/backend.component';
import { BackendListComponent } from './components/backend-list/backend-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectCardComponent,
    ProyectCardListComponent,
    ToolbarComponent,
    ProfileComponent,
    ProyectsComponent,
    HomeComponent,
    ProyectDetailComponent,
    NewsCardComponent,
    NewsCardListComponent,
    FrontendComponent,
    FrontendListComponent,
    FacebookComponent,
    LibraryComponent,
    BackendComponent,
    BackendListComponent,
    BookDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
