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
  {
    path: 'news/:id',
    loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard],
  },
  { path: 'forget-password',
    loadChildren: './pages/forget-password/forget-password.module#ForgetPasswordPageModule',
  },
  {
    path: 'subscription',
    loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: './pages/contact/contact.module#ContactPageModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
