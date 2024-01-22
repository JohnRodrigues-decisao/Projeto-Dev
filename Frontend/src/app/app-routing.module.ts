import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component login page
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Dashboard component
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditUserComponent } from './components/dashboard/profile/edit-user/edit-user.component';

// Components dash
import { DashClientComponent } from './pages/dash-client/dash-client.component';
import { ClientAddComponent } from './components/dashboard/client-add/client-add.component';
import { ClientEditComponent } from './components/dashboard/client-edit/client-edit.component';
import { ClientLocationComponent } from './components/dashboard/client-location/client-location.component';
import { ClientRepresentativesComponent } from './components/dashboard/client-representatives/client-representatives.component';

// Security
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  // Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  
  // profile user edit  
  { path: 'dashboard/profile/edit/:id_conta', component: EditUserComponent, canActivate: [authGuard]},

  // -----> Customer dashboard client
  { path: 'dashboard/client', component: DashClientComponent, canActivate: [authGuard]},
  { path: 'dashboard/client/add', component: ClientAddComponent, canActivate: [authGuard]},
  { path: 'dashboard/client/edit/:id_pessoa', component: ClientEditComponent, canActivate: [authGuard]},
  
  { path: 'dashboard/client/location/:id_pessoa', component: ClientLocationComponent, canActivate: [authGuard]},
  { path: 'dashboard/client/repres/:id_pessoa', component: ClientRepresentativesComponent, canActivate: [authGuard]},

  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
