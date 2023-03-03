import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProyectDetailComponent } from './components/proyect-detail/proyect-detail.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { FrontendComponent } from './components/frontend/frontend.component';
import { FacebookComponent } from './components/frontendProyects/facebook/facebook.component';
import { BackendComponent } from './components/backend/backend.component';
import { LibraryComponent } from './components/backendProyects/library/library.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ChatComponent } from './components/backendProyects/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'githubProyects', component: ProyectsComponent },
  { path: 'githubProyects/:name', component: ProyectDetailComponent },
  { path: 'frontend', component: FrontendComponent },
  { path: 'backend', component: BackendComponent },
  { path: 'backend/library', component: LibraryComponent },
  { path: 'backend/library/:id', component: BookDetailComponent },
  { path: 'frontend/facebook', component: FacebookComponent },
  { path: 'backend/register', component: RegisterPageComponent },
  { path: 'backend/chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
