import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  { path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomePageModule',
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
  },
  {
    path: 'new-user',
    loadChildren: './pages/new-user/new-user.module#NewUserPageModule'
  },
  {
    path: 'news',
    loadChildren: './pages/news/news.module#NewsPageModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
