import { NgModule } from '@angular/core';
import { SneakerHeaderComponent } from './sneaker-header/sneaker-header.component';
import { SneakerFooterComponent } from './sneaker-footer/sneaker-footer.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [
    SneakerHeaderComponent,
    SneakerFooterComponent,
    SideMenuComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    SneakerHeaderComponent,
    SneakerFooterComponent,
    SideMenuComponent]
})
export class ComponentsModule {}
