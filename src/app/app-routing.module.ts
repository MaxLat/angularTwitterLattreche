import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './private/home/home.component';
import { ProfilComponent } from './private/profil/profil.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
      {
        path: 'signup',
        component: RegisterComponent,
      },
      {
        path: 'signin',
        component: LoginComponent,
      },
      {
        path :'home',
        component : HomeComponent,
        canActivate : [AuthGuard]
      },
      {
        path :'profil/:username',
        component : ProfilComponent,
        canActivate : [AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
