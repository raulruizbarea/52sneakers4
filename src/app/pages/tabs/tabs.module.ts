import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { HomePageModule } from '../home/home.module';
import { ProfilePageModule } from '../profile/profile.module';
import { NewsPageModule } from '../news/news.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewsPage } from '../news/news.page';
import { ProfilePage } from '../profile/profile.page';
import { NewsDetailPageModule } from '../news-detail/news-detail.module';

const routes: Routes = [
  {
      path: 'tabs',
      component: TabsPage,
      children: [
          {
              path: 'home',
              outlet: 'home',
              component: HomePage,
              loadChildren: './../home/home.module#HomePageModule',
          },
          {
              path: 'news',
              outlet: 'news',
              component: NewsPage,
              loadChildren: './../news/news.module#NewsPageModule',
          },
          {
            path: 'profile',
            outlet: 'profile',
            component: ProfilePage,
            loadChildren: './../profile/profile.module#ProfilePageModule'
          },
          {
            // path: 'cart',
            // outlet: 'cart',
            // loadChildren: './../cart/cart.module#CartPageModule'
          },
      ]
  },
  {
    path: '',
    redirectTo: '/main/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageModule,
    ProfilePageModule,
    NewsPageModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
