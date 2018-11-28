import { NgModule } from '@angular/core';
import { SneakerHeaderComponent } from './sneaker-header/sneaker-header.component';
import { SneakerFooterComponent } from './sneaker-footer/sneaker-footer.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SneakerModalHeaderComponent } from './sneaker-modal-header/sneaker-modal-header.component';
import { SliderComponent } from './slider/slider.component';
import { SneakerCardsListComponent } from './sneaker-cards-list/sneaker-cards-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SneakerHeaderComponent,
    SneakerModalHeaderComponent,
    SneakerFooterComponent,
    SideMenuComponent,
    SliderComponent,
    SneakerCardsListComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    SneakerHeaderComponent,
    SneakerModalHeaderComponent,
    SneakerFooterComponent,
    SliderComponent,
    SideMenuComponent,
    SneakerCardsListComponent]
})
export class ComponentsModule {}
