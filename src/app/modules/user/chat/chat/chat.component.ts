import { ScrollingModule } from '@angular/cdk/scrolling';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  AddMessageToChatDTO,
  ChatDTo,
  ChatHistoryRequestBodyDTo,
  ChatHistoryResponseBody,
  DeleteChatDTo,
  GetChatHistoryDTo,
} from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
import { SignalRChatService } from 'src/app/services/signal-r-chat.service';
import { SSE } from 'sse.js';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [MessageService],

})
export class ChatComponent implements OnInit  {
  displayDialog: boolean = false;
  lastScrollPosition = -1;
  chatForm!: FormGroup;
  chatData: any;
  questionMessege: string[] = [];
  totalCount: number = 0;
  answerQuestion: string = '';
  chats: any[] = [];
  sessionId!: string;
  addMessageToChatResponse!: AddMessageToChatDTO;
  pageSize = 17;
  pageNumber = 1;
  chatHistory: any[] = [];
  totalRecords = 0;
  @ViewChild('msgHistory') private msgHistoryRef!: ElementRef;
  responsList: any[] = [];
  question!: string;
  userQuestion: string = '';
//////////////// socket /////////
messages: string[] = [];
newMessage!: string;
private messageSubscription!: Subscription;

  constructor(
    private _chatService: ChatService,
    private messageService: MessageService,
    private webSocketService: SignalRChatService
  ) {

  }
  ngOnInit(): void {
    this.chatFormValidation();
    this.getChatData();
    //this.getChatHistory();
    this.getSessionIdSubject();
    this.loadChats();

    /////////////////// socket ////////////
  //   this.messageSubscription = this.webSocketService.onMessage().subscribe(
  //     (msg) => {
  //         this.messages.push(msg);
  //         console.log('messages socket =>> ', this.messages, msg);
  //     }
  // );

  // console.log('this.messageSubscription  socket =>> ',   this.messageSubscription );

   }

ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.webSocketService.disconnect();
}

 
  scrollDown(): void {
    const element = this.msgHistoryRef.nativeElement;
    element.scrollTo({
      top: element.scrollHeight ,
      behavior: 'smooth' 
    });
  }
 
  
 onScroll(event: any): void {

    const viewportElement = event.target;  // The scrolling element
    const scrollTop = viewportElement.scrollTop;  // The amount scrolled
    const scrollHeight = viewportElement.scrollHeight;  // Total scrollable height
    const clientHeight = viewportElement.clientHeight;  // Viewport height
  
    // Determine if scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight  &&this.chats.length < this.totalCount &&
      this.chats.length >= 17) {
      this.pageNumber++;
      this.loadChats();  // Load more data logic
    }
}
  
  getScrollDirection(event: any): 'up' | 'down' {
    console.log('event ==> ',event);
   
    const currentPosition = event;
    let direction: 'up' | 'down' = 'up';

 
    if (
      currentPosition > this.lastScrollPosition &&
      this.lastScrollPosition != -1
    ) {
      direction = 'down';
    }

    this.lastScrollPosition = currentPosition;
    return direction;
  }
  loadChats(): void {
    let ChatHistory = new ChatHistoryRequestBodyDTo();
    ChatHistory.pageNumber = this.pageNumber;
    ChatHistory.pageSize = this.pageSize;
    ChatHistory.searchString = '';
    ChatHistory.sorting = '';
    this._chatService.getListChats(ChatHistory).subscribe((data: any) => {
      this.chats = [...this.chats, ...data.chats];
      this.totalCount = data.totalCount;
    });
  }

  getChatHistory() {
    let ChatHistory = new ChatHistoryRequestBodyDTo();
    ChatHistory.pageNumber = 1;
    ChatHistory.pageSize = 10;
    ChatHistory.searchString = '';
    ChatHistory.sorting = '';
    this._chatService.getListChats(ChatHistory).subscribe({
      next: (response: any) => {
        if (response) {
          this.chats = response.chats;
        }
      },
      error: (error) => {
        // this.messageService.add({
        //           key: 'toast2',
        //           severity: 'error',
        //           summary: 'Error',
        //           detail: error,
        //         });
      },
    });
  }

  getChatData() {
    this._chatService.formSubjectChat.subscribe((value) => {
      this.chatData = value;
    });
  }

  chatFormValidation() {
    this.chatForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
    });
  }
  addChat() {
    this.resetChatHistory();
  }
  resetChatHistory() {
    // Clear the chat history
    this.answerQuestion = '';
    this.questionMessege = [];
    this.responsList = [];
    this._chatService.resetChatData();
  }

  displayDialogSessionNameAndSource(questionMessege: string[]) {
    if (questionMessege?.length == 0) this.displayDialog = true;
    this.displayDialog = false;
  }
  convertArrayToString(numbersArray: any): string {
    return numbersArray.join(',');
  }
 

  formatForDisplayAnswer(response: string) {
    return response
      .replace(/\\n/g, '\n') 
      .split('\n') .filter((line: any) => line.trim() !== '') 
      .map((line: string) =>
        line.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
      ); 
  }
  handleKeyDown(event: KeyboardEvent): void {
  
    // Check if the "Enter" key was pressed
    if (event.key === 'Enter' && !event.shiftKey) {
     // event.preventDefault();
      this.sendMessage();
    }
  }
  




  


  sendMessage(): void {
    debugger
    if (this.questionMessege?.length == 0 && !this.chatData) {
      this.displayDialog = true;
    }

    if (this.chatForm.valid && this.sessionId) {
      this.question = this.chatForm.get('question')?.value;

      let sendQuestion = new ChatDTo();
      sendQuestion.question = this.question;
      sendQuestion.session_name = this.chatData?.session_name;
      sendQuestion.source = this.convertArrayToString(this.chatData?.source);

        ////////////////////  socket /////////////
        // this.webSocketService.sendMessage(sendQuestion);
        // this.newMessage = '';

        /////////////////////////////////////

      this.userQuestion = '';  // Clear input after sending
  
         
      this._chatService.postQuestion(sendQuestion).subscribe({
        next: (response) => {
          this.questionMessege.push(this.question);
          if (response) {
            this.answerQuestion = response;
            this.responsList.push(this.formatForDisplayAnswer(response));
            setTimeout(() => {
              this.scrollDown();
            }, 100);
          
            this.addMessageToChat();
            this.getChatHistory();
          }
        },
      });
      this.chatForm.reset();
    }
  }

  showDialog() {
    this.displayDialog = true;
  }
  onHideDialog() {
    this.displayDialog = false;
  }
  getFormattedTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const time = now.toLocaleTimeString('en-US', options);
    const date = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    return `${time} | ${date}`;
  }

  deletChat(sessionId: string | undefined) {
    let body = new DeleteChatDTo();
    body.session_name = sessionId;

    this._chatService.deleteChatBackend(sessionId).subscribe({
      next: (res) => {
        this._chatService.deleteChat(body).subscribe({
          next: (res) => {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.getChatHistory();
            this.addChat();
          },
          error: (error) => {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              summary: 'Error',
              detail: error,
            });
          },
        });
      },
    });
  }

  getSessionIdSubject() {
    this._chatService.sessionIdSub.subscribe((id) => {
      this.sessionId = id;
    });
  }

  addMessageToChat() {
    let addMessageToChat = new AddMessageToChatDTO();
    addMessageToChat.answer = this.answerQuestion;
    addMessageToChat.prompt = this.question;
    addMessageToChat.sessionId = this.sessionId;
    this._chatService.addMessageToChat(addMessageToChat).subscribe({
      next: (res) => {
        this.addMessageToChatResponse = res;
      },
      error: () => {},
    });
  }
  getChat(e: any) {
    let obj = {
      source: e.sources,
      session_name: e.name,
    };

    this.sessionId = e.id;

    this._chatService.formSubjectNewChat(obj);

    this._chatService.getChatSession(e.id).subscribe((res: any) => {
      
      this.chatHistory = res.history;
      this.chatHistory.reverse();
      let promptArray: string[] = this.chatHistory.map(
        (item: any) => item.prompt
      );
      let resArray: string[] = this.chatHistory.map(
        (item: any) => item.response
      );
      if (this.chatHistory) {
        this.questionMessege = promptArray;
        this.responsList = [];
        resArray.forEach((element) => {
          this.responsList.push(this.formatForDisplayAnswer(element));
        });
     
      } else {
        return;
      }
    });
  }

 
}
