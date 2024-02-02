import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component login page
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Dashboard component
import { DashboardComponent } from './pages/dashboard/parent-component/dashboard.component';
import { EditUserComponent } from './pages/dashboard/child-components/edit-user/edit-user.component';

// Components dash
import { DashClientComponent } from './pages/dashboard/child-components/dash-client/dash-client.component';
import { ClientAddComponent } from './pages/dashboard/child-components/client-add/client-add.component';
import { ClientEditComponent } from './pages/dashboard/child-components/client-edit/client-edit.component';
import { ClientLocationComponent } from './pages/dashboard/child-components/client-location/client-location.component';
import { ClientRepresentativesComponent } from './pages/dashboard/child-components/client-representatives/client-representatives.component';

// Security 
import { authGuard } from './shared/utils/auth.guard';

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

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
