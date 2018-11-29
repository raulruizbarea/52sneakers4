import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';
import { LoginGuard } from './shared/security/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomePageModule',
    // canActivate: [LoginGuard],
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    // canActivate: [LoginGuard],
  },
  {
    path: 'new-user',
    loadChildren: './pages/new-user/new-user.module#NewUserPageModule',
    // canActivate: [LoginGuard],
  },
  {
    path: 'news/:id',
    loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule',
    canActivate: [AuthGuard],
  },
  { path: 'forget-password',
    loadChildren: './pages/forget-password/forget-password.module#ForgetPasswordPageModule',
    // canActivate: [LoginGuard],
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
  {
    path: 'sneaker/:id',
    loadChildren: './pages/sneaker/sneaker.module#SneakerPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
