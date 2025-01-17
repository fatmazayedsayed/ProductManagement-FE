import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SearchModule } from './search/search.module'; 


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SearchModule,
    
    
  ]
})
export class UserModule { }
