import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstRoutingModule } from './first-routing.module';
import { FirstComponent } from './first.component';

import { ModalModule } from 'src/app/widgets/modal/modal.module';

@NgModule({
  declarations: [FirstComponent],
  imports: [CommonModule, FirstRoutingModule, ModalModule],
})
export class FirstModule {}
