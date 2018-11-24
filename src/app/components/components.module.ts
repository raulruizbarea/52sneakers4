import { NgModule } from '@angular/core';
import { SneakerHeaderComponent } from './sneaker-header/sneaker-header.component';
import { SneakerFooterComponent } from './sneaker-footer/sneaker-footer.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SneakerHeaderComponent,
    SneakerFooterComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    SneakerHeaderComponent,
    SneakerFooterComponent]
})
export class ComponentsModule {}
