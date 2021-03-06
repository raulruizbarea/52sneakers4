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
import { NewsDetailPage } from '../news-detail/news-detail.page';
import { SneakerPage } from '../sneaker/sneaker.page';
import { SneakerPageModule } from '../sneaker/sneaker.module';
import { ContactPage } from '../contact/contact.page';
import { SubscriptionPage } from '../subscription/subscription.page';
import { SubscriptionPageModule } from '../subscription/subscription.module';
import { ContactPageModule } from '../contact/contact.module';
import { CartPageModule } from '../cart/cart.module';
import { CartPage } from '../cart/cart.page';
import { FavouritesPage } from '../favourites/favourites.page';
import { FavouritesPageModule } from '../favourites/favourites.module';
import { NotificationPage } from '../notification/notification.page';
import { NotificationPageModule } from '../notification/notification.module';
import { UserPage } from '../user/user.page';
import { UserPageModule } from '../user/user.module';
import { ResultsPage } from '../results/results.page';
import { ResultsPageModule } from '../results/results.module';
import { OrderPage } from '../order/order.page';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { HistoryPage } from '../history/history.page';
import { PaymentPage } from '../payment/payment.page';
import { ShippingPage } from '../shipping/shipping.page';
import { ConfirmationPageModule } from '../confirmation/confirmation.module';
import { HistoryPageModule } from '../history/history.module';
import { OrderPageModule } from '../order/order.module';
import { PaymentPageModule } from '../payment/payment.module';
import { ShippingPageModule } from '../shipping/shipping.module';

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
            path: 'favourites',
            outlet: 'profile',
            component: FavouritesPage,
          },
          {
            path: 'user',
            outlet: 'profile',
            component: UserPage,
          },
          {
            path: 'news/:id',
            outlet: 'news',
            component: NewsDetailPage
          },
          {
            path: 'sneaker/:id',
            outlet: 'home',
            component: SneakerPage
          },
          {
            path: 'results',
            outlet: 'home',
            component: ResultsPage
          },
          {
            path: 'subscription',
            outlet: 'profile',
            component: SubscriptionPage,
          },
          {
            path: 'notification',
            outlet: 'profile',
            component: NotificationPage,
          },
          {
            path: 'contact',
            outlet: 'profile',
            component: ContactPage,
          },
          {
            path: 'cart',
            outlet: 'cart',
            component: CartPage,
            loadChildren: './../cart/cart.module#CartPageModule'
          },
          {
            path: 'order/:id',
            outlet: 'profile',
            component: OrderPage,
          },
          {
            path: 'confirmation',
            outlet: 'cart',
            component: ConfirmationPage,
          },
          {
            path: 'history',
            outlet: 'profile',
            component: HistoryPage,
          },
          {
            path: 'payment',
            outlet: 'cart',
            component: PaymentPage,
          },
          {
            path: 'shipping',
            outlet: 'cart',
            component: ShippingPage,
          },
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full',
  },
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
    NewsDetailPageModule,
    SneakerPageModule,
    SubscriptionPageModule,
    ContactPageModule,
    CartPageModule,
    UserPageModule,
    FavouritesPageModule,
    NotificationPageModule,
    ResultsPageModule,
    ConfirmationPageModule,
    HistoryPageModule,
    OrderPageModule,
    PaymentPageModule,
    ShippingPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
