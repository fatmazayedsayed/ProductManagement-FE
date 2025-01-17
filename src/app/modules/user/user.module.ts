import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SearchModule } from './search/search.module';
import { ChatModule } from './chat/chat.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SearchModule,
    ChatModule,
    
  ]
})
export class UserModule { }
