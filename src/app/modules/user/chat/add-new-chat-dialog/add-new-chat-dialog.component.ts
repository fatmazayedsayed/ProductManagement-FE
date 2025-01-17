import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { CreateChatSessionResponse } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-add-new-chat-dialog',
  templateUrl: './add-new-chat-dialog.component.html',
  styleUrl: './add-new-chat-dialog.component.scss',
  providers: [MessageService],
})
export class AddNewChatDialogComponent implements OnInit {
  @Input() displayDialog: boolean = false;
  @Output() hideDialog: EventEmitter<void> = new EventEmitter<void>();
  batchSourcList: any[] = [];
  chatForm!: FormGroup;
  createChatSessionResItem!: CreateChatSessionResponse;
  constructor(
    private _chatService: ChatService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.addNewChatForm();
    this.getPatchSourceLookUp();
  }

  addNewChatForm() {
    this.chatForm = new FormGroup({
      session_name: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
    });
  }

  getPatchSourceLookUp() {
    this._chatService.getPatchSourceLookUp().subscribe((source: any) => {
      this.batchSourcList = source;
      this.batchSourcList.pop();
    });
  }
  onHideDialog() {
    this.hideDialog.emit();
    this.chatForm.reset({
      sessionName: '',
      source: [],
    });
  }
  // Handle form submission
  save() {
    if (this.chatForm.valid) {
      let name = this.chatForm.get('session_name')?.value;
      let sourceEnums = this.chatForm.get('source')?.value;
      this._chatService.CreateChatSession(sourceEnums, name).subscribe({
        next: (res) => {
          if (res) {
            this._chatService.sessionIdSubjec(res);
            let aiObject = {
              session_name: res,
              source: sourceEnums,
            };
            this._chatService.formSubjectNewChat(aiObject);

            // this.messageService.add({
            //   key: 'toast1',
            //   severity: 'success',
            //   summary: 'Success',
            //   detail: 'Chat Deleted Successfully',
            // });
          }
        },
        error: (err) => {
          this.messageService.add({
            key: 'toast2',
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
      });
      this.onHideDialog();
    } else {
      this.chatForm.markAllAsTouched();
    }
  }
}
