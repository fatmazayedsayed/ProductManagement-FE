import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { AddNewChatDialogComponent } from './add-new-chat-dialog/add-new-chat-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [ChatComponent, AddNewChatDialogComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    SharedModule,
    ToastModule,
    DropdownModule ,
    VirtualScrollerModule,
    ScrollingModule 
  ],
  //  ToastModule
})
export class ChatModule {}
